import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import React from 'react';
import { colors } from '../../themes/color';
import HomeBanner from '../../components/home/HomeBanner';
import { useHomeLogic } from '../../components/home/Home.logic';
import ProductCardItem from '../../components/home/ProductCard/ProductCardItem';
import { ProductType } from '../../types/product';
import HomeTitle from '../../components/home/HomeTitle';

const Home = () => {
  const { products } = useHomeLogic();

  const renderItem = ({ item }: { item: ProductType }) => {
    return <ProductCardItem item={item} />;
  };

  return (
    <ScrollView style={styles.container}>
      <HomeBanner />

      <View style={styles.listContainer}>
        <HomeTitle name={'Sale'} title={'Super summer sale'} />

        <FlatList
          data={products.slice(0, 10)}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          horizontal={true}
        />
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  listContainer: {
    marginHorizontal: 15,
    marginVertical: 2,
    flex: 1,
  },
});
