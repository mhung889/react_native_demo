import { ActivityIndicator, FlatList, StyleSheet, Text } from 'react-native';
import React from 'react';
import { ProductType } from '../../../types/product';
import ProductCardItem from '../../common/ProductCard/ProductCardItem';
import { colors } from '../../../themes/color';
import { SafeAreaView } from 'react-native-safe-area-context';

type ProductGridListType = {
  filterData: () => ProductType[];
  loadingProduct: boolean;
  loadingHasMore: boolean;
  error: string | null;
  loadMore: () => void;
};

const ProductGridList = ({ filterData, loadingProduct, loadingHasMore, error, loadMore }: ProductGridListType) => {
  const products = filterData();

  const renderProductByCategory = ({ item }: { item: ProductType }) => (
    <ProductCardItem item={item} widthContainer={176} heightImage={200} />
  );

  return (
    <FlatList
      key="grid"
      data={products}
      keyExtractor={(item) => String(item.id)}
      renderItem={renderProductByCategory}
      numColumns={2}
      columnWrapperStyle={styles.columnWrapStyle}
      onEndReached={loadMore}
      onEndReachedThreshold={0.3}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      ListFooterComponent={
        loadingHasMore ? <ActivityIndicator size="small" color={colors.primary} style={styles.footer} /> : undefined
      }
      ListEmptyComponent={
        loadingProduct ? (
          <SafeAreaView style={styles.center}>
            <ActivityIndicator size="large" color={colors.primary} />
          </SafeAreaView>
        ) : error ? (
          <SafeAreaView style={styles.center}>
            <Text style={styles.error}>{error}</Text>
          </SafeAreaView>
        ) : (
          <SafeAreaView style={styles.center}>
            <Text>{'Không có sản phẩm.'}</Text>
          </SafeAreaView>
        )
      }
    />
  );
};

export default ProductGridList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    marginHorizontal: 16,
    gap: 16,
    paddingBottom: 30,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: 200,
  },
  error: {
    margin: 16,
    fontSize: 14,
    color: 'red',
    textAlign: 'center',
  },
  footer: {
    padding: 16,
  },
  columnWrapStyle: {
    justifyContent: 'space-between',
  },
});
