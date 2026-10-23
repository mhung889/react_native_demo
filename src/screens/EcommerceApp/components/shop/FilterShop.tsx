import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../../themes/color';
import { SortType } from '../../screens/shop/ShopScreen';
import { FilterIcon, UpDownIcon, ViewListIcon, ViewShapeIcon } from '../../assets/icons';
import { commonStyle } from '../../themes/commonStyle';

type FilterShopType = {
  sortPrice: SortType;
  setSortPrice: (sort: SortType) => void;
  activeRenderGrid: boolean;
  setActiveRenderGrid: React.Dispatch<React.SetStateAction<boolean>>;
};

const FilterShop = ({ sortPrice, setSortPrice, activeRenderGrid, setActiveRenderGrid }: FilterShopType) => {
  const toggleSortPrice = () => {
    setSortPrice(sortPrice === 'asc' ? 'desc' : 'asc');
  };

  const handleToggleRender = () => {
    setActiveRenderGrid((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <FilterIcon width={18} height={18} color={colors.whiteLogo} />
        <Text style={styles.text}>Filter</Text>
      </View>

      <Pressable onPress={toggleSortPrice}>
        <View style={styles.sortContainer}>
          <UpDownIcon width={18} height={18} color={colors.whiteLogo} />
          <Text style={styles.text}>{`Price: ${sortPrice === 'asc' ? 'lowest to highest' : 'highest to lowest'}`}</Text>
        </View>
      </Pressable>

      <Pressable onPress={handleToggleRender}>
        {activeRenderGrid ? (
          <ViewListIcon width={18} height={18} color={colors.whiteLogo} style={styles.logo} />
        ) : (
          <ViewShapeIcon width={18} height={18} color={colors.whiteLogo} style={styles.logo} />
        )}
      </Pressable>
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

  logo: {
    padding: 6,
  },

  filterContainer: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
  },

  sortContainer: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
  },

  text: {
    color: colors.ordinaryText,
    fontSize: 13,
    fontFamily: commonStyle.fontFamily,
    fontWeight: '400',
  },
});
