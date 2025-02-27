import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Toaster } from 'react-hot-toast'
import { CartProvider } from '@/context/CartContext'
import { ErrorBoundary } from '@/components/ErrorBoundary'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Serrena - Fashion Store',
  description: 'Your trusted fashion companion',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorBoundary>
          <CartProvider>
            <Toaster position="top-center" />
            <Navbar />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
          </CartProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
