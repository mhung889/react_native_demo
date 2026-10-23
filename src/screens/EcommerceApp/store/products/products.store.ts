import { create } from 'zustand';
import type { ProductType } from '../../types/product';

const CACHE_TTL = 15 * 60 * 1000;

export type CategoryCacheData = {
  products: ProductType[];
  page: number;
  hasMore: boolean;
  updatedAt: number;
};

type ProductState = {
  categories: Record<string, CategoryCacheData>;

  getCategory: (category: string) => CategoryCacheData | undefined;

  setCategory: (category: string, data: CategoryCacheData) => void;

  appendProducts: (category: string, page: number, response: ProductType[], limit: number) => void;

  isCacheValid: (category: string) => boolean;

  clearCategory: (category: string) => void;
  clearAll: () => void;
};

export const useProductStore = create<ProductState>((set, get) => ({
  categories: {},

  getCategory: (category) => {
    // console.log(get().categories);

    return get().categories[category];
  },

  setCategory: (category, data) =>
    set((state) => ({
      categories: {
        ...state.categories,
        [category]: data,
      },
    })),

  appendProducts: (category, page, response, limit) =>
    set((state) => {
      const previous = state.categories[category];
      const oldProducts = page === 1 ? [] : previous?.products ?? [];

      const existingIds = new Set(oldProducts.map((item) => item.id));
      const newProducts = page === 1 ? response : response.filter((item) => !existingIds.has(item.id));

      return {
        categories: {
          ...state.categories,
          [category]: {
            products: page === 1 ? response : [...oldProducts, ...newProducts],
            page,
            hasMore: response.length === limit,
            updatedAt: Date.now(),
          },
        },
      };
    }),

  isCacheValid: (category) => {
    const cached = get().categories[category];

    return !!cached && Date.now() - cached.updatedAt < CACHE_TTL;
  },

  clearCategory: (category) =>
    set((state) => {
      const categories = { ...state.categories };
      delete categories[category];

      return { categories };
    }),

  clearAll: () => set({ categories: {} }),
}));
