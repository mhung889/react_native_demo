import { MMKVStorage } from './MMKV.store';
import type { ProductType } from '../../types/product';

export type CategoryCacheData = {
  products: ProductType[];
  page: number;
  hasMore: boolean;
  updatedAt: number;
};

const CACHE_PREFIX = 'shop:category:';

const getCacheKey = (category: string) => `${CACHE_PREFIX}${encodeURIComponent(category.trim())}`;

export const getCategoryCache = (category: string): CategoryCacheData | null => {
  const raw = MMKVStorage.getString(getCacheKey(category));

  // console.log(JSON.parse(raw || ''));
  // console.log(MMKVStorage.getAllKeys());

  if (!raw) {
    return null;
  }

  try {
    const parsed: unknown = JSON.parse(raw);

    if (
      typeof parsed !== 'object' ||
      parsed === null ||
      !('products' in parsed) ||
      !Array.isArray(parsed.products) ||
      !('page' in parsed) ||
      typeof parsed.page !== 'number' ||
      !('hasMore' in parsed) ||
      typeof parsed.hasMore !== 'boolean' ||
      !('updatedAt' in parsed) ||
      typeof parsed.updatedAt !== 'number'
    ) {
      MMKVStorage.remove(getCacheKey(category));
      return null;
    }

    return parsed as CategoryCacheData;
  } catch {
    MMKVStorage.remove(getCacheKey(category));
    return null;
  }
};

export const setCategoryCache = (category: string, data: CategoryCacheData): void => {
  MMKVStorage.set(getCacheKey(category), JSON.stringify(data));
};

export const removeCategoryCache = (category: string): void => {
  MMKVStorage.remove(getCacheKey(category));
};

export const clearAllCategoryCache = (): void => {
  const keys = MMKVStorage.getAllKeys();

  keys.filter((key) => key.startsWith(CACHE_PREFIX)).forEach((key) => MMKVStorage.remove(key));
};
