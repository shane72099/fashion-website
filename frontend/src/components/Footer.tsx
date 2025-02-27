'use client';

import { useState } from 'react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { FaFacebook, FaTwitter, FaInstagram, FaPinterest } from 'react-icons/fa';

const footerLinks = {
  shop: [
    { name: 'New Arrivals', href: '/category/new-arrivals' },
    { name: 'Best Sellers', href: '/category/best-sellers' },
    { name: 'Sale', href: '/category/sale' },
    { name: 'Gift Cards', href: '/gift-cards' },
  ],
  help: [
    { name: 'Shipping', href: '/shipping' },
    { name: 'Returns', href: '/returns' },
    { name: 'Size Guide', href: '/size-guide' },
    { name: 'Contact Us', href: '/contact' },
  ],
  about: [
    { name: 'Our Story', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Press', href: '/press' },
    { name: 'Blog', href: '/blog' },
  ],
  legal: [
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Cookie Policy', href: '/cookies' },
  ],
};

const socialLinks = [
  { name: 'Facebook', icon: FaFacebook, href: 'https://facebook.com' },
  { name: 'Twitter', icon: FaTwitter, href: 'https://twitter.com' },
  { name: 'Instagram', icon: FaInstagram, href: 'https://instagram.com' },
  { name: 'Pinterest', icon: FaPinterest, href: 'https://pinterest.com' },
];

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement newsletter signup
    toast.success('Thank you for subscribing!');
    setEmail('');
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2">
                Subscribe to our newsletter
              </h3>
              <p className="text-gray-400">
                Get 10% off your first order and stay updated with the latest
                trends and exclusive offers.
              </p>
            </div>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-grow px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:border-white"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-white text-black rounded-md hover:bg-gray-200 transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-lg font-semibold mb-4">Shop</h4>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Help</h4>
            <ul className="space-y-2">
              {footerLinks.help.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">About</h4>
            <ul className="space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links and Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition"
                >
                  <social.icon className="h-6 w-6" />
                  <span className="sr-only">{social.name}</span>
                </a>
              ))}
            </div>
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} FASHION. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 