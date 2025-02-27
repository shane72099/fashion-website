'use client';

import { useState } from 'react';
import Image from 'next/image';
import { products } from '@/data/products';
import { useCart } from '@/hooks/useCart';
import { toast } from 'react-hot-toast';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { FaShippingFast } from 'react-icons/fa';
import { TbReplace } from 'react-icons/tb';
import { MdLocalOffer } from 'react-icons/md';

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find(p => p.id === params.id);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isWishlist, setIsWishlist] = useState(false);
  const { addToCart } = useCart();

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-2xl font-semibold">Product not found</h1>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }
    if (!selectedColor) {
      toast.error('Please select a color');
      return;
    }
    if (quantity < 1) {
      toast.error('Please select a valid quantity');
      return;
    }
    if (quantity > product.stock) {
      toast.error('Not enough stock available');
      return;
    }

    addToCart({
      ...product,
      selectedSize,
      selectedColor,
      quantity,
    });
    toast.success('Added to cart!');
  };

  const discountedPrice = product.discount
    ? product.price * (1 - product.discount / 100)
    : product.price;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-lg overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
            <button
              onClick={() => setIsWishlist(!isWishlist)}
              className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:scale-110 transition"
            >
              {isWishlist ? (
                <BsHeartFill className="text-red-500 w-6 h-6" />
              ) : (
                <BsHeart className="w-6 h-6" />
              )}
            </button>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[product.image, ...Array(3)].map((img, i) => (
              <div
                key={i}
                className="relative aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition"
              >
                <Image
                  src={img || product.image}
                  alt={`${product.name} view ${i + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-gray-600">{product.description}</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-baseline gap-4">
              <span className="text-3xl font-bold">
                ${discountedPrice.toFixed(2)}
              </span>
              {product.discount > 0 && (
                <>
                  <span className="text-xl text-gray-500 line-through">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-red-500 font-semibold">
                    {product.discount}% OFF
                  </span>
                </>
              )}
            </div>
            {product.stock < 5 && product.stock > 0 && (
              <p className="text-yellow-600">
                Only {product.stock} items left in stock!
              </p>
            )}
          </div>

          {/* Size Selector */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Select Size</h3>
            <div className="flex flex-wrap gap-3">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 rounded-md border ${
                    selectedSize === size
                      ? 'border-black bg-black text-white'
                      : 'border-gray-300 hover:border-black'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selector */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Select Color</h3>
            <div className="flex flex-wrap gap-3">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-10 h-10 rounded-full border-2 ${
                    selectedColor === color
                      ? 'border-black ring-2 ring-black ring-offset-2'
                      : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color.toLowerCase() }}
                  title={color}
                />
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Quantity</h3>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-black"
              >
                -
              </button>
              <span className="text-xl font-semibold">{quantity}</span>
              <button
                onClick={() =>
                  setQuantity(Math.min(product.stock, quantity + 1))
                }
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-black"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`w-full py-4 rounded-md text-white font-semibold text-lg ${
              product.stock === 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-black hover:bg-gray-800'
            }`}
          >
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>

          {/* Product Features */}
          <div className="border-t pt-6 space-y-4">
            <div className="flex items-center gap-4">
              <FaShippingFast className="w-6 h-6" />
              <div>
                <h4 className="font-semibold">Free Shipping</h4>
                <p className="text-sm text-gray-600">
                  On orders over $50
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <TbReplace className="w-6 h-6" />
              <div>
                <h4 className="font-semibold">Easy Returns</h4>
                <p className="text-sm text-gray-600">
                  30-day return policy
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <MdLocalOffer className="w-6 h-6" />
              <div>
                <h4 className="font-semibold">Special Offer</h4>
                <p className="text-sm text-gray-600">
                  Get 10% off your first order
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-16">
        <div className="border-b">
          <div className="max-w-7xl mx-auto">
            <nav className="-mb-px flex space-x-8">
              <a
                href="#"
                className="border-black text-black border-b-2 py-4 px-1 text-sm font-medium"
              >
                Description
              </a>
              <a
                href="#"
                className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-b-2 py-4 px-1 text-sm font-medium"
              >
                Reviews
              </a>
              <a
                href="#"
                className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-b-2 py-4 px-1 text-sm font-medium"
              >
                Shipping
              </a>
            </nav>
          </div>
        </div>

        <div className="py-8">
          <div className="prose max-w-none">
            <p>{product.description}</p>
            <h3>Product Features</h3>
            <ul>
              <li>High-quality materials</li>
              <li>Comfortable fit</li>
              <li>Durable construction</li>
              <li>Easy care instructions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 