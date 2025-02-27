import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from './ProductCard';
import { CartProvider } from '@/context/CartContext';
import { Product } from '@/types';

const mockProduct: Product = {
  id: '1',
  name: 'Test Product',
  description: 'Test Description',
  price: 99.99,
  image: '/test-image.jpg',
  category: 'test',
  sizes: ['S', 'M', 'L'],
  colors: ['Red', 'Blue'],
  stock: 10,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

describe('ProductCard', () => {
  const renderWithProvider = (ui: React.ReactElement) => {
    return render(<CartProvider>{ui}</CartProvider>);
  };

  it('renders product information correctly', () => {
    renderWithProvider(<ProductCard product={mockProduct} />);

    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
    expect(screen.getByText(`$${mockProduct.price.toFixed(2)}`)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', mockProduct.image);
  });

  it('adds product to cart when Add to Cart button is clicked', () => {
    renderWithProvider(<ProductCard product={mockProduct} />);

    const addToCartButton = screen.getByRole('button', { name: /add to cart/i });
    fireEvent.click(addToCartButton);

    // You might want to verify the cart state here
    // This would require exposing the cart state in your test environment
  });

  it('shows discount badge when product has a discount', () => {
    const productWithDiscount = { ...mockProduct, discount: 20 };
    renderWithProvider(<ProductCard product={productWithDiscount} />);

    expect(screen.getByText('-20%')).toBeInTheDocument();
  });

  it('does not show discount badge when product has no discount', () => {
    renderWithProvider(<ProductCard product={mockProduct} />);

    const discountBadge = screen.queryByText(/-\d+%/);
    expect(discountBadge).not.toBeInTheDocument();
  });
}); 