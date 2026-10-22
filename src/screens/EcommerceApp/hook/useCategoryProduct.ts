/* hasMore moi load */

import { useCallback, useEffect, useRef, useState } from 'react';

import { productServices } from '../services/productService';
import type { ProductType } from '../types/product';

import { getCategoryCache, setCategoryCache, type CategoryCacheData } from '../store/MMKVstore/shopCache';

const LIMIT = 10;
const CACHE_TTL = 15 * 60 * 1000; // 15 phut

// mô tả một request đang được thực hiện
type InFlightRequest = {
  promise: Promise<void>;
};

export const useCategoryProducts = (category: string) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [loadingHasMore, setLoadingHasMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const activeCategoryRef = useRef(category);
  const requestIdRef = useRef(0);

  // Giữ cache mới nhất trong bộ nhớ để tránh đọc/ghi
  // dựa trên dữ liệu state đã cũ.
  const cacheRef = useRef<Record<string, CategoryCacheData>>({});

  // Chống gọi trùng cùng một trang của cùng category.
  const inFlightRef = useRef<Map<string, InFlightRequest>>(new Map());

  const productsRef = useRef<ProductType[]>([]);

  const updateProducts = useCallback((next: ProductType[]) => {
    productsRef.current = next; // co the comment lai ko dung cung dc
    setProducts(next);
  }, []);

  const getCachedData = useCallback((key: string) => {
    const inMemory = cacheRef.current[key];

    if (inMemory) {
      return inMemory;
    }

    const persisted = getCategoryCache(key);

    if (persisted) {
      cacheRef.current[key] = persisted;
    }

    return persisted;
  }, []);

  const fetchPage = useCallback(
    async (key: string, page: number, requestId: number, force = false): Promise<void> => {
      const requestKey = `${key}:${page}`;
      // Không gửi lại request cùng category và cùng trang.
      //   const existingRequest = inFlightRef.current.get(requestKey);
      //   if (existingRequest) {
      //     return existingRequest.promise;
      //   }
      const isActive = () => requestIdRef.current === requestId && activeCategoryRef.current === key;
      const cached = getCachedData(key);
      if (!force && page > 1 && (!cached || !cached.hasMore)) {
        return;
      }
      if (page === 1 && isActive() && !cached?.products.length) {
        setLoadingProduct(true);
      } else if (page > 1 && isActive()) {
        setLoadingHasMore(true);
      }
      if (isActive()) {
        setError(null);
      }
      const promise = (async () => {
        try {
          const skip = (page - 1) * LIMIT;

          const response: ProductType[] = await productServices.getProductByCategory(key, LIMIT, skip);

          // Lấy cache tại thời điểm response về, tránh sử dụng
          // snapshot cũ nếu dữ liệu đã thay đổi trong lúc chờ.
          const latestCache = getCachedData(key);

          const previousProducts = page === 1 ? [] : latestCache?.products ?? [];

          const existingIds = new Set(previousProducts.map((item) => item.id));

          const newProducts = page === 1 ? response : response.filter((item) => !existingIds.has(item.id));

          const mergedProducts = page === 1 ? response : [...previousProducts, ...newProducts];

          const nextCache: CategoryCacheData = {
            products: mergedProducts,
            page,
            hasMore: response.length === LIMIT,
            updatedAt: Date.now(),
          };

          // Lưu cache ngay cả khi người dùng đã chuyển category.
          cacheRef.current[key] = nextCache;
          setCategoryCache(key, nextCache); //save to store

          // Chỉ cập nhật UI nếu request vẫn thuộc category đang mở.
          if (isActive()) {
            updateProducts(nextCache.products);
          }
        } catch {
          if (isActive()) {
            setError('Lỗi tải sản phẩm. Vui lòng thử lại.');
          }
        } finally {
          if (isActive()) {
            setLoadingProduct(false);
            setLoadingHasMore(false);
          }
        }
      })();

      //   inFlightRef.current.set(requestKey, { promise });

      //   console.log(inFlightRef);

      try {
        await promise;
      } finally {
        // Chỉ xóa đúng request đã đăng ký.
        // if (inFlightRef.current.get(requestKey)?.promise === promise) {
        //   inFlightRef.current.delete(requestKey);
        // }
      }
    },
    [getCachedData, updateProducts],
  );

  useEffect(() => {
    const requestId = ++requestIdRef.current;

    activeCategoryRef.current = category;

    setLoadingProduct(false);
    setLoadingHasMore(false);
    setError(null);

    const cached = getCachedData(category);

    if (cached) {
      updateProducts(cached.products);
    } else {
      updateProducts([]);
    }

    const isExpired = !cached || Date.now() - cached.updatedAt >= CACHE_TTL;

    if (isExpired) {
      void fetchPage(category, 1, requestId, true);
    }

    return () => {
      // Vô hiệu hóa quyền cập nhật UI của request cũ.
      if (requestIdRef.current === requestId) {
        requestIdRef.current += 1;
      }
    };
  }, [category, fetchPage, getCachedData, updateProducts]);

  const loadMore = useCallback(() => {
    const key = activeCategoryRef.current;
    const cached = getCachedData(key);

    if (!cached || !cached.hasMore) {
      return;
    }

    if (loadingProduct || loadingHasMore) {
      return;
    }

    void fetchPage(key, cached.page + 1, requestIdRef.current);
  }, [fetchPage, getCachedData, loadingProduct, loadingHasMore]);

  const refresh = useCallback(() => {
    const key = activeCategoryRef.current;
    const requestId = requestIdRef.current;

    void fetchPage(key, 1, requestId, true);
  }, [fetchPage]);

  return {
    products,
    loadingProduct,
    loadingHasMore,
    error,
    loadMore,
    refresh,
  };
};

/* Load All Product */

// import { useCallback, useEffect, useRef, useState } from 'react';

// import { productServices } from '../services/productService';
// import type { ProductType } from '../types/product';

// import { getCategoryCache, setCategoryCache, type CategoryCacheData } from '../store/MMKVstore/shopCache';

// const CACHE_TTL = 15 * 60 * 1000;
// const PAGE_SIZE = 10;

// export const useCategoryProducts = (category: string) => {
//   const [products, setProducts] = useState<ProductType[]>([]);
//   const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
//   const [loadingProduct, setLoadingProduct] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const activeCategoryRef = useRef(category);
//   const requestIdRef = useRef(0);

//   const cacheRef = useRef<Record<string, CategoryCacheData>>({});
//   const inFlightRef = useRef(new Map<string, Promise<ProductType[]>>());

//   const getCachedData = useCallback((key: string) => {
//     const memoryCache = cacheRef.current[key];

//     if (memoryCache) {
//       return memoryCache;
//     }

//     const persistedCache = getCategoryCache(key);

//     if (persistedCache) {
//       cacheRef.current[key] = persistedCache;
//     }

//     return persistedCache;
//   }, []);

//   const fetchAllProducts = useCallback(
//     (key: string, force = false): Promise<ProductType[]> => {
//       const cached = getCachedData(key);

//       if (!force && cached && Date.now() - cached.updatedAt < CACHE_TTL) {
//         return Promise.resolve(cached.products);
//       }

//       // Chống gọi API trùng cho cùng category.
//       const existingRequest = inFlightRef.current.get(key);

//       if (existingRequest) {
//         return existingRequest;
//       }

//       const request = productServices.getAllProductsByCategory(key);

//       inFlightRef.current.set(key, request);

//       void request
//         .finally(() => {
//           if (inFlightRef.current.get(key) === request) {
//             inFlightRef.current.delete(key);
//           }
//         })
//         .catch(() => {
//           // Lỗi đã được xử lý ở nơi gọi fetchAllProducts.
//         });

//       return request;
//     },
//     [getCachedData],
//   );

//   const loadCategory = useCallback(
//     async (key: string, force = false) => {
//       const requestId = ++requestIdRef.current;
//       activeCategoryRef.current = key;

//       setVisibleCount(PAGE_SIZE);
//       setError(null);

//       const cached = getCachedData(key);

//       if (cached) {
//         setProducts(cached.products);
//       } else {
//         setProducts([]);
//       }

//       const isExpired = !cached || Date.now() - cached.updatedAt >= CACHE_TTL;

//       if (!force && !isExpired) {
//         setLoadingProduct(false);
//         return;
//       }

//       setLoadingProduct(true);

//       try {
//         const response = await fetchAllProducts(key, force);

//         const nextCache: CategoryCacheData = {
//           products: response,
//           page: 1,
//           hasMore: false,
//           updatedAt: Date.now(),
//         };

//         cacheRef.current[key] = nextCache;
//         setCategoryCache(key, nextCache);

//         if (requestIdRef.current === requestId && activeCategoryRef.current === key) {
//           setProducts(response);
//           setError(null);
//         }
//       } catch {
//         if (requestIdRef.current === requestId && activeCategoryRef.current === key) {
//           setError('Lỗi tải sản phẩm. Vui lòng thử lại.');
//         }
//       } finally {
//         if (requestIdRef.current === requestId && activeCategoryRef.current === key) {
//           setLoadingProduct(false);
//         }
//       }
//     },
//     [fetchAllProducts, getCachedData],
//   );

//   useEffect(() => {
//     void loadCategory(category);

//     return () => {
//       requestIdRef.current += 1;
//     };
//   }, [category, loadCategory]);

//   const loadMore = useCallback(() => {
//     setVisibleCount((current) => Math.min(current + PAGE_SIZE, products.length));
//   }, [products.length]);

//   const refresh = useCallback(() => {
//     void loadCategory(activeCategoryRef.current, true);
//   }, [loadCategory]);

//   return {
//     products,
//     visibleCount,
//     loadingProduct,
//     error,
//     loadMore,
//     refresh,
//   };
// };
