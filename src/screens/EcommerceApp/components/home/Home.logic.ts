import { useCallback, useEffect, useState } from 'react';

import { ProductType } from '../../types/product';
import { productServices } from '../../services/productService';

export const useHomeLogic = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchDataProducts = async () => {
    try {
      const products = await productServices.getProductLists();

      // console.log(products);
      setProducts(products);
    } catch (error) {
      console.error(error);
    }
  };

  const hanleRefresh = useCallback(async () => {
    setLoading(true);
    setRefreshing(true);

    try {
      await fetchDataProducts();
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchDataProducts();
  }, []);

  return {
    products,
    loading,
    hanleRefresh,
    refreshing,
  };
};
