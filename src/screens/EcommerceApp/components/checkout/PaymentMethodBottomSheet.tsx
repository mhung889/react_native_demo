import React from 'react';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../../themes/color';
import { OrderPaymentMethod } from '../../types/payment-method';

const paymentMethods = [
  {
    id: 'cod' as OrderPaymentMethod,
    title: 'Cash on Delivery',
    description: 'Pay when you receive your order',
    icon: 'cash-outline' as const,
  },
  {
    id: 'card' as OrderPaymentMethod,
    title: 'Credit / Debit Card',
    description: 'Pay securely with Visa or Mastercard',
    icon: 'card-outline' as const,
  },
];

type PaymentMethodBottomSheetProps = {
  paymentMethod: OrderPaymentMethod;

  setPaymentMethod: React.Dispatch<React.SetStateAction<OrderPaymentMethod>>;
};

const PaymentMethodBottomSheet = ({ paymentMethod, setPaymentMethod }: PaymentMethodBottomSheetProps) => {
  return (
    <View style={styles.paymentSection}>
      <Text style={styles.sectionTitle}>{'Payment Method'}</Text>

      {paymentMethods.map((method) => {
        const isSelected = paymentMethod === method.id;

        return (
          <Pressable
            key={method.id}
            style={[styles.paymentCard, isSelected && styles.paymentCardSelected]}
            onPress={() => setPaymentMethod(method.id)}
          >
            <View style={styles.paymentIcon}>
              <Ionicons name={method.icon} size={23} color={colors.primary} />
            </View>

            <View style={styles.paymentInfo}>
              <Text style={styles.paymentTitle}>{method.title}</Text>
              <Text style={styles.paymentDescription}>{method.description}</Text>
            </View>

            <Ionicons
              name={isSelected ? 'radio-button-on' : 'radio-button-off'}
              size={22}
              color={isSelected ? colors.primary : colors.gray}
            />
          </Pressable>
        );
      })}
    </View>
  );
};

export default PaymentMethodBottomSheet;

const styles = StyleSheet.create({
  // Payment Method
  paymentSection: {
    marginTop: 10,
    marginBottom: 30,
    gap: 10,
  },

  sectionTitle: {
    color: colors.white,
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
  },

  paymentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.dark,
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: 'transparent',
    gap: 12,
  },

  paymentCardSelected: {
    borderColor: colors.primary,
  },

  paymentIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },

  paymentInfo: {
    flex: 1,
    gap: 4,
  },

  paymentTitle: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },

  paymentDescription: {
    color: colors.gray,
    fontSize: 12,
  },
});
