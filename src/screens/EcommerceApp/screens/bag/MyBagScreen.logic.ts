import { Alert } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '../../navigation/types';
import { CartItem, useCartStore } from '../../store/cart/cart.store';

type MyBagNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const getItemKey = (item: CartItem) => `${item.id}-${item.size}`;

const MyBagScreenLogic = () => {
  const navigation = useNavigation<MyBagNavigationProp>();

  const cartItemList = useCartStore((state) => state.items);
  const updateItem = useCartStore((state) => state.updateItem);
  const removeSelectedItem = useCartStore((state) => state.removeSelectedItem);

  const bottomSheetRef = useRef<BottomSheet>(null);

  const [activeFix, setActiveFix] = useState<boolean>(false);

  const [selectedItem, setSelectedItem] = useState<CartItem>();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedItemKeys, setSelectedItemKeys] = useState<string[]>([]);

  const selectedOrderList = cartItemList.filter((item) => selectedItemKeys.includes(getItemKey(item)));
  const totalAmoutPrice = selectedOrderList.reduce((total, item) => total + item.price * item.quantity, 0);

  const isItemSelected = (item: CartItem) => {
    const key = getItemKey(item);
    return selectedItemKeys.includes(key);
  };

  const toggleSelectedItem = (item: CartItem) => {
    const key = getItemKey(item);
    setSelectedItemKeys((prev) => {
      return prev.includes(key) ? prev.filter((itemKey) => itemKey !== key) : [...prev, key];
    });
  };

  const isSelectedAll =
    cartItemList.length > 0 && cartItemList.every((item) => selectedItemKeys.includes(getItemKey(item)));

  const toggleSelectedAll = () => {
    if (isSelectedAll) {
      setSelectedItemKeys([]);
    } else {
      setSelectedItemKeys(cartItemList.map((item) => getItemKey(item)));
    }
  };

  const toggleDeleteSelected = () => {
    if (selectedOrderList.length === 0) return;
    Alert.alert('', `Do you want delete ${selectedOrderList.length} product ?`, [
      {
        style: 'cancel',
        text: 'Cancel',
      },
      {
        style: 'destructive',
        text: 'OK',
        onPress: () => removeSelectedItem(selectedOrderList),
      },
    ]);
  };

  useEffect(() => {
    const currentsKey = new Set(cartItemList.map((item) => getItemKey(item)));
    setSelectedItemKeys((prev) => prev.filter((key) => currentsKey.has(key)));
  }, [cartItemList]);

  const handleBottomSheet = (item: CartItem) => {
    setSelectedItem(item);
    setSelectedSize(item.size);
    bottomSheetRef.current?.expand();
  };

  const handleUpdateCartItem = () => {
    if (!selectedItem || selectedSize === selectedItem.size) {
      return;
    }

    const oldKey = getItemKey(selectedItem);
    const newKey = `${selectedItem.id}-${selectedSize}`;

    updateItem(selectedItem.id, selectedItem.size, selectedSize);

    if (oldKey !== newKey) {
      setSelectedItemKeys((prev) => {
        if (!prev.includes(oldKey)) return prev;

        return [...prev.filter((key) => key !== oldKey), newKey].filter(
          (key, index, arr) => arr.indexOf(key) === index,
        );
      });
    }

    bottomSheetRef.current?.close();
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        bottomSheetRef.current?.close();
        setActiveFix(false);
      };
    }, []),
  );

  return {
    handleBottomSheet,
    handleUpdateCartItem,
    bottomSheetRef,
    cartItemList,
    selectedItem,
    selectedSize,
    setSelectedSize,
    navigation,

    selectedOrderList,
    totalAmoutPrice,
    isItemSelected,
    toggleSelectedItem,
    isSelectedAll,
    toggleSelectedAll,
    toggleDeleteSelected,

    //
    activeFix,
    setActiveFix,
  };
};

export default MyBagScreenLogic;
