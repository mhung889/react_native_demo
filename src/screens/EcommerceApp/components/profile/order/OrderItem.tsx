import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../../../themes/color';
import { Order } from '../../../store/order/order.store';
import { formatDateOrder, formatPrice } from '../../../utils';

type OrderItemProps = {
  item: Order;
  handleNavigateOrderDetail: (item: string) => void;
};

const OrderItem = ({ item, handleNavigateOrderDetail }: OrderItemProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.orderId}>{item.id}</Text>
        <Text style={styles.date}>{formatDateOrder(item.createdAt)}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>
          {`Quantity: `} <Text style={styles.value}>{item.items.length}</Text>
        </Text>

        <Text style={styles.label}>
          {`Total Amount: `} <Text style={styles.value}>{formatPrice(item.totalAmount)}</Text>
        </Text>
      </View>

      <View style={styles.footer}>
        <Pressable style={styles.detailsButton} onPress={() => handleNavigateOrderDetail(item.id)}>
          <Text style={styles.detailsText}>{'Details'}</Text>
        </Pressable>

        <Text
          style={[
            styles.status,
            {
              color:
                item.status === 'delivered'
                  ? colors.success
                  : item.status === 'pending'
                  ? colors.yellow
                  : colors.primary,
            },
          ]}
        >
          {item.status}
        </Text>
      </View>
    </View>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.dark,
    paddingHorizontal: 16,
    borderRadius: 10,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },

  orderId: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 15,
  },

  date: {
    color: colors.gray,
  },

  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  label: {
    color: colors.gray,
    fontWeight: '400',
  },

  value: {
    color: colors.white,
    fontSize: 16,
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 14,
    marginBottom: 20,
  },

  detailsButton: {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: colors.white,
  },

  detailsText: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    color: colors.white,
    fontSize: 15,
  },

  status: {
    fontSize: 16,
  },
});
