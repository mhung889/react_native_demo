import { FlatList, StyleSheet, Text } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFavoriteStore } from '../../store/favorite.store';
import ProductCardItem from '../../components/common/ProductCard/ProductCardItem';
import { ProductType } from '../../types/product';
import { colors } from '../../themes/color';

const FavoritesScreen = () => {
  const { getFavoriteProductList } = useFavoriteStore();

  const products = getFavoriteProductList();

  const renderItem = ({ item }: { item: ProductType }) => {
    return <ProductCardItem item={item} />;
  };

  if (!products.length) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: colors.background,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: colors.ordinaryText, fontSize: 20 }}>
          Danh sách yêu thích trống
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <Text
        style={{
          textAlign: 'center',
          paddingVertical: 10,
          fontSize: 25,
          color: colors.white,
        }}
      >
        Favorite List
      </Text>

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
  content: {
    alignItems: 'center',
  },
});
