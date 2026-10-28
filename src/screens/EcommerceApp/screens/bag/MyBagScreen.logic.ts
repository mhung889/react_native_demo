import BottomSheet from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useMemo, useRef, useState } from 'react';

import { CartItem, useCartStore, useCartTotalAmount } from '../../store/cart/cart.store';

const MyBagScreenLogic = () => {
  const navigation = useNavigation();

  const cartItemList = useCartStore((state) => state.items);
  const updateItem = useCartStore((state) => state.updateItem);
  const totalAmountPrice = useCartTotalAmount();

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['20%'], []);

  const [selectedItem, setSelectedItem] = useState<CartItem>();
  const [selectedSize, setSelectedSize] = useState<string>('');

  const handleBottomSheet = (item: CartItem) => {
    setSelectedItem(item);
    setSelectedSize(item.size);
    bottomSheetRef.current?.expand();
  };

  const handleUpdateCartItem = () => {
    if (!selectedItem) return;
    updateItem(selectedItem.id, selectedItem.size, selectedSize);
    bottomSheetRef.current?.close();
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      bottomSheetRef.current?.close();
    });

    return unsubscribe;
  }, [navigation]);

  return {
    handleBottomSheet,
    handleUpdateCartItem,
    snapPoints,
    bottomSheetRef,
    totalAmountPrice,
    cartItemList,
    selectedItem,
    selectedSize,
    setSelectedSize,
  };
};

export default MyBagScreenLogic;
