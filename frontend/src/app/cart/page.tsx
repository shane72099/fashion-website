'use client';

import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import Image from 'next/image';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CartPage() {
  const { state, dispatch } = useCart();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to initialize.');

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: state.items }),
      });

      const session = await response.json();
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (error) {
      console.error('Error in checkout:', error);
      alert('Failed to checkout. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const total = state.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      {state.items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="space-y-8">
          {state.items.map((item) => (
            <div key={item.id} className="flex items-center space-x-4 border-b pb-4">
              <div className="relative w-24 h-24">
                <Image 
                  src={item.product.image} 
                  alt={item.product.name} 
                  fill
                  className="object-cover rounded"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{item.product.name}</h3>
                <p className="text-gray-600">${item.product.price.toFixed(2)}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="px-2 py-1 border rounded"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-2 py-1 border rounded"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="flex justify-between items-center pt-4">
            <div className="text-xl font-bold">Total: ${total.toFixed(2)}</div>
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Checkout'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 