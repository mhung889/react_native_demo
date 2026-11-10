import React, { useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Alert, Dimensions, FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../../../themes/color';
import { SCREENS } from '../../../navigation/SCREENS';
import Header from '../../../components/common/Header';
import { CartItem } from '../../../store/cart/cart.store';
import { formatDateOrder, formatPrice } from '../../../utils';
import { useOrderStore } from '../../../store/order/order.store';
import { ProfileStackParamList } from '../../../navigation/types';

type OrderDetailScreenProps = NativeStackScreenProps<ProfileStackParamList, typeof SCREENS.PROFILE_ORDER_DETAIL>;

const OrderDetailScreen = ({ route, navigation }: OrderDetailScreenProps) => {
  const { orderId } = route.params;
  const orderDetail = useOrderStore((state) => state.orders.find((order) => order.id === orderId));
  const cancelOrder = useOrderStore((state) => state.cancelOrder);

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  if (!orderDetail) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <Header title="Order Details" onBack={handleBack} isShowleftElement />

        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>{'Order not found'}</Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleCancelOrder = () => {
    Alert.alert('Cancel Order', 'Do you want to cancel this order?', [
      { text: 'No', style: 'cancel' },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => cancelOrder(orderDetail.id),
      },
    ]);
  };

  const renderItem = ({ item }: { item: CartItem }) => {
    return (
      <>
        <View style={styles.itemContainer}>
          <Image source={{ uri: item.thumbnail }} style={styles.itemImage} />

          <View style={styles.itemContent}>
            <Text style={styles.itemTitle} numberOfLines={1}>
              {item.title}
            </Text>

            <Text style={styles.itemCategory}>{item.category ?? item.brand}</Text>

            <Text style={styles.itemSize}>
              Size: <Text style={styles.itemValue}>{item.size}</Text>
            </Text>

            <View style={styles.itemFooter}>
              <Text style={styles.itemQuantity} numberOfLines={1}>
                Quantity: <Text style={styles.itemValue}>{item.quantity}</Text>
              </Text>

              <Text style={styles.itemPrice} numberOfLines={1} adjustsFontSizeToFit>
                {formatPrice(item.price)}
              </Text>
            </View>
          </View>
        </View>
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="Order Details" onBack={handleBack} isShowleftElement />

      <FlatList
        data={orderDetail.items}
        keyExtractor={(item) => `${item.id} - ${item.size}`}
        renderItem={renderItem}
        ListHeaderComponent={
          <>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
              <Text style={{ color: colors.white, fontWeight: '700', fontSize: 18 }}>{orderDetail.id}</Text>
              <Text style={{ color: colors.gray, fontSize: 16 }}>{formatDateOrder(orderDetail.createdAt)}</Text>
            </View>

            <View
              style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 5 }}
            >
              <Text style={{ color: colors.gray, fontSize: 15 }}>{'Tracking number'}</Text>
              <Text
                style={[
                  { alignSelf: 'flex-end', fontSize: 15, fontWeight: '500' },
                  {
                    color:
                      orderDetail.status === 'delivered'
                        ? colors.success
                        : orderDetail.status === 'cancelled'
                        ? colors.primary
                        : colors.yellow,
                  },
                ]}
              >
                {orderDetail.status}
              </Text>
            </View>

            <Text style={{ fontSize: 16, fontWeight: '500', color: colors.white }}>
              {`${orderDetail.items.length} items`}
            </Text>
          </>
        }
        ListFooterComponent={
          <View style={styles.orderInfoContainer}>
            <Text style={styles.orderInfoTitle}>{'Order Information'}</Text>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>{'Shipping Address:'}</Text>
              <Text style={styles.infoValue}>
                {`${orderDetail.address.address.street}, ${orderDetail.address.address.ward}, ${orderDetail.address.address.province}`}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>{'Payment method:'}</Text>
              <Text style={styles.infoValue}>{'Cash on Delivery'}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>{'Total Amount:'}</Text>
              <Text style={styles.infoValue}>{formatPrice(orderDetail.totalAmount)}</Text>
            </View>
          </View>
        }
        contentContainerStyle={styles.contentContainer}
      />

      {orderDetail.status === 'delivered' && (
        <View style={styles.actionContainer}>
          <Pressable style={styles.outlineButton}>
            <Text style={styles.buttonText}>{'Reorder'}</Text>
          </Pressable>

          <Pressable style={styles.primaryButton}>
            <Text style={styles.buttonText}>{'Leave feedback'}</Text>
          </Pressable>
        </View>
      )}

      {orderDetail.status === 'pending' && (
        <View style={styles.cancelContainer}>
          <Pressable style={styles.cancelButton} onPress={handleCancelOrder}>
            <Text style={styles.buttonText}>{'Cancel Order'}</Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
};

export default OrderDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    gap: 20,
    marginHorizontal: 16,
  },

  itemContainer: {
    height: 105,
    flexDirection: 'row',
    backgroundColor: colors.dark,
    borderRadius: 10,
    overflow: 'hidden',
  },

  itemImage: {
    height: 105,
    width: 105,
    backgroundColor: colors.white,
  },

  itemContent: {
    flex: 1,
    minWidth: 0,
    paddingHorizontal: 10,
  },

  itemTitle: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '500',
    marginTop: 11,
    marginBottom: 4,
  },

  itemCategory: {
    color: colors.gray,
    fontSize: 12,
    paddingBottom: 3,
  },

  itemSize: {
    color: colors.gray,
    fontSize: 12,
  },

  itemValue: {
    color: colors.white,
    fontSize: 13,
  },

  itemFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 3,
    gap: 8,
  },

  itemQuantity: {
    color: colors.gray,
    fontSize: 12,
    flex: 1,
    minWidth: 0,
  },

  itemPrice: {
    color: colors.white,
    fontWeight: '500',
    fontSize: 15,
    flexShrink: 1,
    maxWidth: '55%',
    textAlign: 'right',
  },

  orderInfoContainer: {
    gap: 24,
  },

  orderInfoTitle: {
    color: colors.white,
    fontSize: 17,
    fontWeight: '500',
    lineHeight: 20,
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  infoLabel: {
    color: colors.gray,
    lineHeight: 20,
    width: (Dimensions.get('window').width * 1) / 3,
  },

  infoValue: {
    color: colors.white,
    fontWeight: '500',
    lineHeight: 20,
    flex: 1,
  },

  actionContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    gap: 10,
    marginBottom: 6,
  },

  cancelContainer: {
    marginHorizontal: 16,
    marginBottom: 6,
  },

  outlineButton: {
    flex: 1,
    borderRadius: 20,
    borderColor: colors.white,
    borderWidth: 1,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  primaryButton: {
    flex: 1,
    borderRadius: 16,
    backgroundColor: colors.primary,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  cancelButton: {
    borderRadius: 16,
    backgroundColor: colors.primary,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '500',
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyText: {
    color: colors.gray,
    fontSize: 16,
  },
});
