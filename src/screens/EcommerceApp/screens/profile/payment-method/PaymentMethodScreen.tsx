import React, { useCallback, useEffect } from 'react';
import { Lucide } from '@react-native-vector-icons/lucide';
import {
  Alert,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetView } from '@gorhom/bottom-sheet';

import { colors } from '../../../themes/color';
import { transformCardNumber } from '../../../utils';
import { SCREENS } from '../../../navigation/SCREENS';
import Header from '../../../components/common/Header';
import PaymentMethodLogic from './PaymentMethod.logic';
import { commonStyle } from '../../../themes/commonStyle';
import { ChipIcon, VisaIcon } from '../../../assets/icons';
import { ProfileStackParamList } from '../../../navigation/types';
import { PaymentCardItem } from '../../../store/profile/paymentCard.store';
import BottomSheetAddPayment, { FormValues } from '../../../components/profile/payment-method/BottomSheetAddPayment';
import { SafeAreaView } from 'react-native-safe-area-context';

export type PaymentMethodProps = NativeStackScreenProps<ProfileStackParamList, typeof SCREENS.PROFILE_PAYMENT_METHOD>;

const PaymentMethodScreen = ({ route, navigation }: PaymentMethodProps) => {
  const {
    handleBack,
    bottomSheetRef,
    handleOpenAddBottomSheetPayment,
    paymentMethodList,
    addPaymentMethod,
    deletePayment,
    handleDefaultPayment,
  } = PaymentMethodLogic({ route, navigation });

  const handleDeleteCardPayment = useCallback(
    (id: number) => {
      Alert.alert('Delete', 'Do you want delete card ?', [
        { style: 'cancel', text: 'Cancel' },
        { style: 'destructive', text: 'OK', onPress: () => deletePayment(id) },
      ]);
    },
    [deletePayment],
  );

  const renderPaymentItem = useCallback(
    ({ item }: { item: PaymentCardItem }) => {
      const handleDelete = () => handleDeleteCardPayment(item.id);
      return (
        <>
          <View style={styles.card}>
            <VisaIcon width={50} height={16} style={styles.visaLogo} />
            <Text style={styles.cardNumber}>{transformCardNumber(item.cardNumber)}</Text>
            <ChipIcon width={34} height={26} />
            <View style={styles.cardInfo}>
              <View style={styles.cardInfoItem}>
                <Text style={styles.cardLabel}>{'Card Holder Name'}</Text>
                <Text style={styles.cardValue}>{item.nameCard}</Text>
              </View>
              <View style={styles.cardInfoItem}>
                <Text style={styles.cardLabel}>{'Expire Date'}</Text>
                <Text style={styles.cardValue}>{item.expireDate}</Text>
              </View>
            </View>
          </View>

          <View style={styles.cardActions}>
            <View style={styles.defaultContainer}>
              <Pressable style={styles.setDefault} onPress={() => handleDefaultPayment(item.id)}>
                {item.isDefault && <Lucide name="check" size={20} color={colors.dark} />}
              </Pressable>
              <Text style={styles.defaultText}>{'Use as default payment method'}</Text>
            </View>
            <Pressable onPress={handleDelete}>
              <Lucide name="trash-2" size={17} color="#FF5252" />
            </Pressable>
          </View>
        </>
      );
    },
    [handleDefaultPayment, handleDeleteCardPayment],
  );

  const handleAddPaymentMethod = (data: FormValues, isDefault: boolean) => {
    addPaymentMethod({
      id: Date.now(),
      nameCard: data.nameCard,
      cardNumber: data.cardNumber,
      expireDate: data.expireDate,
      cvv: data.cvv,
      isDefault,
    });
  };
  bottomSheetRef.current?.close();

  const renderBackdropBottomSheet = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} opacity={0.45} />
    ),
    [],
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      bottomSheetRef.current?.close();
    });

    return unsubscribe;
  }, [bottomSheetRef, navigation]);

  return (
    <GestureHandlerRootView style={styles.root}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={commonStyle.flex1}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <SafeAreaView style={styles.container}>
            <Header onBack={handleBack} isShowleftElement title="Payment methods" />

            <View style={styles.content}>
              <Text style={styles.sectionTitle}>{'Your payment cards'}</Text>

              {paymentMethodList.length > 0 ? (
                <FlatList
                  data={paymentMethodList}
                  keyExtractor={(item) => `${item.id}`}
                  renderItem={renderPaymentItem}
                  contentContainerStyle={styles.listContent}
                  showsVerticalScrollIndicator={false}
                />
              ) : (
                <View style={styles.emptyContainer}>
                  <Lucide name="credit-card" size={42} color={colors.gray} />
                  <Text style={styles.emptyText}>{'No payment cards available'}</Text>
                </View>
              )}
            </View>

            <Pressable style={styles.addButton} onPress={handleOpenAddBottomSheetPayment}>
              <Lucide name="plus" size={23} color={colors.background} />
            </Pressable>

            <BottomSheet
              ref={bottomSheetRef}
              index={-1}
              enablePanDownToClose
              backdropComponent={renderBackdropBottomSheet}
              backgroundStyle={styles.bottomSheetBackground}
              handleIndicatorStyle={styles.handleIndicator}
            >
              <BottomSheetView>
                <BottomSheetAddPayment handleAddPaymentMethod={handleAddPaymentMethod} />
              </BottomSheetView>
            </BottomSheet>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
};

export default PaymentMethodScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },

  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    flex: 1,
    paddingTop: 24,
  },

  sectionTitle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: 16,
    marginBottom: 20,
  },

  listContent: {
    paddingBottom: 24,
  },

  card: {
    height: 216,
    marginHorizontal: 16,
    marginBottom: 5,
    paddingHorizontal: 28,
    paddingVertical: 20,
    justifyContent: 'space-between',
    backgroundColor: colors.primary,
    borderRadius: 18,

    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 5,
  },

  visaLogo: {
    alignSelf: 'flex-end',
  },

  cardNumber: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 5,
  },

  cardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  cardInfoItem: {
    gap: 5,
  },

  cardLabel: {
    color: colors.white,
    fontSize: 12,
  },

  cardValue: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },

  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },

  emptyText: {
    color: colors.gray,
    fontSize: 14,
  },

  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    backgroundColor: colors.white,

    elevation: 5,
  },

  bottomSheetBackground: {
    backgroundColor: colors.background,
  },

  handleIndicator: {
    backgroundColor: colors.white,
    width: 40,
  },

  defaultContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  setDefault: {
    width: 20,
    height: 20,
    backgroundColor: colors.white,
    borderRadius: 5,
  },

  defaultText: {
    color: colors.white,
    fontSize: 14,
    height: 21,
    fontWeight: '500',
  },

  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginTop: 3,
    marginBottom: 18,
  },

  deleteText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '600',
  },
});
