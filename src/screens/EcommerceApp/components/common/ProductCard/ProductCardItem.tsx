import React from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import RatingStar from './RatingStar';
import { colors } from '../../../themes/color';
import { ProductType } from '../../../types/product';
import { SCREENS } from '../../../navigation/SCREENS';
import { HomeStackParamList } from '../../../navigation/types';

import { formatPrice, getDiscountPrice } from '../../../utils';
import { useFavoriteStore } from '../../../store/favorite/favorite.store';
import { selectFavorite } from '../../../store/favorite/selector.favorite';

type ProductCardNavigationProp = NativeStackNavigationProp<HomeStackParamList>;

type ProductCardProps = {
  item: ProductType;
  isRemoveFavorite?: boolean;
  widthStyle?: number;
};

const ProductCardItem = ({ item, isRemoveFavorite = false, widthStyle = 150 }: ProductCardProps) => {
  const navigation = useNavigation<ProductCardNavigationProp>();

  const { isFavorite, addFavoriteProduct, removeFavoriteProduct } = useFavoriteStore(
    useShallow(selectFavorite(item.id)),
  );

  const handleToggeHeart = () => {
    if (isRemoveFavorite) {
      Alert.alert('Delete', `You want to delete ${item.title} to favorites?`, [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          style: 'destructive',
          onPress: () => {
            if (isFavorite) {
              removeFavoriteProduct(item.id);
            } else {
              addFavoriteProduct(item);
            }
          },
        },
      ]);
    } else {
      if (isFavorite) {
        removeFavoriteProduct(item.id);
      } else {
        addFavoriteProduct(item);
      }
    }
  };

  return (
    <Pressable
      onPress={() =>
        navigation.navigate(SCREENS.PRODUCT_DETAIL, {
          productId: item.id,
        })
      }
    >
      <View style={[styles.container, { width: widthStyle }]}>
        {/* Product image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: item?.images?.[0] }} style={styles.image} resizeMode="cover" />

          {/* Discount badge */}
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{`-${Math.round(item.discountPercentage)} %`}</Text>
          </View>

          {/* Favorite button */}
          <Pressable onPress={handleToggeHeart}>
            <View style={styles.favoriteButton}>
              <Ionicons
                name={isFavorite ? 'heart' : 'heart-outline'}
                size={20}
                color={isFavorite ? colors.primary : colors.gray}
              />
            </View>
          </Pressable>
        </View>

        {/* Product information */}
        <View style={styles.infoContainer}>
          <View style={styles.ratingContainer}>
            <RatingStar reviews={item.reviews} />
          </View>

          <Text numberOfLines={1} style={styles.brand}>
            {item.brand || item.category}
          </Text>

          <Text numberOfLines={1} style={styles.productName}>
            {item?.title ?? ''}
          </Text>

          <View style={styles.priceContainer}>
            <Text style={styles.price}>{formatPrice(item.price)}</Text>
            <Text style={styles.oldPrice}>{formatPrice(getDiscountPrice(item.price, item.discountPercentage))}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default ProductCardItem;

const styles = StyleSheet.create({
  container: {
    // width: 150,
    marginRight: 10,
    marginBottom: 8,
    // alignItems: 'center',
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
    backgroundColor: colors.dark,
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
    fontSize: 12,
    color: colors.gray,
    textDecorationLine: 'line-through',
  },

  oldPrice: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '700',
    // bottom: 1,
  },

  ratingContainer: { flexDirection: 'row', alignItems: 'center' },
});
