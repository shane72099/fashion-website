'use client';

import { useState } from 'react';
import ProductGrid from '@/components/ProductGrid';

// This would normally come from an API call
const products = [
  {
    id: '1',
    name: 'Oversized Fit Cotton T-shirt',
    price: 190,
    image: '/products/tshirt.jpg',
    description: 'Comfortable oversized cotton t-shirt with a relaxed fit.',
    discount: 15,
  },
  {
    id: '2',
    name: 'Button-detail Jacket',
    price: 420,
    image: '/products/jacket.jpg',
    description: 'Stylish jacket with unique button details and premium finish.',
    discount: 20,
  },
  {
    id: '3',
    name: 'Women Solid Slim Fit Formal Suit',
    price: 420,
    image: '/products/suit.jpg',
    description: 'Professional slim-fit formal suit for a sophisticated look.',
  },
];

const filters = [
  { name: 'Price', options: ['Under $100', '$100-$200', '$200-$500', 'Over $500'] },
  { name: 'Size', options: ['XS', 'S', 'M', 'L', 'XL'] },
  { name: 'Color', options: ['Black', 'White', 'Gray', 'Blue', 'Red'] },
];

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const toggleFilter = (filter: string) => {
    setActiveFilters(prev =>
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const categoryName = params.slug.charAt(0).toUpperCase() + params.slug.slice(1);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">{categoryName}</h1>
        </div>

        <div className="grid grid-cols-4 gap-x-8 gap-y-10 pt-10">
          {/* Filters */}
          <div className="hidden lg:block">
            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
            <div className="mt-6 space-y-8">
              {filters.map((filter) => (
                <div key={filter.name}>
                  <h3 className="text-sm font-medium text-gray-900">{filter.name}</h3>
                  <div className="mt-4 space-y-2">
                    {filter.options.map((option) => (
                      <div key={option} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={activeFilters.includes(option)}
                          onChange={() => toggleFilter(option)}
                          className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                        />
                        <label className="ml-3 text-sm text-gray-600">{option}</label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Product grid */}
          <div className="col-span-4 lg:col-span-3">
            <ProductGrid products={products} />
          </div>
        </div>
      </div>
    </div>
  );
} 