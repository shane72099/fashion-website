'use client';

import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { CartState, CartItem } from '@/types';

interface ExtendedCartState extends CartState {
  isLoading: boolean;
  error: string | null;
}

type CartAction =
  | { type: 'SET_CART'; payload: CartState }
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

interface CartContextType {
  state: ExtendedCartState;
  dispatch: React.Dispatch<CartAction>;
}

const CART_STORAGE_KEY = 'fashion_store_cart';

const CartContext = createContext<CartContextType | undefined>(undefined);

function calculateTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
}

function cartReducer(state: ExtendedCartState, action: CartAction): ExtendedCartState {
  switch (action.type) {
    case 'SET_CART':
      return {
        ...state,
        items: action.payload.items,
        total: action.payload.total,
      };
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
        return {
          ...state,
          items: updatedItems,
          total: calculateTotal(updatedItems),
        };
      }
      const newItems = [...state.items, action.payload];
      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems),
      };
    }
    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload);
      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems),
      };
    }
    case 'UPDATE_QUANTITY': {
      const newItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems),
      };
    }
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        total: 0,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
    isLoading: true,
    error: null,
  });

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        dispatch({ type: 'SET_CART', payload: JSON.parse(savedCart) });
      }
    } catch (error) {
      console.error('Error loading cart from storage:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Error loading cart' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!state.isLoading) {
      try {
        localStorage.setItem(
          CART_STORAGE_KEY,
          JSON.stringify({ items: state.items, total: state.total })
        );
      } catch (error) {
        console.error('Error saving cart to storage:', error);
        dispatch({ type: 'SET_ERROR', payload: 'Error saving cart' });
      }
    }
  }, [state.items, state.total, state.isLoading]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
} 