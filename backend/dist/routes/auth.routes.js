"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = require("../models/user.model");
const express_validator_1 = require("express-validator");
const validate_1 = require("../middleware/validate");
const router = (0, express_1.Router)();
const registerValidation = [
    (0, express_validator_1.body)('name').trim().notEmpty().withMessage('Name is required'),
    (0, express_validator_1.body)('email').isEmail().withMessage('Must be a valid email'),
    (0, express_validator_1.body)('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
];
const loginValidation = [
    (0, express_validator_1.body)('email').isEmail().withMessage('Must be a valid email'),
    (0, express_validator_1.body)('password').notEmpty().withMessage('Password is required')
];
// Register route
router.post('/register', (0, validate_1.validate)(registerValidation), async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Check if user already exists
        const existingUser = await user_model_1.User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        // Hash password
        const salt = await bcryptjs_1.default.genSalt(10);
        const hashedPassword = await bcryptjs_1.default.hash(password, salt);
        // Create new user
        const user = new user_model_1.User({
            name,
            email,
            password: hashedPassword,
        });
        await user.save();
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.status(201).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    }
    catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
// Login route
router.post('/login', (0, validate_1.validate)(loginValidation), async (req, res) => {
    try {
        const { email, password } = req.body;
        // Check if user exists
        const user = await user_model_1.User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        // Verify password
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.default = router;
//# sourceMappingURL=auth.routes.js.map