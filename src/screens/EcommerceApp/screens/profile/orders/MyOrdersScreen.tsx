import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FlatList, Pressable, RefreshControl, StyleSheet, Text, View } from 'react-native';

import MyOrderLogic from './MyOrder.logic';
import { colors } from '../../../themes/color';
import { SCREENS } from '../../../navigation/SCREENS';
import Header from '../../../components/common/Header';
import { Order } from '../../../store/order/order.store';
import { commonStyle } from '../../../themes/commonStyle';
import { ProfileStackParamList } from '../../../navigation/types';
import OrderItem from '../../../components/profile/order/OrderItem';

export type MyOrderProps = NativeStackScreenProps<ProfileStackParamList, typeof SCREENS.PROFILE_MY_ORDERS>;

const DATA_STATUS_ORDER = [
  { value: 'all', label: 'ALL' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'pending', label: 'Pending' },
  { value: 'cancelled', label: 'Cancelled' },
];

const MyOrdersScreen = ({ route, navigation }: MyOrderProps) => {
  const {
    handleBack,
    handleNavigateOrderDetail,
    activeStatus,
    setActiveStatus,
    paginatedData,
    refreshing,
    handleLoadMore,
    handleRefresh,
  } = MyOrderLogic({ route, navigation });

  const renderOrderItem = ({ item }: { item: Order }) => {
    return <OrderItem item={item} handleNavigateOrderDetail={handleNavigateOrderDetail} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header onBack={handleBack} isShowleftElement heightContainer={33} />
      <Text style={styles.header}>{'My Orders'}</Text>

      <View style={styles.statusContainer}>
        {DATA_STATUS_ORDER.map((item) => {
          return (
            <Pressable
              key={item.value}
              onPress={() => setActiveStatus(item.value)}
              style={[
                styles.statusItem,
                { backgroundColor: item.value === activeStatus ? colors.white : colors.background },
              ]}
            >
              <Text style={[styles.statusLabel, { color: item.value === activeStatus ? colors.dark : colors.white }]}>
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {paginatedData.length > 0 ? (
        <FlatList
          data={paginatedData}
          keyExtractor={(item) => item.id}
          renderItem={renderOrderItem}
          onEndReachedThreshold={0.2}
          onEndReached={handleLoadMore}
          onRefresh={handleRefresh}
          refreshing={refreshing}
          contentContainerStyle={styles.contentContainer}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor={colors.primary} //IOS
              colors={[colors.primary]} //Android
              progressBackgroundColor={colors.dark} //Android
              title="Refreshing..."
              titleColor={colors.white}
            />
          }
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>{'No order available'}</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default MyOrdersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  header: {
    color: colors.white,
    fontFamily: commonStyle.fontFamily,
    fontWeight: 'bold',
    fontSize: 34,
    marginHorizontal: 16,
    marginTop: 18,
  },

  contentContainer: {
    gap: 20,
    marginHorizontal: 16,
  },

  // status
  statusContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    justifyContent: 'space-around',
    marginVertical: 20,
  },

  statusItem: {
    borderRadius: 16,
  },

  statusLabel: {
    fontSize: 16,
    paddingHorizontal: 11,
    paddingVertical: 7,
  },

  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  emptyText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '500',
  },
});
