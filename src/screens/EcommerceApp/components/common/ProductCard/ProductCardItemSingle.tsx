import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../../navigation/types';
import { ProductType } from '../../../types/product';
import RatingStar from './RatingStar';
import { colors } from '../../../themes/color';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { useNavigation } from '@react-navigation/native';
import { useFavoriteStore } from '../../../store/favorite/favorite.store';
import { selectFavorite } from '../../../store/favorite/selector.favorite';
import { useShallow } from 'zustand/react/shallow';
import { SCREENS } from '../../../navigation/SCREENS';
import { formatPrice, getDiscountPrice } from '../../../utils';
import { commonStyle } from '../../../themes/commonStyle';

type ProductCardNavigationProp = NativeStackNavigationProp<HomeStackParamList>;

type ProductCardProps = {
  item: ProductType;
  isRemoveFavorite?: boolean;
  widthContainer?: number;
  heightImage?: number;
};

const ProductCardItemSingle = ({ item, isRemoveFavorite = false }: ProductCardProps) => {
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
      style={[styles.container]}
    >
      <Image source={{ uri: item.thumbnail }} style={styles.image} />

      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.brand}>{item.brand || item.category}</Text>

        <RatingStar reviews={item.reviews} styleContainer={{ marginVertical: 8 }} />
        <Text style={styles.price}>{formatPrice(getDiscountPrice(item.price, item.discountPercentage))}</Text>
      </View>

      <Pressable onPress={handleToggeHeart} style={styles.favoriteButton}>
        <Ionicons
          name={isFavorite ? 'heart' : 'heart-outline'}
          size={20}
          color={isFavorite ? colors.primary : colors.gray}
        />
      </Pressable>
    </Pressable>
  );
};

export default ProductCardItemSingle;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    backgroundColor: colors.dark,
    borderColor: colors.dark,
    borderRadius: 10,
    flexDirection: 'row',
    position: 'relative',
  },
  image: {
    width: 125,
    height: '100%',
    backgroundColor: colors.white,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  infoContainer: {
    marginLeft: 12,
    flex: 1,
    marginVertical: 12,
  },
  title: {
    fontSize: 15,
    color: colors.white,
    fontWeight: '500',
    fontFamily: commonStyle.fontFamily,
    marginBottom: 6,
  },
  brand: {
    color: colors.gray,
    fontFamily: commonStyle.fontFamily,
  },

  price: {
    color: colors.white,
    fontFamily: commonStyle.fontFamily,
    fontSize: 16,
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
});
