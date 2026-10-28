import { create } from 'zustand';
import { getPriceBySize } from '../../utils';

export interface CartItem {
  id: number;
  thumbnail: string;
  title: string;
  price: number;
  size: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: number, size: string) => void;
  updateItem: (id: number, oldSize: string, newSize: string) => void;
  incrementQuantity: (id: number, size: string) => void;
  decrementQuantity: (id: number, size: string) => void;
  clearCart: () => void;
}

const MAX_QUANTITY = 20;

export const useCartStore = create<CartStore>((set) => ({
  items: [],

  addItem: (product) => {
    set((state) => {
      const existing = state.items.some((item) => item.id === product.id && item.size === product.size);
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.id === product.id && item.size === product.size ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        };
      }
      return {
        items: [...state.items, { ...product, quantity: 1 }],
      };
    });
  },

  removeItem: (id, size) => {
    set((state) => {
      return {
        items: state.items.filter((item) => !(item.id === id && item.size === size)),
      };
    });
  },

  updateItem: (id, oldSize, newSize) => {
    set((state) => {
      const currentItem = state.items.find((item) => item.id === id && item.size === oldSize);

      if (!currentItem || oldSize === newSize) return state;

      const existingSameSize = state.items.find((item) => item.id === id && item.size === newSize);

      // Nếu size mới đã tồn tại: cộng quantity và xóa item cũ
      if (existingSameSize) {
        const quantity = Math.min(existingSameSize.quantity + currentItem.quantity, MAX_QUANTITY);

        return {
          items: state.items
            .filter((item) => !(item.id === id && item.size === oldSize))
            .map((item) => (item.id === id && item.size === newSize ? { ...item, quantity } : item)),
        };
      }

      // Khôi phục giá cơ sở từ giá đã tính theo size cũ
      const oldExtra = oldSize === 'M' ? 30 : oldSize === 'L' ? 50 : 0;

      const basePrice = currentItem.price - oldExtra;

      // Tính giá theo size mới
      const newPrice = getPriceBySize(basePrice, newSize);

      return {
        items: state.items.map((item) =>
          item.id === id && item.size === oldSize
            ? {
                ...item,
                size: newSize,
                price: Number(newPrice.toFixed(2)),
              }
            : item,
        ),
      };
    });
  },

  incrementQuantity: (id, size) => {
    set((state) => {
      const existing = state.items.find((item) => item.id === id && item.size === size);
      if (!existing || existing.quantity >= MAX_QUANTITY) {
        return state;
      }
      return {
        items: state.items.map((item) =>
          item.id === id && item.size === size ? { ...item, quantity: item.quantity + 1 } : item,
        ),
      };
    });
  },

  decrementQuantity: (id, size) => {
    set((state) => {
      const existing = state.items.find((item) => item.id === id && item.size === size);
      if (!existing || existing.quantity <= 1) {
        return state;
      }
      return {
        items: state.items.map((item) =>
          item.id === id && item.size === size ? { ...item, quantity: item.quantity - 1 } : item,
        ),
      };
    });
  },
  clearCart: () => {
    set({
      items: [],
    });
  },
}));

export const useCartTotalAmount = () =>
  useCartStore((state) => state.items.reduce((total, item) => total + item.price * item.quantity, 0));
