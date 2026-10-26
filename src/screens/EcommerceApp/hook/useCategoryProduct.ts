import { useCallback, useEffect, useRef, useState } from 'react';

import { productServices } from '../services/productService';
import { useProductStore } from '../store/products/products.store';

import type { ProductType } from '../types/product';

const LIMIT = 10;

type InFlightRequest = {
  promise: Promise<void>;
};

export const useCategoryProducts = (category: string) => {
  const cachedProducts = useProductStore((state) => state.categories[category]?.products);

  const [loadingProduct, setLoadingProduct] = useState(false);
  const [loadingHasMore, setLoadingHasMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const activeCategoryRef = useRef(category);
  const requestIdRef = useRef(0);

  const inFlightRef = useRef(new Map<string, InFlightRequest>());

  const fetchPage = useCallback(async (key: string, page: number, requestId: number, force = false): Promise<void> => {
    const requestKey = `${key}:${page}`;
    const store = useProductStore.getState();

    const isActive = () => requestIdRef.current === requestId && activeCategoryRef.current === key;

    // Tránh gọi trùng cùng category và cùng trang.
    const existingRequest = inFlightRef.current.get(requestKey);

    if (existingRequest) {
      await existingRequest.promise;
      return;
    }

    const cached = store.getCategory(key);

    if (!force && page > 1 && (!cached || !cached.hasMore)) {
      return;
    }

    if (isActive()) {
      if (page === 1) {
        setLoadingProduct(true);
      } else {
        setLoadingHasMore(true);
      }

      setError(null);
    }

    const promise = (async () => {
      try {
        const skip = (page - 1) * LIMIT;

        const response: ProductType[] =
          key.toLowerCase() === 'all'
            ? await productServices.getProductLists(LIMIT, skip)
            : await productServices.getProductByCategory(key, LIMIT, skip);

        useProductStore.getState().appendProducts(key, page, response, LIMIT);
      } catch {
        if (isActive()) {
          setError('Lỗi tải sản phẩm. Vui lòng thử lại.');
        }
      } finally {
        if (inFlightRef.current.get(requestKey)?.promise === promise) {
          inFlightRef.current.delete(requestKey);
        }

        if (isActive()) {
          setLoadingProduct(false);
          setLoadingHasMore(false);
        }
      }
    })();

    inFlightRef.current.set(requestKey, { promise });

    await promise;
  }, []);

  useEffect(() => {
    const requestId = ++requestIdRef.current;

    activeCategoryRef.current = category;

    setLoadingProduct(false);
    setLoadingHasMore(false);
    setError(null);

    const store = useProductStore.getState();

    if (!store.isCacheValid(category)) {
      void fetchPage(category, 1, requestId, true);
    }

    return () => {
      if (requestIdRef.current === requestId) {
        requestIdRef.current += 1;
      }
    };
  }, [category, fetchPage]);

  const loadMore = useCallback(() => {
    const key = activeCategoryRef.current;
    const store = useProductStore.getState();
    const cached = store.getCategory(key);

    if (!cached || !cached.hasMore) {
      return;
    }

    if (loadingProduct || loadingHasMore) {
      return;
    }

    void fetchPage(key, cached.page + 1, requestIdRef.current);
  }, [fetchPage, loadingProduct, loadingHasMore]);

  return {
    products: cachedProducts ?? [],
    loadingProduct,
    loadingHasMore,
    error,
    loadMore,
  };
};
