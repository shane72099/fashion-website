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
if (fs.existsSync(SECRETS_PATH)) {
  const files = fs.readdirSync(SECRETS_PATH);
  files.forEach(file => {
    const filePath = path.join(SECRETS_PATH, file);
    const value = fs.readFileSync(filePath, 'utf8');
    process.env[file] = value.trim();
  });
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
    await mongoose.connect(mongoUri);
    console.log('MongoDB Connected Successfully');
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
    process.exit(1);
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

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
  console.log(`CORS Origin: ${process.env.CORS_ORIGIN || 'http://localhost:3000'}`);
}); 