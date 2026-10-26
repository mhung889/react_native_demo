import { useCallback, useEffect, useState } from 'react';

import { ProductType } from '../../types/product';
import { productServices } from '../../services/productService';

const PAGE_SIZE = 10;

export const useHomeLogic = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchDataProducts = async (page: number) => {
    try {
      const skip = (page - 1) * PAGE_SIZE;
      const response = await productServices.getProductLists(PAGE_SIZE, skip);
      setProducts(response);
    } catch (error) {
      console.error(error);
    }
  };

  const hanleRefresh = useCallback(async () => {
    setLoading(true);
    setRefreshing(true);

    try {
      await fetchDataProducts(1);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchDataProducts(1);
  }, []);

  return {
    products,
    loading,
    hanleRefresh,
    refreshing,
  };
};
