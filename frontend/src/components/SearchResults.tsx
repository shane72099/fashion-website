import { useEffect, useState } from 'react';
import { Product } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { products } from '@/data/products';

interface SearchResultsProps {
  query: string;
  onClose: () => void;
}

export default function SearchResults({ query, onClose }: SearchResultsProps) {
  const [isSearching, setIsSearching] = useState(true);
  const [results, setResults] = useState<Product[]>([]);

  useEffect(() => {
    const searchProducts = () => {
      setIsSearching(true);
      const searchTerm = query.toLowerCase().trim();
      
      const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
      );

      setResults(filteredProducts);
      setIsSearching(false);
    };

    const timer = setTimeout(searchProducts, 300);
    return () => clearTimeout(timer);
  }, [query]);

  if (isSearching) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute top-full left-0 right-0 bg-white border-t"
      >
        <div className="flex items-center justify-center py-12">
          <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
        </div>
      </motion.div>
    );
  }

  if (results.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute top-full left-0 right-0 bg-white border-t"
      >
        <div className="max-w-2xl mx-auto py-12 px-4 text-center">
          <p className="text-gray-600 mb-2">No results found for "{query}"</p>
          <p className="text-sm text-gray-500">
            Please try searching for something else or browse our categories
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute top-full left-0 right-0 bg-white border-t"
    >
      <div className="max-w-2xl mx-auto py-8 px-4">
        <div className="mb-8 text-sm text-gray-600">
          {results.length} result{results.length === 1 ? '' : 's'} for "{query}"
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-8">
          {results.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              onClick={onClose}
              className="group"
            >
              <div className="relative aspect-[3/4] overflow-hidden mb-4">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {product.discount > 0 && (
                  <div className="absolute top-4 right-4 bg-white px-2 py-1 text-xs">
                    {product.discount}% Off
                  </div>
                )}
              </div>
              <h3 className="text-sm font-light mb-1">{product.name}</h3>
              <div className="flex items-center gap-2">
                <p className="text-sm">
                  ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                </p>
                {product.discount > 0 && (
                  <p className="text-xs text-gray-500 line-through">
                    ${product.price.toFixed(2)}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="border-t">
        <div className="max-w-2xl mx-auto py-4 px-4">
          <Link
            href={`/search?q=${encodeURIComponent(query)}`}
            onClick={onClose}
            className="text-sm text-gray-600 hover:text-black transition-colors"
          >
            View all results
          </Link>
        </div>
      </div>
    </motion.div>
  );
} 