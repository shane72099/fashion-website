"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Order_1 = __importDefault(require("../models/Order"));
const stripe_1 = __importDefault(require("stripe"));
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2023-10-16'
});
const router = express_1.default.Router();
// Create new order
router.post('/', async (req, res) => {
    try {
        const { items, shippingAddress, paymentMethod } = req.body;
        const order = new Order_1.default({
            user: req.body.userId,
            items,
            shippingAddress,
            paymentMethod,
            totalAmount: items.reduce((total, item) => total + (item.price * item.quantity), 0)
        });
        await order.save();
        res.status(201).json(order);
    }
    catch (error) {
        res.status(400).json({ message: 'Error creating order' });
    }
});
// Get user's orders
router.get('/user/:userId', async (req, res) => {
    try {
        const orders = await Order_1.default.find({ user: req.params.userId })
            .populate('items.product')
            .sort({ createdAt: -1 });
        res.json(orders);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching orders' });
    }
});
// Get order by ID
router.get('/:id', async (req, res) => {
    try {
        const order = await Order_1.default.findById(req.params.id).populate('items.product');
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching order' });
    }
});
// Create Stripe payment intent
router.post('/create-payment-intent', async (req, res) => {
    try {
        const { amount } = req.body;
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100),
            currency: 'usd',
        });
        res.json({ clientSecret: paymentIntent.client_secret });
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating payment intent' });
    }
});
// Update order status
router.patch('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order_1.default.findByIdAndUpdate(req.params.id, { orderStatus: status }, { new: true });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating order status' });
    }
});
exports.default = router;
//# sourceMappingURL=order.routes.js.map