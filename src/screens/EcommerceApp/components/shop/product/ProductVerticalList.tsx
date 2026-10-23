import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';

import { colors } from '../../../themes/color';
import { ProductType } from '../../../types/product';
import ProductCardItemSingle from '../../common/ProductCard/ProductCardItemSingle';

type ProductGridListType = {
  filterData: () => ProductType[];
  loadingProduct: boolean;
  loadingHasMore: boolean;
  error: string | null;
  loadMore: () => void;
};

const ProductVerticalList = ({ filterData, loadingProduct, loadingHasMore, error, loadMore }: ProductGridListType) => {
  const products = filterData();

  const renderItem = ({ item }: { item: ProductType }) => <ProductCardItemSingle item={item} />;

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      {loadingProduct ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : (
        <>
          <Text style={styles.emptyTitle}>{error ? 'Không thể tải sản phẩm' : 'Chưa có sản phẩm'}</Text>
          <Text style={styles.emptyDescription}>{error ?? 'Hãy thử chọn danh mục khác nhé.'}</Text>
        </>
      )}
    </View>
  );

  return (
    <FlatList
      key="list"
      data={products}
      keyExtractor={(item) => String(item.id)}
      renderItem={renderItem}
      onEndReached={loadMore}
      onEndReachedThreshold={0.3}
      showsVerticalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={[styles.contentContainer, products.length === 0 && styles.emptyContent]}
      ListEmptyComponent={renderEmpty}
      ListFooterComponent={
        loadingHasMore ? <ActivityIndicator size="small" color={colors.primary} style={styles.footer} /> : undefined
      }
    />
  );
};

export default ProductVerticalList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 32,
    gap: 14,
    flexGrow: 1,
  },
  emptyContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  emptyIcon: {
    fontSize: 48,
    color: colors.gray,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.ordinaryText,
    textAlign: 'center',
  },
  emptyDescription: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 21,
    color: colors.gray,
    textAlign: 'center',
  },
  footer: {
    paddingVertical: 20,
  },
});
