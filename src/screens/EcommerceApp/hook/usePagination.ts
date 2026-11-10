import { useCallback, useRef, useState } from 'react';

interface UsePaginationProps<T> {
  fetchData: (page: number) => Promise<T[]>;
  initialPage?: number;
  pageSize?: number;
}

export default function usePagination<T>({ fetchData, initialPage = 1, pageSize = 10 }: UsePaginationProps<T>) {
  const [data, setData] = useState<T[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const pageRef = useRef(initialPage);
  const loadingRef = useRef(false);

  // Fetch data
  const loadData = useCallback(
    async (page: number, isRefresh = false) => {
      if (loadingRef.current) return;

      loadingRef.current = true;

      try {
        const result = await fetchData(page);

        setData((prev) => (isRefresh || page === initialPage ? result : [...prev, ...result]));

        pageRef.current = page;

        setHasMore(result.length >= pageSize);
      } catch (error) {
        console.error('Fetch data error:', error);
      } finally {
        loadingRef.current = false;
        setRefreshing(false);
        setLoadingMore(false);
      }
    },
    [fetchData, initialPage, pageSize],
  );

  // Initial loading
  const loadInitial = useCallback(() => {
    pageRef.current = initialPage;
    setHasMore(true);
    return loadData(initialPage, true);
  }, [initialPage, loadData]);

  // Load more
  const handleLoadMore = useCallback(() => {
    if (loadingRef.current || !hasMore) return;

    setLoadingMore(true);
    loadData(pageRef.current + 1);
  }, [hasMore, loadData]);

  // Refresh
  const handleRefresh = useCallback(() => {
    if (loadingRef.current) return;

    setRefreshing(true);
    setHasMore(true);
    pageRef.current = initialPage;

    loadData(initialPage, true);
  }, [initialPage, loadData]);

  return {
    data,
    refreshing,
    loadingMore,
    hasMore,
    loadInitial,
    handleLoadMore,
    handleRefresh,
  };
}
