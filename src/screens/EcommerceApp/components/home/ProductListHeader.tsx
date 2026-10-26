import React, { memo, ReactNode, useCallback } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { colors } from '../../themes/color';
import { ProductType } from '../../types/product';
import { commonStyle } from '../../themes/commonStyle';
import ProductCardItem from '../common/ProductCard/ProductCardItem';

type ProductListHeaderProps = {
  name: string;
  title?: string;
  rightElement?: ReactNode;
  products?: ProductType[];
};

const ProductListHeader = ({ name, title, rightElement, products = [] }: ProductListHeaderProps) => {
  const renderItem = useCallback(({ item }: { item: ProductType }) => {
    return <ProductCardItem item={item} />;
  }, []);

  return (
    <>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>{name}</Text>
          {title && <Text style={styles.subtitle}>{title}</Text>}
        </View>
        {rightElement}
      </View>

      {products.length > 0 && (
        <View style={styles.sectionContainer}>
          <FlatList
            data={products}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.itemProduct}
          />
        </View>
      )}
    </>
  );
};

export default memo(ProductListHeader);

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: colors.white,
    fontFamily: commonStyle.fontFamily,
    fontSize: 30,
    fontWeight: 'bold',
  },
  subtitle: {
    color: colors.white,
    fontFamily: commonStyle.fontFamily,
  },

  sectionContainer: {
    marginHorizontal: 16,
  },

  itemProduct: {
    gap: 12,
  },
});
