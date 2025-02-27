"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    addresses: [{
            street: String,
            city: String,
            state: String,
            country: String,
            zipCode: String
        }],
    orders: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Order' }],
    wishlist: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Product' }],
    createdAt: { type: Date, default: Date.now }
});
exports.default = mongoose_1.default.model('User', userSchema);
//# sourceMappingURL=User.js.map