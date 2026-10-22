/* hasMore moi load */
import { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';

import { colors } from '../../themes/color';
import { SCREENS } from '../../navigation/SCREENS';
import { HomeStackParamList } from '../../navigation/types';

import Header from '../../components/common/Header';
import FilterShop from '../../components/shop/FilterShop';
import CategoryList from '../../components/shop/category/CategoryList';
import ProductCardItem from '../../components/common/ProductCard/ProductCardItem';

import type { ProductType } from '../../types/product';
import { productServices } from '../../services/productService';
import { useCategoryProducts } from '../../hook/useCategoryProduct';

type ShopNavigationProp = NativeStackNavigationProp<HomeStackParamList>;

export type SortType = 'asc' | 'desc';

const ShopScreen = () => {
  const navigation = useNavigation<ShopNavigationProp>();
  const [selectedCategory, setSelectedCategory] = useState('beauty');
  const { products, loadingProduct, loadingHasMore, error, loadMore } = useCategoryProducts(selectedCategory);

  const [categories, setCategories] = useState<string[]>([]);
  const [categoryError, setCategoryError] = useState<string | null>(null);

  const [sortPrice, setSortPrice] = useState<SortType>('asc');

  const filterData = useCallback(
    () => products.sort((a, b) => (sortPrice === 'asc' ? a.price - b.price : b.price - a.price)),
    [sortPrice, products],
  );

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await productServices.getCategoryList();

        setCategories(response);
        setCategoryError(null);
      } catch {
        setCategoryError('Lỗi không thể tải danh mục.');
      }
    };

    fetchCategories();
  }, []);

  const renderProductByCategory = ({ item }: { item: ProductType }) => <ProductCardItem item={item} widthStyle={180} />;

  const renderHeader = () => (
    <View style={{ backgroundColor: colors.background }}>
      <Header
        onBack={() => navigation.navigate(SCREENS.HOME_TAB)}
        rightElement={<Ionicons name="search-outline" size={22} color={colors.white} />}
        title={selectedCategory}
        isCategory
      />

      {categoryError ? (
        <Text style={styles.error}>{categoryError}</Text>
      ) : (
        <CategoryList
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      )}
    </View>
  );

  return (
    <>
      {renderHeader()}

      <FilterShop setSortPrice={setSortPrice} sortPrice={sortPrice} />

      <FlatList
        data={filterData()}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderProductByCategory}
        numColumns={2}
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
              <Text>Không có sản phẩm.</Text>
            </SafeAreaView>
          )
        }
      />
    </>
  );
};

export default ShopScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  contentContainer: {
    marginHorizontal: 16,
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

/* Load All Product */

// import { useCallback, useEffect, useMemo, useState } from 'react';
// import { useNavigation } from '@react-navigation/native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Ionicons } from '@react-native-vector-icons/ionicons';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';

// import { colors } from '../../themes/color';
// import { SCREENS } from '../../navigation/SCREENS';
// import { HomeStackParamList } from '../../navigation/types';

// import Header from '../../components/common/Header';
// import FilterShop from '../../components/shop/FilterShop';
// import CategoryList from '../../components/shop/category/CategoryList';
// import ProductCardItem from '../../components/common/ProductCard/ProductCardItem';

// import type { ProductType } from '../../types/product';
// import { productServices } from '../../services/productService';
// import { useCategoryProducts } from '../../hook/useCategoryProduct';

// type ShopNavigationProp = NativeStackNavigationProp<HomeStackParamList>;

// export type SortType = 'asc' | 'desc';

// const ShopScreen = () => {
//   const navigation = useNavigation<ShopNavigationProp>();

//   const [categories, setCategories] = useState<string[]>([]);
//   const [selectedCategory, setSelectedCategory] = useState('beauty');
//   const [categoryError, setCategoryError] = useState<string | null>(null);

//   const [sortByCategory, setSortByCategory] = useState<Record<string, SortType>>({});

//   const sortPrice = sortByCategory[selectedCategory] ?? 'asc';

//   const { products, visibleCount, loadingProduct, error, loadMore, refresh } = useCategoryProducts(selectedCategory);

//   useEffect(() => {
//     let mounted = true;

//     const fetchCategories = async () => {
//       try {
//         const response = await productServices.getCategoryList();

//         if (mounted) {
//           setCategories(response);
//           setCategoryError(null);
//         }
//       } catch {
//         if (mounted) {
//           setCategoryError('Lỗi không thể tải danh mục.');
//         }
//       }
//     };

//     void fetchCategories();

//     return () => {
//       mounted = false;
//     };
//   }, []);

//   const setSortPrice = useCallback(
//     (sort: SortType) => {
//       setSortByCategory((prev) => ({
//         ...prev,
//         [selectedCategory]: sort,
//       }));
//     },
//     [selectedCategory],
//   );

//   const sortedProducts = useMemo(() => {
//     return [...products].sort((a, b) => (sortPrice === 'asc' ? a.price - b.price : b.price - a.price));
//   }, [products, sortPrice]);

//   const visibleProducts = useMemo(() => sortedProducts.slice(0, visibleCount), [sortedProducts, visibleCount]);

//   const renderProductByCategory = useCallback(
//     ({ item }: { item: ProductType }) => <ProductCardItem item={item} widthStyle={180} />,
//     [],
//   );

//   const renderHeader = () => (
//     <View style={{ backgroundColor: colors.background }}>
//       <Header
//         onBack={() => navigation.navigate(SCREENS.HOME_TAB)}
//         rightElement={<Ionicons name="search-outline" size={22} color={colors.white} />}
//         title={selectedCategory}
//         isCategory
//       />

//       {categoryError ? (
//         <Text style={styles.error}>{categoryError}</Text>
//       ) : (
//         <CategoryList
//           categories={categories}
//           selectedCategory={selectedCategory}
//           setSelectedCategory={setSelectedCategory}
//         />
//       )}
//     </View>
//   );

//   return (
//     <>
//       {renderHeader()}

//       <FilterShop sortPrice={sortPrice} setSortPrice={setSortPrice} />

//       <FlatList
//         data={visibleProducts}
//         keyExtractor={(item) => String(item.id)}
//         renderItem={renderProductByCategory}
//         numColumns={2}
//         onEndReached={loadMore}
//         onEndReachedThreshold={0.3}
//         style={styles.container}
//         contentContainerStyle={styles.contentContainer}
//         refreshing={loadingProduct && products.length > 0}
//         onRefresh={refresh}
//         ListFooterComponent={
//           visibleCount < sortedProducts.length ? (
//             <ActivityIndicator size="small" color={colors.primary} style={styles.footer} />
//           ) : undefined
//         }
//         ListEmptyComponent={
//           loadingProduct ? (
//             <SafeAreaView style={styles.center}>
//               <ActivityIndicator size="large" color={colors.primary} />
//             </SafeAreaView>
//           ) : error ? (
//             <SafeAreaView style={styles.center}>
//               <Text style={styles.error}>{error}</Text>
//             </SafeAreaView>
//           ) : (
//             <SafeAreaView style={styles.center}>
//               <Text>Không có sản phẩm.</Text>
//             </SafeAreaView>
//           )
//         }
//       />
//     </>
//   );
// };

// export default ShopScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.background,
//   },

//   contentContainer: {
//     marginHorizontal: 16,
//   },

//   contentCategory: {
//     marginLeft: 16,
//   },

//   center: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: colors.background,
//     padding: 200,
//   },
//   message: {
//     marginTop: 12,
//     padding: 16,
//     fontSize: 14,
//     color: colors.gray,
//     textAlign: 'center',
//   },
//   error: {
//     margin: 16,
//     fontSize: 14,
//     color: 'red',
//     textAlign: 'center',
//   },
//   categoriesContainer: {
//     // paddingVertical: 30,
//   },
//   footer: {
//     padding: 16,
//   },
// });
