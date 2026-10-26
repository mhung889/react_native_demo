import { createMMKV } from 'react-native-mmkv';
import type { StateStorage } from 'zustand/middleware';

export const MMKVStorage = createMMKV();

export const FAVORITES_KEY = 'Favorites_key_test';

export const zustandStorage: StateStorage = {
  getItem: (name) => {
    return MMKVStorage.getString(name) ?? null;
  },

  setItem: (name, value) => {
    MMKVStorage.set(name, value);
  },

  removeItem: (name) => {
    MMKVStorage.remove(name);
  },
};
