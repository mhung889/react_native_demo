import { useEffect, useState } from 'react';
import { ProductType } from '../../types/product';
import { productServices } from '../../services/productService';

export const useHomeLogic = () => {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const fetchDataProducts = async () => {
      try {
        const products = await productServices.getProductLists();

        // console.log(products);
        setProducts(products);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDataProducts();
  }, []);

  return {
    products,
  };
};
