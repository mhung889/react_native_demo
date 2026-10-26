import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text } from 'react-native';

import HomeBanner from '../../components/home/HomeBanner';
import { useHomeLogic } from '../../components/home/Home.logic';
import ProductListHeader from '../../components/home/ProductListHeader';

import { colors } from '../../themes/color';
import { commonStyle } from '../../themes/commonStyle';
import { MainTabParamList } from '../../navigation/types';
import { SCREENS } from '../../navigation/SCREENS';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

type HomeNavigationProp = BottomTabNavigationProp<MainTabParamList>;

const Home = () => {
  const navigation = useNavigation<HomeNavigationProp>();
  const { products, loading, hanleRefresh, refreshing } = useHomeLogic();

  const handleNagivateAllProduct = () => {
    navigation.navigate(SCREENS.SHOP_TAB, {
      screen: SCREENS.SHOP,
    });
  };

  const renderRightElement = () => {
    return (
      <Pressable onPress={handleNagivateAllProduct}>
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
          {products.length > 3 && <HomeBanner product={products[3]} />}

          <ProductListHeader
            name="Sale"
            title="Super summer sale"
            rightElement={renderRightElement()}
            products={products.slice(0, 10)}
          />
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
