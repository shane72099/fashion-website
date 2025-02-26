import Link from 'next/link'

const navigation = {
  categories: [
    { name: 'Men', href: '/category/men' },
    { name: 'Women', href: '/category/women' },
    { name: 'Kids', href: '/category/kids' },
  ],
  pages: [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-20">
          {/* Newsletter */}
          <div className="text-center">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900">
              Sign up to our newsletter & get 20% off
            </h3>
            <div className="mt-8">
              <form className="sm:mx-auto sm:max-w-xl">
                <div className="sm:flex">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email"
                    className="w-full rounded-md border-gray-300 px-5 py-3 placeholder-gray-500 focus:border-gray-500 focus:ring-gray-500 sm:max-w-xs"
                  />
                  <div className="mt-3 sm:ml-3 sm:mt-0">
                    <button
                      type="submit"
                      className="block w-full rounded-md bg-black px-5 py-3 text-base font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:px-10"
                    >
                      SIGN UP FOR FREE
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Footer navigation */}
          <div className="mt-20 border-t border-gray-200 pt-12">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {/* Brand */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900">SeRrena</h3>
                <p className="mt-6 text-sm text-gray-500">Your trusted fashion companion</p>
              </div>

              {/* Navigation */}
              <div>
                <h3 className="text-sm font-medium text-gray-900">Navigation</h3>
                <ul role="list" className="mt-6 space-y-6">
                  {navigation.pages.map((item) => (
                    <li key={item.name} className="text-sm">
                      <Link href={item.href} className="text-gray-500 hover:text-gray-600">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Categories */}
              <div>
                <h3 className="text-sm font-medium text-gray-900">Categories</h3>
                <ul role="list" className="mt-6 space-y-6">
                  {navigation.categories.map((item) => (
                    <li key={item.name} className="text-sm">
                      <Link href={item.href} className="text-gray-500 hover:text-gray-600">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h3 className="text-sm font-medium text-gray-900">Contact</h3>
                <ul role="list" className="mt-6 space-y-6">
                  <li className="text-sm">
                    <a href="tel:+1234567890" className="text-gray-500 hover:text-gray-600">
                      +1 (234) 567-890
                    </a>
                  </li>
                  <li className="text-sm">
                    <a href="mailto:info@serrena.com" className="text-gray-500 hover:text-gray-600">
                      info@serrena.com
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 border-t border-gray-200 pt-8">
            <p className="text-center text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Serrena. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
} 