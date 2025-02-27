import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import authRoutes from './routes/auth.routes';
import productRoutes from './routes/product.routes';
import orderRoutes from './routes/order.routes';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

// Load environment variables
dotenv.config();

// Load secrets from Render's secrets path if available
const SECRETS_PATH = '/etc/secrets';
console.log('Checking for secrets path:', SECRETS_PATH);

if (fs.existsSync(SECRETS_PATH)) {
  try {
    console.log('Secrets path exists, attempting to read directory');
    const stats = fs.statSync(SECRETS_PATH);
    
    if (!stats.isDirectory()) {
      console.log('Secrets path is not a directory, skipping secrets loading');
    } else {
      const files = fs.readdirSync(SECRETS_PATH);
      console.log(`Found ${files.length} items in secrets directory`);
      
      for (const file of files) {
        try {
          const filePath = path.join(SECRETS_PATH, file);
          console.log(`Processing secret file: ${file}`);
          
          const fileStats = fs.statSync(filePath);
          if (!fileStats.isFile()) {
            console.log(`Skipping ${file} as it's not a regular file`);
            continue;
          }
          
          if (fileStats.size === 0) {
            console.log(`Skipping ${file} as it's empty`);
            continue;
          }
          
          const value = fs.readFileSync(filePath, 'utf8');
          if (value.trim()) {
            process.env[file] = value.trim();
            console.log(`Successfully loaded secret: ${file}`);
          } else {
            console.log(`Skipping ${file} as it contains only whitespace`);
          }
        } catch (fileError) {
          console.error(`Error processing file ${file}:`, fileError.message);
          // Continue with next file
        }
      }
    }
  } catch (error) {
    console.error('Error loading secrets:', error.message);
    if (error instanceof Error) {
      console.error('Stack trace:', error.stack);
    }
    // Continue execution even if secrets loading fails
  }
} else {
  console.log('Secrets path does not exist, skipping secrets loading');
}

const app = express();

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
}));

// Connect to MongoDB
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/fashion-website';
    console.log('Attempting to connect to MongoDB...');
    console.log('Environment:', process.env.NODE_ENV);
    
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    });
    
    console.log('MongoDB Connected Successfully');
    // Log connection details (without sensitive info)
    const { host, port, name } = mongoose.connection;
    console.log(`Connected to database: ${name} on host: ${host}${port ? ':' + port : ''}`);
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
    // Log more details about the error
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Stack trace:', error.stack);
    }
    // Don't exit immediately in production
    if (process.env.NODE_ENV === 'production') {
      console.log('Retrying connection in 5 seconds...');
      setTimeout(connectDB, 5000);
    } else {
      process.exit(1);
    }
  }
};

connectDB();

// Add MongoDB connection error handling
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected. Attempting to reconnect...');
});

mongoose.connection.on('reconnected', () => {
  console.log('MongoDB reconnected');
});

// Graceful shutdown
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed through app termination');
    process.exit(0);
  } catch (err) {
    console.error('Error during MongoDB connection closure:', err);
    process.exit(1);
  }
});

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Fashion Website API' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV,
    mongoConnected: mongoose.connection.readyState === 1
  });
});

// Global error handling middleware
interface ErrorWithStatus extends Error {
  status?: number;
}

app.use((err: ErrorWithStatus, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  const status = err.status || 500;
  res.status(status).json({
    error: {
      message: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message,
      stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
    }
  });
});

// Parse PORT as number with explicit type annotation
const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 10000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
  console.log(`CORS Origin: ${process.env.CORS_ORIGIN || 'http://localhost:3000'}`);
}); 