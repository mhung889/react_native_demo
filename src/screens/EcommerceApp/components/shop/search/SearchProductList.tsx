import React, { useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';

import Header from '../../common/Header';
import { colors } from '../../../themes/color';
import { ProductType } from '../../../types/product';
import { SCREENS } from '../../../navigation/SCREENS';
import { ShopStackParamList } from '../../../navigation/types';
import { useSearchProduct } from '../../../hook/useSearchProduct';
import ProductCardItemSingle from '../../common/ProductCard/ProductCardItemSingle';

type SearchProductListProps = NativeStackScreenProps<ShopStackParamList, typeof SCREENS.SEARCH_PRODUCT_LIST>;
// type SearchProductListProps = NativeStackScreenProps<ShopStackParamList, 'SearchProductList'>;

const SearchProductList = ({ route, navigation }: SearchProductListProps) => {
  const { keyword } = route.params;

  const { products, loading, error, handleHasMore, loadingHasMore } = useSearchProduct(keyword);

  const renderProductItem = useCallback(({ item }: { item: ProductType }) => {
    return <ProductCardItemSingle item={item} />;
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header onBack={() => navigation.goBack()} isShowleftElement heightContainer={40} />

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProductItem}
        onEndReachedThreshold={0.3}
        onEndReached={handleHasMore}
        ListEmptyComponent={
          loading ? (
            <View style={styles.emptyContainer}>
              <ActivityIndicator size="large" color={colors.primary} />
            </View>
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.errorText}>{error || 'Không tìm thấy sản phẩm'}</Text>
            </View>
          )
        }
        ListFooterComponent={
          loadingHasMore ? (
            <ActivityIndicator size="small" color={colors.primary} style={styles.footerLoader} />
          ) : undefined
        }
        contentContainerStyle={[styles.productList, products.length === 0 && styles.emptyList]}
      />
    </SafeAreaView>
  );
};

export default SearchProductList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  productList: {
    marginHorizontal: 16,
    gap: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerLoader: {
    marginVertical: 16,
  },
  emptyList: {
    flexGrow: 1,
  },
  errorText: {
    color: colors.white,
  },
});
