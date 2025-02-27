"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const product_routes_1 = __importDefault(require("./routes/product.routes"));
const order_routes_1 = __importDefault(require("./routes/order.routes"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const helmet_1 = __importDefault(require("helmet"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Security middleware
app.use((0, helmet_1.default)());
// Rate limiting
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
}));
// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/fashion-website');
        console.log('MongoDB Connected Successfully');
    }
    catch (error) {
        console.error('MongoDB Connection Error:', error);
        process.exit(1);
    }
};
connectDB();
// Add MongoDB connection error handling
mongoose_1.default.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});
mongoose_1.default.connection.on('disconnected', () => {
    console.log('MongoDB disconnected. Attempting to reconnect...');
});
mongoose_1.default.connection.on('reconnected', () => {
    console.log('MongoDB reconnected');
});
// Graceful shutdown
process.on('SIGINT', async () => {
    try {
        await mongoose_1.default.connection.close();
        console.log('MongoDB connection closed through app termination');
        process.exit(0);
    }
    catch (err) {
        console.error('Error during MongoDB connection closure:', err);
        process.exit(1);
    }
});
// Routes
app.use('/api/auth', auth_routes_1.default);
app.use('/api/products', product_routes_1.default);
app.use('/api/orders', order_routes_1.default);
// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});
app.use((err, req, res, next) => {
    console.error('Error:', err);
    const status = err.status || 500;
    res.status(status).json({
        error: {
            message: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message,
            stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
        }
    });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
    console.log(`CORS Origin: ${process.env.CORS_ORIGIN || 'http://localhost:3000'}`);
});
//# sourceMappingURL=index.js.map