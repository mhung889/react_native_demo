import { useCallback, useEffect, useMemo, useState } from 'react';

interface UseLocalPaginationProps<T> {
  data: T[];
  pageSize?: number;
}

export default function useLocalPagination<T>({ data, pageSize = 10 }: UseLocalPaginationProps<T>) {
  const [page, setPage] = useState<number>(1);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const paginatedData = useMemo(() => {
    return data.slice(0, page * pageSize);
  }, [data, page, pageSize]);

  const hasMore = paginatedData.length < data.length;

  const handleLoadMore = useCallback(() => {
    if (!hasMore) return;

    setPage((prev) => prev + 1);
  }, [hasMore]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setPage(1);
  }, []);

  useEffect(() => {
    if (refreshing) {
      const timeout = setTimeout(() => {
        setRefreshing(false);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [refreshing]);

  const resetPagination = useCallback(() => {
    setPage(1);
  }, []);

  return {
    paginatedData,
    refreshing,
    handleLoadMore,
    handleRefresh,
    resetPagination,
  };
}
