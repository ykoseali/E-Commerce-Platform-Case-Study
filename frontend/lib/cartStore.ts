import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, CartItem } from '../models/types';

interface CartState {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (product, quantity = 1) => {
        const existing = get().items.find((item) => item.product._id === product._id);
        if (existing) {
          set({
            items: get().items.map((item) =>
              item.product._id === product._id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          });
        } else {
          set({ items: [...get().items, { product, quantity }] });
        }
      },

      removeFromCart: (productId) => {
        set({ items: get().items.filter((item) => item.product._id !== productId) });
      },

      updateQuantity: (productId, quantity) => {
        set({
          items: get().items.map((item) =>
            item.product._id === productId ? { ...item, quantity } : item
          ),
        });
      },

      clearCart: () => set({ items: [] }),
    }),
    { name: 'cart-storage' }
  )
);
