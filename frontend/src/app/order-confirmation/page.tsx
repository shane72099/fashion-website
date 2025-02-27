'use client';

export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { useEffect } from 'react';
import { useCart } from '@/hooks/useCart';
import { FiCheck } from 'react-icons/fi';

export default function OrderConfirmationPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    // Clear the cart when the confirmation page is loaded
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <FiCheck className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold mb-4">Thank You!</h1>
        <p className="text-gray-600 mb-8">
          Your order has been successfully placed. We'll send you an email with your order details and tracking information.
        </p>

        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold mb-2">What's Next?</h2>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>• You'll receive an order confirmation email</li>
            <li>• We'll notify you when your order ships</li>
            <li>• Estimated delivery: 3-5 business days</li>
          </ul>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="block w-full py-3 bg-black text-white rounded-md hover:bg-gray-800 transition"
          >
            Continue Shopping
          </Link>
          <Link
            href="/account"
            className="block w-full py-3 border border-black rounded-md hover:bg-gray-50 transition"
          >
            View Order History
          </Link>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>Need help? <Link href="/contact" className="text-black underline">Contact our support team</Link></p>
        </div>
      </div>
    </div>
  );
} 