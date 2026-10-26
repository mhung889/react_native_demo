import { useCallback, useEffect, useState } from 'react';
import { ProductType } from '../types/product';
import { productServices } from '../services/productService';

const PAGE_SIZE = 10;

export const useSearchProduct = (searchInput: string) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingHasMore, setLoadingHasMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const keyword = searchInput.trim();

  const fetchProducts = useCallback(
    async (pageToFetch: number, isNewSearch = false) => {
      if (!keyword) return;

      if (isNewSearch) {
        setLoading(true);
      } else {
        setLoadingHasMore(true);
      }

      setError(null);

      try {
        const skip = (pageToFetch - 1) * PAGE_SIZE;
        const response = await productServices.getProductListBySearchInput(keyword, skip, PAGE_SIZE);
        setProducts((prev) => (isNewSearch ? response : [...prev, ...response]));

        setPage(pageToFetch);
        setHasMore(response.length === PAGE_SIZE);
      } catch {
        setError('Không thể tải sản phẩm. Vui lòng thử lại.');
      } finally {
        setLoading(false);
        setLoadingHasMore(false);
      }
    },
    [keyword],
  );

  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
    setError(null);

    if (!keyword) {
      setLoading(false);
      setLoadingHasMore(false);
      return;
    }

    fetchProducts(1, true);
  }, [keyword, fetchProducts]);

  const handleHasMore = useCallback(() => {
    if (loading || loadingHasMore || !hasMore || !keyword) return;

    fetchProducts(page + 1);
  }, [loading, loadingHasMore, hasMore, keyword, page, fetchProducts]);

  return {
    products,
    loading,
    loadingHasMore,
    hasMore,
    error,
    handleHasMore,
  };
};
