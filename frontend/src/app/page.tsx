'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/data/products';
import { categories } from '@/data/categories';
import { motion } from 'framer-motion';

const Home = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  return (
    <div className="min-h-screen">
      {/* Hero Grid Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-0">
        <div className="relative h-[70vh] md:h-screen">
          <Image
            src="https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc"
            alt="Urban Fashion"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-black/10">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-light text-white mb-6 text-center"
            >
              New Arrivals
            </motion.h1>
            <Link
              href="/category/new-arrivals"
              className="text-white border border-white px-8 py-3 hover:bg-white hover:text-black transition duration-300"
            >
              Shop Now
            </Link>
          </div>
        </div>
        <div className="relative h-[70vh] md:h-screen">
          <Image
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b"
            alt="Bestsellers"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-black/10">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-light text-white mb-6 text-center"
            >
              Bestsellers
            </motion.h1>
            <Link
              href="/category/bestsellers"
              className="text-white border border-white px-8 py-3 hover:bg-white hover:text-black transition duration-300"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-px bg-gray-100">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/category/${category.slug}`}
            className="group relative aspect-[3/4] bg-white overflow-hidden"
          >
            <Image
              src={category.image}
              alt={category.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-center bg-gradient-to-t from-black/40 to-transparent">
              <h3 className="text-white text-lg font-light">{category.name}</h3>
            </div>
          </Link>
        ))}
      </section>

      {/* Featured Collection */}
      <section className="py-20 px-6 md:px-12">
        <h2 className="text-2xl font-light text-center mb-12">Featured Collection</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
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
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 text-xs">
                    {product.discount}% Off
                  </div>
                )}
              </div>
              <h3 className="text-sm font-light mb-2">{product.name}</h3>
              <div className="flex items-center gap-3">
                <p className="text-sm">
                  ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                </p>
                {product.discount > 0 && (
                  <p className="text-sm text-gray-500 line-through">
                    ${product.price.toFixed(2)}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-20 px-6 md:px-12 bg-[#f8f8f8]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-light mb-6">Fewer, Better</h2>
          <p className="text-gray-600 mb-8">
            Your life simplified by a smarter, better wardrobe. Our collection is sustainably made and designed to last.
          </p>
          <Link
            href="/about"
            className="text-black border-b border-black pb-1 hover:opacity-70 transition duration-300"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-light mb-4">Join Us</h2>
          <p className="text-gray-600 mb-8">
            Sign up for exclusive updates, new arrivals & insider-only discounts
          </p>
          <form className="flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 focus:outline-none focus:border-black"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-black text-white hover:bg-gray-800 transition duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
