import { StyleSheet, View } from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import { Ionicons } from '@react-native-vector-icons/ionicons';

import { colors } from '../../themes/color';

import Header from '../../components/common/Header';
import FilterShop from '../../components/shop/FilterShop';
import CategoryList from '../../components/shop/category/CategoryList';

import { productServices } from '../../services/productService';
import { useCategoryProducts } from '../../hook/useCategoryProduct';
import ProductGridList from '../../components/shop/product/ProductGridList';
import ProductVerticalList from '../../components/shop/product/ProductVerticalList';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ShopStackParamList } from '../../navigation/types';

export type SortType = 'asc' | 'desc';

type ShopScreenNavigationProp = NativeStackNavigationProp<ShopStackParamList>;

const ShopScreen = () => {
  const navigation = useNavigation<ShopScreenNavigationProp>();

  const [selectedCategory, setSelectedCategory] = useState('all');
  const { products, loadingProduct, loadingHasMore, error, loadMore } = useCategoryProducts(selectedCategory);

  const [categories, setCategories] = useState<string[]>([]);
  const [sortPrice, setSortPrice] = useState<SortType>('asc');

  const [activeRenderGrid, setActiveRenderGrid] = useState(false);

  const filterData = useCallback(
    () => [...products].sort((a, b) => (sortPrice === 'asc' ? a.price - b.price : b.price - a.price)),
    [sortPrice, products],
  );

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await productServices.getCategoryList();
        setCategories(response);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCategories();
  }, []);

  const renderHeader = () => (
    <View style={{ backgroundColor: colors.background }}>
      <Header
        rightElement={<Ionicons name="search-outline" size={22} color={colors.white} />}
        title={selectedCategory}
        isCategory
        isSearch
        navigation={navigation}
      />
      <View style={styles.contentCategory}>
        <CategoryList
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </View>
    </View>
  );

  return (
    <>
      {renderHeader()}

      <FilterShop
        setSortPrice={setSortPrice}
        sortPrice={sortPrice}
        setActiveRenderGrid={setActiveRenderGrid}
        activeRenderGrid={activeRenderGrid}
      />

      {activeRenderGrid ? (
        <ProductGridList
          filterData={filterData}
          loadingProduct={loadingProduct}
          loadingHasMore={loadingHasMore}
          error={error}
          loadMore={loadMore}
        />
      ) : (
        <ProductVerticalList
          filterData={filterData}
          loadingProduct={loadingProduct}
          loadingHasMore={loadingHasMore}
          error={error}
          loadMore={loadMore}
        />
      )}
    </>
  );
};

export default ShopScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  columnWrapStyle: {
    justifyContent: 'space-between',
  },

  contentContainer: {
    marginHorizontal: 16,
    gap: 16,
    paddingBottom: 30,
  },

  contentCategory: {
    marginLeft: 16,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: 200,
  },
  message: {
    marginTop: 12,
    padding: 16,
    fontSize: 14,
    color: colors.gray,
    textAlign: 'center',
  },
  error: {
    margin: 16,
    fontSize: 14,
    color: 'red',
    textAlign: 'center',
  },
  categoriesContainer: {
    // paddingVertical: 30,
  },
  footer: {
    padding: 16,
  },
});
