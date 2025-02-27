'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/hooks/useCart';
import { useSearch } from '@/hooks/useSearch';
import { categories } from '@/data/categories';
import { FiShoppingCart, FiHeart, FiUser, FiMenu, FiX, FiSearch } from 'react-icons/fi';
import SearchResults from './SearchResults';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { cart } = useCart();
  const { searchProducts, searchResults, isSearching } = useSearch();

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      searchProducts(searchQuery);
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value.trim()) {
      searchProducts(value);
    }
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-white/80 backdrop-blur-md'
      }`}
    >
      {/* Top Banner */}
      <div className="bg-black text-white text-center py-2 text-sm">
        Free shipping on orders over $50 | Get 10% off your first order
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden"
          >
            {isMenuOpen ? (
              <FiX className="h-6 w-6" />
            ) : (
              <FiMenu className="h-6 w-6" />
            )}
          </button>

          {/* Logo */}
          <Link href="/" className="text-2xl font-bold">
            FASHION
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              href="/"
              className={`hover:text-gray-600 ${
                pathname === '/' ? 'font-semibold' : ''
              }`}
            >
              Home
            </Link>
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className={`hover:text-gray-600 ${
                  pathname === `/category/${category.slug}` ? 'font-semibold' : ''
                }`}
              >
                {category.name}
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="hover:text-gray-600"
            >
              <FiSearch className="h-6 w-6" />
            </button>
            <Link href="/wishlist" className="hover:text-gray-600">
              <FiHeart className="h-6 w-6" />
            </Link>
            <Link href="/cart" className="hover:text-gray-600 relative">
              <FiShoppingCart className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            <Link href="/account" className="hover:text-gray-600">
              <FiUser className="h-6 w-6" />
            </Link>
          </div>
        </div>

        {/* Search Bar */}
        <div
          className={`${
            isSearchOpen ? 'max-h-[80vh]' : 'max-h-0'
          } overflow-hidden transition-all duration-300 relative`}
        >
          <form onSubmit={handleSearch} className="py-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={handleSearchInputChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                <FiSearch className="h-5 w-5 text-gray-400" />
              </button>
            </div>
          </form>

          {isSearchOpen && searchQuery && (
            <SearchResults
              results={searchResults}
              isSearching={isSearching}
              onClose={closeSearch}
            />
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 bg-white z-50 transition-transform duration-300 ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-4 right-4"
          >
            <FiX className="h-6 w-6" />
          </button>

          <nav className="mt-8 space-y-4">
            <Link
              href="/"
              className={`block text-lg ${
                pathname === '/' ? 'font-semibold' : ''
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className={`block text-lg ${
                  pathname === `/category/${category.slug}` ? 'font-semibold' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {category.name}
              </Link>
            ))}
          </nav>

          <div className="mt-8 space-y-4">
            <Link
              href="/account"
              className="flex items-center space-x-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <FiUser className="h-5 w-5" />
              <span>Account</span>
            </Link>
            <Link
              href="/wishlist"
              className="flex items-center space-x-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <FiHeart className="h-5 w-5" />
              <span>Wishlist</span>
            </Link>
            <Link
              href="/cart"
              className="flex items-center space-x-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <FiShoppingCart className="h-5 w-5" />
              <span>Cart ({cartItemsCount})</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
} 