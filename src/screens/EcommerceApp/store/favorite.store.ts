import { create } from 'zustand';
import { ProductType } from '../types/product';
import { MMKVStorage } from './MMKV.store';
import { useAuthStore } from './auth.store';

type FavoriteState = {
  favoriteProductList: ProductType[];
  loadFavorites: () => void;
  getFavoriteProductList: () => ProductType[];
  addFavoriteProduct: (product: ProductType) => void;
  removeFavoriteProduct: (productId: ProductType['id']) => void;
  isFavoriteProduct: (productId: ProductType['id']) => boolean;
};

let currentUserId: number | null = null;

const getFavoriteProductsFromStore = (userId: number | null) => {
  try {
    const data = MMKVStorage.getString(`Favorite_key_${userId}`);

    if (!data) return [];
    const favorites: unknown = JSON.parse(data);
    return Array.isArray(favorites) ? favorites : [];
  } catch {
    return [];
  }
};

const getFavoriteKey = (userId: number) => {
  return `Favorite_key_${userId}`;
};

export const useFavoriteStore = create<FavoriteState>((set, get) => ({
  favoriteProductList: [],

  loadFavorites: () => {
    const auth = useAuthStore.getState();

    if (!auth.accessToken || !auth.user?.id) {
      currentUserId = null;
      set({ favoriteProductList: [] });
      return;
    }

    currentUserId = auth.user.id;

    const favorites = getFavoriteProductsFromStore(currentUserId);

    set({ favoriteProductList: favorites });

    const key = getFavoriteKey(currentUserId);

    if (MMKVStorage.getString(key) === undefined) {
      MMKVStorage.set(getFavoriteKey(currentUserId), JSON.stringify(favorites));
    }
  },

  getFavoriteProductList: () => {
    return get().favoriteProductList;
  },
  addFavoriteProduct: (product: ProductType) => {
    if (!currentUserId) return;
    const favoriteList = get().favoriteProductList;

    const existProduct = favoriteList.some(
      (favorite: ProductType) => favorite.id === product.id,
    );
    if (existProduct) return;

    const newFavorites = [...favoriteList, product];

    set({
      favoriteProductList: newFavorites,
    });
    console.log(MMKVStorage.getString(getFavoriteKey(currentUserId)));
    // update MMKVStorage
    MMKVStorage.set(
      getFavoriteKey(currentUserId),
      JSON.stringify(newFavorites),
    );
  },
  removeFavoriteProduct: (productId: ProductType['id']) => {
    if (!currentUserId) return;
    const newFavorites = get().favoriteProductList.filter(
      item => item.id !== productId,
    );
    set({
      favoriteProductList: newFavorites,
    });
    // update MMKVStorage
    MMKVStorage.set(
      getFavoriteKey(currentUserId),
      JSON.stringify(newFavorites),
    );
  },

  isFavoriteProduct: (productId: ProductType['id']) => {
    return get().favoriteProductList.some(item => item.id === productId);
  },

  clearFavorites: () => {
    currentUserId = null;
    // set({ favoriteProductList: [] });
  },
}));
