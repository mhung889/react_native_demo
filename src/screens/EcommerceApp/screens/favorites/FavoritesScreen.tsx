// import React from 'react';
// import { FlatList, StyleSheet, Text } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';

// import { colors } from '../../themes/color';
// import { ProductType } from '../../types/product';
// import { useFavoriteStore } from '../../store/favorite/favorite.store';

// import ProductCardItem from '../../components/common/ProductCard/ProductCardItem';

// const FavoritesScreen = () => {
//   const { getFavoriteProductList } = useFavoriteStore();

//   const products = getFavoriteProductList();

//   const renderItem = ({ item }: { item: ProductType }) => {
//     return <ProductCardItem item={item} isRemoveFavorite={true} />;
//   };

//   if (!products.length) {
//     return (
//       <SafeAreaView style={styles.container}>
//         <Text style={styles.foundText}>{'Danh sách yêu thích trống'}</Text>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.containerFavorite}>
//       <Text style={styles.titleFavorite}>{'Favorite List'}</Text>

//       <FlatList
//         data={products}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={renderItem}
//         numColumns={2}
//         contentContainerStyle={styles.content}
//       />
//     </SafeAreaView>
//   );
// };

// export default FavoritesScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.background,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   titleFavorite: {
//     textAlign: 'center',
//     paddingVertical: 10,
//     fontSize: 25,
//     color: colors.white,
//   },

//   containerFavorite: {
//     flex: 1,
//     backgroundColor: colors.background,
//   },

//   content: {
//     alignItems: 'center',
//   },

//   foundText: {
//     color: colors.ordinaryText,
//     fontSize: 20,
//   },
// });

import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '../../themes/color';
import { ProductType } from '../../types/product';
import { useFavoriteStore } from '../../store/favorite/favorite.store';
import ProductCardItem from '../../components/common/ProductCard/ProductCardItem';

const FavoritesScreen = () => {
  const { getFavoriteProductList } = useFavoriteStore();
  const products = getFavoriteProductList();

  const renderItem = ({ item }: { item: ProductType }) => (
    <ProductCardItem item={item} isRemoveFavorite widthContainer={176} heightImage={200} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Yêu thích</Text>
        <Text style={styles.subtitle}>{`${products.length} sản phẩm`}</Text>
      </View>

      {products.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>{'Danh sách yêu thích trống'}</Text>
        </View>
      ) : (
        <FlatList
          key="favorites-grid"
          data={products}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        />
      )}
    </SafeAreaView>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 18,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.white,
  },
  subtitle: {
    marginTop: 5,
    fontSize: 14,
    color: colors.gray,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 32,
    gap: 16,
  },
  row: {
    justifyContent: 'space-between',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyIcon: {
    fontSize: 64,
    color: colors.gray,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.ordinaryText,
    textAlign: 'center',
  },
});
