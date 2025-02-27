'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/hooks/useCart';
import { categories } from '@/data/categories';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingBag, FiUser, FiMenu, FiX, FiSearch } from 'react-icons/fi';
import SearchResults from './SearchResults';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const pathname = usePathname();
  const { cart } = useCart();

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-[#f8f8f8] text-xs py-2 text-center">
        Free shipping on orders over $200
      </div>

      <header
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-sm' : 'bg-white'
        }`}
      >
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex items-center justify-between px-4 md:px-8 h-16">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2"
            >
              {isMenuOpen ? (
                <FiX className="h-5 w-5" />
              ) : (
                <FiMenu className="h-5 w-5" />
              )}
            </button>

            {/* Logo */}
            <Link href="/" className="text-xl font-light tracking-widest">
              FASHION
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {categories.map((category) => (
                <div
                  key={category.slug}
                  className="relative group"
                  onMouseEnter={() => setActiveCategory(category.slug)}
                  onMouseLeave={() => setActiveCategory(null)}
                >
                  <Link
                    href={`/category/${category.slug}`}
                    className={`text-sm font-light hover:opacity-70 transition-opacity ${
                      pathname === `/category/${category.slug}` ? 'text-black' : 'text-gray-600'
                    }`}
                  >
                    {category.name}
                  </Link>
                  {activeCategory === category.slug && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 w-64 bg-white shadow-lg p-6"
                    >
                      <div className="space-y-4">
                        <Link
                          href={`/category/${category.slug}/new-arrivals`}
                          className="block text-sm font-light text-gray-600 hover:text-black transition-colors"
                        >
                          New Arrivals
                        </Link>
                        <Link
                          href={`/category/${category.slug}/bestsellers`}
                          className="block text-sm font-light text-gray-600 hover:text-black transition-colors"
                        >
                          Bestsellers
                        </Link>
                        <Link
                          href={`/category/${category.slug}/all`}
                          className="block text-sm font-light text-gray-600 hover:text-black transition-colors"
                        >
                          Shop All
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}
            </nav>

            {/* Icons */}
            <div className="flex items-center space-x-6">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2"
              >
                <FiSearch className="h-5 w-5" />
              </button>
              <Link href="/account" className="p-2 hidden md:block">
                <FiUser className="h-5 w-5" />
              </Link>
              <Link href="/cart" className="p-2 relative">
                <FiShoppingBag className="h-5 w-5" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Search Bar */}
          <AnimatePresence>
            {isSearchOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="border-t overflow-hidden"
              >
                <div className="p-4">
                  <div className="relative max-w-2xl mx-auto">
                    <input
                      type="text"
                      placeholder="Search our store"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-4 py-3 bg-transparent border-b border-gray-200 focus:outline-none focus:border-black text-sm"
                    />
                    <button className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      <FiSearch className="h-5 w-5 text-gray-400" />
                    </button>
                  </div>
                </div>

                {searchQuery && (
                  <SearchResults
                    query={searchQuery}
                    onClose={() => {
                      setSearchQuery('');
                      setIsSearchOpen(false);
                    }}
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed inset-0 bg-white z-50 lg:hidden"
            >
              <div className="p-4">
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="absolute top-4 right-4 p-2"
                >
                  <FiX className="h-6 w-6" />
                </button>

                <nav className="mt-16 space-y-6">
                  {categories.map((category) => (
                    <div key={category.slug} className="space-y-4">
                      <Link
                        href={`/category/${category.slug}`}
                        className="block text-lg font-light"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {category.name}
                      </Link>
                      <div className="pl-4 space-y-3">
                        <Link
                          href={`/category/${category.slug}/new-arrivals`}
                          className="block text-sm text-gray-600"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          New Arrivals
                        </Link>
                        <Link
                          href={`/category/${category.slug}/bestsellers`}
                          className="block text-sm text-gray-600"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Bestsellers
                        </Link>
                        <Link
                          href={`/category/${category.slug}/all`}
                          className="block text-sm text-gray-600"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Shop All
                        </Link>
                      </div>
                    </div>
                  ))}
                </nav>

                <div className="mt-8 space-y-6">
                  <Link
                    href="/account"
                    className="flex items-center space-x-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FiUser className="h-5 w-5" />
                    <span className="font-light">Account</span>
                  </Link>
                  <Link
                    href="/cart"
                    className="flex items-center space-x-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FiShoppingBag className="h-5 w-5" />
                    <span className="font-light">Cart ({cartItemsCount})</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
} 