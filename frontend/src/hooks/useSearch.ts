import { useState, useCallback } from 'react';
import { products } from '@/data/products';
import { Product } from '@/types';

export function useSearch() {
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const searchProducts = useCallback((query: string) => {
    setIsSearching(true);
    const searchTerm = query.toLowerCase().trim();
    
    const results = products.filter(product => 
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
    );

    setSearchResults(results);
    setIsSearching(false);
    return results;
  }, []);

  return {
    searchProducts,
    searchResults,
    isSearching,
  };
} 