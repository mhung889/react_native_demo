import { useCallback, useEffect, useMemo, useState } from 'react';

import { MyOrderProps } from './MyOrdersScreen';
import { SCREENS } from '../../../navigation/SCREENS';
import useLocalPagination from '../../../hook/useLocalPagination';
import { Order, useOrderStore } from '../../../store/order/order.store';

export default function MyOrderLogic({ navigation }: MyOrderProps) {
  const [activeStatus, setActiveStatus] = useState<string>('all');
  const orderLists = useOrderStore((state) => state.orders);

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleNavigateOrderDetail = useCallback(
    (id: string) => {
      navigation.push(SCREENS.PROFILE_ORDER_DETAIL, {
        orderId: id,
      });
    },
    [navigation],
  );

  const filterOrderListByStatus = useMemo(() => {
    if (activeStatus === 'all') return orderLists;
    return orderLists.filter((order) => order.status === activeStatus);
  }, [activeStatus, orderLists]);

  const { paginatedData, refreshing, handleLoadMore, handleRefresh, resetPagination } = useLocalPagination<Order>({
    data: filterOrderListByStatus,
    pageSize: 3,
  });

  useEffect(() => {
    resetPagination();
  }, [activeStatus, resetPagination]);

  return {
    handleBack,
    handleNavigateOrderDetail,
    activeStatus,
    setActiveStatus,
    //
    paginatedData,
    refreshing,
    handleLoadMore,
    handleRefresh,
  };
}
