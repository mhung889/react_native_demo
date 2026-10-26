import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../../themes/color';
import { ProductType } from '../../types/product';
import { commonStyle } from '../../themes/commonStyle';
import { formatPrice, getDiscountPrice } from '../../utils';

import RatingStar from '../common/ProductCard/RatingStar';

type Props = {
  product: ProductType;
};

const ProductInfo = ({ product }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <Text style={styles.brand}>{product.brand || product.category}</Text>

        <Text style={styles.price}>{formatPrice(getDiscountPrice(product.price, product.discountPercentage))}</Text>
      </View>
      <Text style={styles.name}>{product.title}</Text>
      <RatingStar reviews={product.reviews} />
      <Text style={styles.descriptionTitle}>{'Description'}</Text>
      <Text style={styles.description}>{product.description}</Text>
    </View>
  );
};

export default ProductInfo;

const styles = StyleSheet.create({
  container: {
    marginTop: 18,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  brand: {
    flex: 1,
    color: colors.white,
    fontFamily: commonStyle.fontFamily,
    fontSize: 20,
    fontWeight: '600',
  },
  price: {
    color: colors.white,
    fontFamily: commonStyle.fontFamily,
    fontSize: 22,
    fontWeight: '600',
  },
  name: {
    color: colors.gray,
    fontFamily: commonStyle.fontFamily,
    fontSize: 16,
    marginTop: 6,
  },
  descriptionTitle: {
    color: colors.ordinaryText,
    fontFamily: commonStyle.fontFamily,
    fontSize: 16,
    fontWeight: '600',
    marginTop: 22,
    marginBottom: 8,
  },
  description: {
    color: colors.gray,
    fontFamily: commonStyle.fontFamily,
    fontSize: 14,
    lineHeight: 22,
  },
});
