import Image from "next/image";
import Link from "next/link";

const featuredProducts = [
  {
    id: 1,
    name: "Oversized Fit Cotton T-shirt",
    price: 190,
    discount: 15,
    image: "/products/tshirt.jpg",
  },
  {
    id: 2,
    name: "Button-detail Jacket",
    price: 420,
    discount: 20,
    image: "/products/jacket.jpg",
  },
  {
    id: 3,
    name: "Women Solid Slim Fit Formal Suit",
    price: 420,
    discount: 0,
    image: "/products/suit.jpg",
  },
];

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative">
        <div className="mx-auto max-w-7xl">
          <div className="relative z-10 pt-14 lg:w-full lg:max-w-2xl">
            <div className="relative px-6 py-32 sm:py-40 lg:px-8 lg:py-56 lg:pr-0">
              <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  Wear clothes that matter
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Discover the latest trends in fashion and explore our new collection.
                </p>
                <div className="mt-10">
                  <Link
                    href="/shop"
                    className="rounded-md bg-black px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-800"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <Image
            src="/hero.jpg"
            alt="Hero"
            width={1920}
            height={1080}
            className="aspect-[3/2] object-cover lg:aspect-auto lg:h-full lg:w-full"
          />
        </div>
      </div>

      {/* Best Sellers section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
          <h2 className="text-3xl font-bold text-gray-900">Best Sellers</h2>

          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
            {featuredProducts.map((product) => (
              <div key={product.id} className="group relative">
                <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={500}
                    height={500}
                    className="h-full w-full object-cover object-center"
                  />
                  {product.discount > 0 && (
                    <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 text-sm rounded">
                      -{product.discount}%
                    </div>
                  )}
                </div>
                <h3 className="mt-6 text-base font-semibold text-gray-900">
                  <Link href={`/product/${product.id}`}>
                    <span className="absolute inset-0" />
                    {product.name}
                  </Link>
                </h3>
                <p className="text-sm text-gray-500">${product.price}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/shop"
              className="inline-block rounded-md border border-black px-8 py-3 text-base font-medium text-black hover:bg-black hover:text-white"
            >
              See More Best Sellers
            </Link>
          </div>
        </div>
      </div>

      {/* Exclusive Deal section */}
      <div className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900">Serrena Exclusive Deal</h2>
              <p className="mt-4 text-lg text-gray-600">
                Discover the epitome of style with Serrena Exclusives. Elevate your wardrobe with premium brands,
                where luxury meets fashion. Immerse yourself in a world of unparalleled elegance.
              </p>
              <div className="mt-8">
                <Link
                  href="/shop"
                  className="inline-block rounded-md bg-black px-8 py-3 text-base font-medium text-white hover:bg-gray-800"
                >
                  Visit Shop
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
