import { Alert } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { useCallback, useRef, useState } from 'react';

import { SCREENS } from '../../navigation/SCREENS';
import { CheckoutProps } from './CheckoutScreen';
import { OrderPaymentMethod } from '../../types/payment-method';
import { useAddressStore } from '../../store/profile/address.store';
import { usePaymentCardStore } from '../../store/profile/paymentCard.store';
import { useOrderStore } from '../../store/order/order.store';
import { useCartStore } from '../../store/cart/cart.store';

export default function CheckoutLogic({ route, navigation }: CheckoutProps) {
  const { itemList } = route.params;

  const [paymentMethod, setPaymentMethod] = useState<OrderPaymentMethod>('cod');
  const bottomSheetRef = useRef<BottomSheet>(null);

  const defaultAddress = useAddressStore((state) => state.addressList.find((item) => item.isDefault));
  const totalAmount = itemList.reduce((total, item) => total + item.quantity * item.price, 0);
  const defaultPaymentCard = usePaymentCardStore((state) => state.paymentList.find((item) => item.isDefault));
  const clearCart = useCartStore((state) => state.clearCart);

  const addOrder = useOrderStore((state) => state.addOrder);

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleNavigateAddress = useCallback(() => {
    navigation.push(SCREENS.MAIN_TAB, {
      screen: SCREENS.PROFILE_TAB,
      params: {
        screen: SCREENS.PROFILE_ADDRESS,
        params: {
          fromCheckout: true,
        },
      },
    });
  }, [navigation]);

  const handleNavigatePaymentMethod = useCallback(() => {
    navigation.push(SCREENS.MAIN_TAB, {
      screen: SCREENS.PROFILE_TAB,
      params: {
        screen: SCREENS.PROFILE_PAYMENT_METHOD,
        params: {
          fromCheckout: true,
        },
      },
    });
  }, [navigation]);

  const handleOrderNow = () => {
    if (!defaultAddress) {
      Alert.alert(
        'No delivery address',
        'You have not added a default address. Please add an address before placing your order.',
        [
          { style: 'default', text: 'Cancel' },
          { style: 'destructive', text: 'OK', onPress: handleNavigateAddress },
        ],
      );
      return;
    }
    if (paymentMethod === 'card') {
      if (!defaultPaymentCard) {
        Alert.alert('Missing Payment Card', 'Please add a default payment card to continue with your order.', [
          { style: 'cancel', text: 'Cancel' },
          { style: 'destructive', text: 'OK', onPress: handleNavigatePaymentMethod },
        ]);
        return;
      }
    }
    const resultOrderId = addOrder({
      items: itemList,
      address: defaultAddress,
      paymentMethod,
      paymentCard: defaultPaymentCard,
      totalAmount,
    });

    if (resultOrderId) {
      clearCart();
      navigation.navigate(SCREENS.ORDER_SUCCESS);
    }
  };

  const handleOpenPaymentMethod = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  return {
    itemList,
    paymentMethod,
    setPaymentMethod,
    defaultAddress,
    totalAmount,
    handleBack,
    handleOrderNow,
    handleOpenPaymentMethod,
    handleNavigateAddress,
    bottomSheetRef,
    defaultPaymentCard,
    handleNavigatePaymentMethod,
  };
}
