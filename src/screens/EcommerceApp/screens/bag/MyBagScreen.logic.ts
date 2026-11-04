import BottomSheet from '@gorhom/bottom-sheet';
import { useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '../../navigation/types';
import { CartItem, useCartStore, useCartTotalAmount } from '../../store/cart/cart.store';

type MyBagNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const MyBagScreenLogic = () => {
  const navigation = useNavigation<MyBagNavigationProp>();

  const cartItemList = useCartStore((state) => state.items);
  const updateItem = useCartStore((state) => state.updateItem);
  const totalAmountPrice = useCartTotalAmount();

  const bottomSheetRef = useRef<BottomSheet>(null);

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
    bottomSheetRef,
    totalAmountPrice,
    cartItemList,
    selectedItem,
    selectedSize,
    setSelectedSize,
    navigation,
  };
};

export default MyBagScreenLogic;
