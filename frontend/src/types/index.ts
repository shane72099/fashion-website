// User related types
export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

// Product related types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  sizes: string[];
  colors: string[];
  stock: number;
  discount?: number;
  createdAt: string;
  updatedAt: string;
}

// Order related types
export interface OrderItem {
  product: Product;
  quantity: number;
  price: number;
  size: string;
  color: string;
}

export interface Order {
  id: string;
  user: User;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Address;
  paymentMethod: 'stripe' | 'paypal';
  paymentStatus: 'pending' | 'paid' | 'failed';
  createdAt: string;
  updatedAt: string;
}

// Address type
export interface Address {
  id: string;
  type: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault?: boolean;
}

// Cart related types
export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

export interface CartState {
  items: CartItem[];
  total: number;
}

// API Error type
export interface ApiError {
  message: string;
  code?: string;
  status?: number;
} 