import React from 'react';
import { Lucide } from '@react-native-vector-icons/lucide';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../../themes/color';
import { SortType } from '../../screens/shop/ShopScreen';

type FilterShopType = {
  sortPrice: SortType;
  setSortPrice: (sort: SortType) => void;
};

const FilterShop = ({ sortPrice, setSortPrice }: FilterShopType) => {
  const toggleSortPrice = () => {
    setSortPrice(sortPrice === 'asc' ? 'desc' : 'asc');
  };

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <Ionicons name="filter" color={colors.whiteLogo} size={26} />
        <Text style={styles.text}>Filter</Text>
      </View>

      <Pressable onPress={toggleSortPrice}>
        <View style={styles.sortContainer}>
          <Lucide name={sortPrice === 'asc' ? 'arrow-up-down' : 'arrow-down-up'} color={colors.whiteLogo} size={26} />
          <Text style={styles.text}>{`Price: ${sortPrice === 'asc' ? 'lowest to highest' : 'highest to lowest'}`}</Text>
        </View>
      </Pressable>

      <Ionicons name="list" color={colors.whiteLogo} size={26} />
    </View>
  );
};

export default FilterShop;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },

  filterContainer: {
    flexDirection: 'row',
    gap: 3,
    alignItems: 'center',
  },

  sortContainer: {
    flexDirection: 'row',
    gap: 3,
    alignItems: 'center',
  },

  text: {
    color: colors.ordinaryText,
    fontSize: 13,
  },
});
