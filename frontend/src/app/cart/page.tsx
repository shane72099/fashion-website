'use client';

export const dynamic = 'force-dynamic';

import { useCart } from '@/hooks/useCart';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { FaTrash } from 'react-icons/fa';

export default function CartPage() {
  const router = useRouter();
  const { cart, updateQuantity, removeFromCart } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);

  const subtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const shipping = subtotal > 50 ? 0 : 10;
  const discount = 0; // This would be calculated based on applied promo code
  const total = subtotal + shipping - discount;

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      toast.error('Quantity cannot be less than 1');
      return;
    }
    updateQuantity(itemId, newQuantity);
  };

  const handleRemoveItem = (itemId: string) => {
    removeFromCart(itemId);
    toast.success('Item removed from cart');
  };

  const handleApplyPromo = () => {
    setIsApplyingPromo(true);
    // Simulate API call
    setTimeout(() => {
      toast.error('Invalid promo code');
      setIsApplyingPromo(false);
    }, 1000);
  };

  const handleCheckout = () => {
    toast.success('Redirecting to checkout...');
    router.push('/checkout');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <Image
          src="/empty-cart.png"
          alt="Empty Cart"
          width={200}
          height={200}
          className="mb-8"
        />
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">
          Looks like you haven't added any items to your cart yet.
        </p>
        <Link
          href="/"
          className="bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex gap-6 p-4 bg-white rounded-lg shadow-sm"
            >
              <div className="relative w-24 h-24 flex-shrink-0">
                <Image
                  src={item.product.image}
                  alt={item.product.name}
                  fill
                  className="object-cover rounded-md"
                />
              </div>

              <div className="flex-grow">
                <div className="flex justify-between mb-2">
                  <Link
                    href={`/product/${item.product.id}`}
                    className="text-lg font-semibold hover:text-gray-600"
                  >
                    {item.product.name}
                  </Link>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <FaTrash />
                  </button>
                </div>

                <div className="text-sm text-gray-500 mb-4">
                  <p>Size: {item.selectedSize}</p>
                  <p>Color: {item.selectedColor}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-black"
                    >
                      -
                    </button>
                    <span className="w-12 text-center">{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-black"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                    {item.product.discount > 0 && (
                      <p className="text-sm text-red-500">
                        Save {item.product.discount}%
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="border-t pt-4">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                {subtotal < 50 && (
                  <p className="text-sm text-gray-500 mt-2">
                    Add ${(50 - subtotal).toFixed(2)} more to get free shipping
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-grow px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />
                <button
                  onClick={handleApplyPromo}
                  disabled={!promoCode || isApplyingPromo}
                  className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 disabled:bg-gray-400"
                >
                  Apply
                </button>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full py-3 bg-black text-white rounded-md hover:bg-gray-800 transition"
              >
                Proceed to Checkout
              </button>

              <Link
                href="/"
                className="block text-center text-gray-600 hover:text-black"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 