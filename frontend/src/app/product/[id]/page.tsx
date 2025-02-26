'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import toast from 'react-hot-toast';

// This would normally come from an API call
const product = {
  id: '1',
  name: 'Oversized Fit Cotton T-shirt',
  price: 190,
  description: 'Premium cotton t-shirt with an oversized fit for maximum comfort. Features a ribbed crew neck and short sleeves.',
  image: '/products/tshirt.jpg',
  sizes: ['XS', 'S', 'M', 'L', 'XL'],
  colors: ['White', 'Black', 'Gray'],
  stock: 10
};

export default function ProductPage({ params }: { params: { id: string } }) {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const { dispatch } = useCart();

  const addToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error('Please select size and color');
      return;
    }

    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      }
    });

    toast.success('Added to cart');
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
          {/* Product Image */}
          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg">
            <Image
              src={product.image}
              alt={product.name}
              width={600}
              height={600}
              className="h-full w-full object-cover object-center"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.name}</h1>
            <p className="mt-4 text-xl text-gray-900">${product.price}</p>
            
            <div className="mt-4">
              <p className="text-base text-gray-700">{product.description}</p>
            </div>

            {/* Size Selector */}
            <div className="mt-8">
              <h3 className="text-sm font-medium text-gray-900">Size</h3>
              <div className="mt-2 grid grid-cols-5 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`flex items-center justify-center rounded-md border py-2 text-sm font-medium ${
                      selectedSize === size
                        ? 'border-black bg-black text-white'
                        : 'border-gray-300 text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selector */}
            <div className="mt-8">
              <h3 className="text-sm font-medium text-gray-900">Color</h3>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`flex items-center justify-center rounded-md border py-2 text-sm font-medium ${
                      selectedColor === color
                        ? 'border-black bg-black text-white'
                        : 'border-gray-300 text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={addToCart}
              className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-black px-8 py-3 text-base font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
            >
              Add to Cart
            </button>

            {/* Stock Status */}
            <p className="mt-4 text-sm text-gray-500">
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 