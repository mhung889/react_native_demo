import React from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import HomeBanner from '../../components/home/HomeBanner';
import { useHomeLogic } from '../../components/home/Home.logic';
import ProductListHeader from '../../components/home/ProductListHeader';
import ProductCardItem from '../../components/common/ProductCard/ProductCardItem';

import { colors } from '../../themes/color';
import { ProductType } from '../../types/product';
import { commonStyle } from '../../themes/commonStyle';

const Home = () => {
  const { products, loading, hanleRefresh, refreshing } = useHomeLogic();

  const renderItem = ({ item }: { item: ProductType }) => {
    return <ProductCardItem item={item} />;
  };

  const renderRightElement = () => {
    return (
      <Pressable>
        <Text style={styles.viewAll}> View all</Text>
      </Pressable>
    );
  };

  if (loading) {
    return <ActivityIndicator size={20} color={'red'} />;
  }

  return (
    <FlatList
      style={styles.container}
      data={products}
      keyExtractor={(item) => item.id.toString()}
      refreshing={refreshing}
      onRefresh={hanleRefresh}
      ListHeaderComponent={
        <>
          <HomeBanner />

          <View style={styles.sectionContainer}>
            <ProductListHeader name="Sale" title="Super summer sale" rightElement={renderRightElement()} />

            <FlatList
              data={products.slice(0, 10)}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderItem}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.itemProduct}
            />
          </View>
        </>
      }
      contentContainerStyle={styles.listContainer}
    />
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  sectionContainer: {
    marginHorizontal: 16,
  },

  listContainer: {
    marginVertical: 2,
    paddingBottom: 50,
  },

  itemProduct: {
    gap: 12,
  },

  viewAll: {
    color: colors.white,
    fontFamily: commonStyle.fontFamily,
    fontSize: 16,
  },
});
