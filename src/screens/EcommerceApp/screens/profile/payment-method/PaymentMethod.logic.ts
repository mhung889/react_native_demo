import { useCallback, useRef } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { useShallow } from 'zustand/react/shallow';

import { PaymentMethodProps } from './PaymentMethodScreen';
import { usePaymentCardStore } from '../../../store/profile/paymentCard.store';

export default function PaymentMethodLogic({ route, navigation }: PaymentMethodProps) {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const { paymentMethodList, addPaymentMethod, deletePayment, handleDefaultPayment } = usePaymentCardStore(
    useShallow((state) => ({
      paymentMethodList: state.paymentList,
      addPaymentMethod: state.addPaymentMethod,
      deletePayment: state.deletePaymentMethod,
      handleDefaultPayment: state.setDefaultPayment,
    })),
  );

  const handleOpenAddBottomSheetPayment = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  const handleBack = () => {
    if (route.params?.fromCheckout) {
      navigation.getParent()?.getParent()?.goBack();
      return;
    }
    navigation.goBack();
  };

  return {
    handleBack,
    handleOpenAddBottomSheetPayment,
    bottomSheetRef,
    paymentMethodList,
    addPaymentMethod,
    deletePayment,
    handleDefaultPayment,
  };
}
