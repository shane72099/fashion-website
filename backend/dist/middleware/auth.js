"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminAuth = exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const auth = async (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
        if (!token) {
            throw new Error();
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'default_secret');
        const user = await User_1.default.findById(decoded.userId);
        if (!user) {
            throw new Error();
        }
        req.user = user;
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'Please authenticate' });
    }
};
exports.auth = auth;
const adminAuth = async (req, res, next) => {
    try {
        await (0, exports.auth)(req, res, () => { });
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admin only.' });
        }
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'Please authenticate' });
    }
};
exports.adminAuth = adminAuth;
//# sourceMappingURL=auth.js.map