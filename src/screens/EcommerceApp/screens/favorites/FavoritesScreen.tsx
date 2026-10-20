import React from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '../../themes/color';
import { ProductType } from '../../types/product';
import { useFavoriteStore } from '../../store/favorite/favorite.store';

import ProductCardItem from '../../components/common/ProductCard/ProductCardItem';

const FavoritesScreen = () => {
  const { getFavoriteProductList } = useFavoriteStore();

  const products = getFavoriteProductList();

  const renderItem = ({ item }: { item: ProductType }) => {
    return <ProductCardItem item={item} isRemoveFavorite={true} />;
  };

  if (!products.length) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.foundText}>{'Danh sách yêu thích trống'}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.containerFavorite}>
      <Text style={styles.titleFavorite}>{'Favorite List'}</Text>

      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={styles.content}
      />
    </SafeAreaView>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },

  titleFavorite: {
    textAlign: 'center',
    paddingVertical: 10,
    fontSize: 25,
    color: colors.white,
  },

  containerFavorite: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    alignItems: 'center',
  },

  foundText: {
    color: colors.ordinaryText,
    fontSize: 20,
  },
});
