import { Alert } from 'react-native';
import { useShallow } from 'zustand/react/shallow';
import { useCallback, useEffect, useState } from 'react';

import { ProductType } from '../../types/product';
import { CartItem, useCartStore } from '../../store/cart/cart.store';
import { productServices } from '../../services/productService';
import { useFavoriteStore } from '../../store/favorite/favorite.store';

const CardItemLogic = (item: CartItem) => {
  const [active, setActive] = useState(false);
  const [productActive, setProductActive] = useState<ProductType | undefined>(undefined);

  const { increment, decrement, removeItem } = useCartStore(
    useShallow((state) => ({
      increment: state.incrementQuantity,
      decrement: state.decrementQuantity,
      removeItem: state.removeItem,
    })),
  );

  const addFavoriteProduct = useFavoriteStore((state) => state.addFavoriteProduct);

  const totalPrice = item.quantity * item.price;

  const handleIncrementQuantity = () => {
    increment(item.id, item.size);
  };

  const handleDecrementQuantity = () => {
    decrement(item.id, item.size);
  };

  const handleRemoveItemToList = () => {
    removeItem(item.id, item.size);
  };

  const handleAddFavorite = () => {
    if (!productActive) return;
    const result = addFavoriteProduct(productActive);

    switch (result) {
      case 'exists':
        Alert.alert('Already exists', 'This product is already in your favorites.');
        break;
      case 'success':
        Alert.alert('Success', 'Product added to your favorites!');
        break;
      case 'unauthenticated':
        Alert.alert('Notice', 'Please log in to add favorites.');
        break;
    }
    setActive(!active);
  };

  const getProductById = useCallback(async () => {
    try {
      const response = await productServices.getSingleProduct(item.id);
      setProductActive(response);
    } catch (err) {
      console.error(err);
    }
  }, [item.id]);

  useEffect(() => {
    getProductById();
  }, [getProductById]);

  return {
    active,
    setActive,
    productActive,
    setProductActive,
    totalPrice,
    handleIncrementQuantity,
    handleDecrementQuantity,
    handleRemoveItemToList,
    handleAddFavorite,
  };
};

export default CardItemLogic;
