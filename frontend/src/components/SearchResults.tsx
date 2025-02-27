import { Product } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

interface SearchResultsProps {
  results: Product[];
  isSearching: boolean;
  onClose: () => void;
}

export default function SearchResults({ results, isSearching, onClose }: SearchResultsProps) {
  if (isSearching) {
    return (
      <div className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-lg p-4">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-lg p-4">
        <p className="text-center text-gray-500">No products found</p>
      </div>
    );
  }

  return (
    <div className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-lg p-4 max-h-[70vh] overflow-y-auto">
      <div className="space-y-4">
        {results.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            className="flex items-center gap-4 p-2 hover:bg-gray-50 rounded-lg transition"
            onClick={onClose}
          >
            <div className="relative w-16 h-16 flex-shrink-0">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover rounded-md"
              />
            </div>
            <div className="flex-grow">
              <h4 className="font-semibold">{product.name}</h4>
              <p className="text-sm text-gray-500">{product.category}</p>
              <p className="text-sm font-semibold">${product.price.toFixed(2)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 