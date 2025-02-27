'use client';

import { useState, useEffect } from 'react';
import { products } from '@/data/products';
import { categories } from '@/data/categories';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('featured');
  const [isLoading, setIsLoading] = useState(true);

  const category = categories.find(cat => cat.slug === params.slug);

  useEffect(() => {
    setIsLoading(true);
    let filtered = products.filter(product => product.category === params.slug);

    // Apply filters
    if (selectedSizes.length > 0) {
      filtered = filtered.filter(product => 
        product.sizes.some(size => selectedSizes.includes(size))
      );
    }

    if (selectedColors.length > 0) {
      filtered = filtered.filter(product => 
        product.colors.some(color => selectedColors.includes(color))
      );
    }

    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      default:
        // Featured sorting (by discount and then by price)
        filtered.sort((a, b) => (b.discount || 0) - (a.discount || 0) || b.price - a.price);
    }

    setFilteredProducts(filtered);
    setIsLoading(false);
  }, [params.slug, selectedSizes, selectedColors, priceRange, sortBy]);

  if (!category) {
    return <div className="text-center py-20">Category not found</div>;
  }

  const allSizes = Array.from(new Set(products.flatMap(p => p.sizes)));
  const allColors = Array.from(new Set(products.flatMap(p => p.colors)));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Category Header */}
      <div className="relative h-[300px] mb-8 rounded-lg overflow-hidden">
        <Image
          src={category.image}
          alt={category.name}
          fill
          className="object-cover brightness-75"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-2">{category.name}</h1>
            <p className="text-lg">{category.description}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-64 space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Sort By</h3>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Price Range</h3>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                className="w-24 p-2 border rounded-md"
                min="0"
              />
              <span>to</span>
              <input
                type="number"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="w-24 p-2 border rounded-md"
                min="0"
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Sizes</h3>
            <div className="space-y-2">
              {allSizes.map((size) => (
                <label key={size} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedSizes.includes(size)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedSizes([...selectedSizes, size]);
                      } else {
                        setSelectedSizes(selectedSizes.filter(s => s !== size));
                      }
                    }}
                    className="rounded border-gray-300 text-black focus:ring-black"
                  />
                  {size}
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Colors</h3>
            <div className="space-y-2">
              {allColors.map((color) => (
                <label key={color} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedColors.includes(color)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedColors([...selectedColors, color]);
                      } else {
                        setSelectedColors(selectedColors.filter(c => c !== color));
                      }
                    }}
                    className="rounded border-gray-300 text-black focus:ring-black"
                  />
                  {color.charAt(0).toUpperCase() + color.slice(1)}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="animate-pulse">
                  <div className="bg-gray-200 h-64 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p className="text-gray-600">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  className="group"
                >
                  <div className="relative h-64 mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-300"
                    />
                    {product.discount > 0 && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded">
                        {product.discount}% OFF
                      </div>
                    )}
                    {product.stock < 5 && product.stock > 0 && (
                      <div className="absolute bottom-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded text-sm">
                        Only {product.stock} left!
                      </div>
                    )}
                    {product.stock === 0 && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <span className="text-white font-semibold">Out of Stock</span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-gray-600 transition">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-semibold">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.discount > 0 && (
                        <span className="ml-2 text-sm text-gray-500 line-through">
                          ${(product.price * (1 + product.discount / 100)).toFixed(2)}
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-500">
                      {product.sizes.join(', ')}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 