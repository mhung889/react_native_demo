import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ProductType } from '../../../types/product';
import { colors } from '../../../themes/color';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import RatingStar from './RatingStar';
import { formatPrice, getDiscountPrice } from '../../../utils';

const ProductCardItem = ({ item }: { item: ProductType }) => {
  return (
    <View style={styles.container}>
      {/* Product image */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item?.images?.[0] }}
          style={styles.image}
          resizeMode="cover"
        />

        {/* Discount badge */}
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>{`-${Math.round(
            item.discountPercentage,
          )} %`}</Text>
        </View>

        {/* Favorite button */}
        <View style={styles.favoriteButton}>
          <Ionicons name="heart-outline" size={20} color={colors.dark} />
        </View>
      </View>

      {/* Product information */}
      <View style={styles.infoContainer}>
        <View style={styles.ratingContainer}>
          <RatingStar reviews={item.reviews} />
          <Text style={styles.quantityRating}>
            {` `}
            {`(${item.reviews.length})`}
          </Text>
        </View>

        <Text numberOfLines={1} style={styles.brand}>
          {item.brand}
        </Text>

        <Text numberOfLines={1} style={styles.productName}>
          {item?.title ?? ''}
        </Text>

        <View style={styles.priceContainer}>
          <Text style={styles.price}>{formatPrice(item.price)}</Text>
          <Text style={styles.oldPrice}>
            {formatPrice(getDiscountPrice(item.price, item.discountPercentage))}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ProductCardItem;

const styles = StyleSheet.create({
  container: {
    width: 150,
    marginRight: 10,
    marginBottom: 8,
  },

  imageContainer: {
    width: '100%',
    height: 184,
    position: 'relative',
    borderRadius: 12,
    backgroundColor: '#F3F3F3',
  },

  image: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },

  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 6,
  },

  discountText: {
    color: colors.white,
    fontSize: 11,
    fontWeight: '700',
  },

  favoriteButton: {
    position: 'absolute',
    bottom: -11,
    right: 1,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
  },

  infoContainer: {
    paddingTop: 8,
  },

  brand: {
    marginTop: 5,
    fontSize: 11,
    color: '#888888',
    fontWeight: '500',
  },

  productName: {
    marginTop: 3,
    fontSize: 13,
    lineHeight: 18,
    color: colors.white,
    fontWeight: '500',
  },

  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 7,
  },

  price: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.primary,
  },

  oldPrice: {
    fontSize: 12,
    color: '#999999',
    textDecorationLine: 'line-through',
  },

  ratingContainer: { flexDirection: 'row', alignItems: 'center' },
  quantityRating: { color: colors.ordinaryText, fontSize: 13 },
});
