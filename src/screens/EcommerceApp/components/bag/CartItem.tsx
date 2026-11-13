import React, { useCallback } from 'react';
import { Lucide } from '@react-native-vector-icons/lucide';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { formatPrice } from '../../utils';
import { colors } from '../../themes/color';
import CardItemLogic from './CartItem.logic';
import { SCREENS } from '../../navigation/SCREENS';
import { CartItem } from '../../store/cart/cart.store';
import { RootStackParamList } from '../../navigation/types';

interface CartItemProp {
  item: CartItem;
  handleBottomSheet: (item: CartItem) => void;
  navigation: NativeStackNavigationProp<RootStackParamList>;

  isItemSelected: (item: CartItem) => boolean;
  toggleSelectedItem: (item: CartItem) => void;
}

const CardItem = ({ item, handleBottomSheet, navigation, isItemSelected, toggleSelectedItem }: CartItemProp) => {
  const {
    active,
    setActive,
    totalPrice,
    handleIncrementQuantity,
    handleDecrementQuantity,
    handleRemoveItemToList,
    handleAddFavorite,
  } = CardItemLogic(item);

  const hasSelectedOrder = isItemSelected(item);

  const handleCheckbox = () => {
    toggleSelectedItem(item);
  };

  const handleNavigateProductDetail = useCallback(() => {
    navigation.navigate(SCREENS.MAIN_TAB, {
      screen: SCREENS.BAG_TAB,
      params: {
        screen: SCREENS.PRODUCT_DETAIL,
        params: {
          productId: item.id,
        },
      },
    });
  }, [navigation, item.id]);

  return (
    <View style={styles.wrapper}>
      {/* Checkbox */}
      <Pressable style={styles.checkbox} onPress={handleCheckbox}>
        {hasSelectedOrder && <Lucide name="check" size={20} color={colors.white} />}
      </Pressable>

      <View style={styles.card}>
        {/* Product image */}
        <Pressable onPress={handleNavigateProductDetail}>
          <Image source={{ uri: item.thumbnail }} style={styles.image} resizeMode="cover" />
        </Pressable>

        {/* Product information */}
        <View style={styles.productInfo}>
          <Text style={styles.productName} numberOfLines={1}>
            {item.title}
          </Text>

          <Pressable onPress={() => handleBottomSheet(item)} style={styles.categoryButton}>
            <Text style={styles.category}>{item.size}</Text>
            <Lucide name="chevron-down" size={14} color={colors.white} />
          </Pressable>

          {/* Quantity */}
          <View style={styles.quantityContainer}>
            <Pressable style={styles.quantityButton} onPress={handleDecrementQuantity}>
              <Lucide name="minus" color={colors.white} size={16} />
            </Pressable>

            <Text style={styles.quantity}>{item.quantity}</Text>

            <Pressable style={styles.quantityButton} onPress={handleIncrementQuantity}>
              <Lucide name="plus" color={colors.white} size={16} />
            </Pressable>
          </View>
        </View>

        {/* Price and menu */}
        <View style={styles.priceContainer}>
          <Pressable style={styles.moreButton} onPress={() => setActive(!active)}>
            <Lucide name="ellipsis-vertical" size={20} color={colors.gray} />
          </Pressable>

          <Text style={styles.price} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.8}>
            {formatPrice(totalPrice)}
          </Text>
        </View>

        {/* Dropdown menu */}
        {active && (
          <View style={styles.menu}>
            <Pressable style={styles.menuItem} onPress={handleAddFavorite}>
              <Lucide name="heart" size={16} color={colors.white} />
              <Text style={styles.menuText}>{'Add to favorites'}</Text>
            </Pressable>

            <View style={styles.menuDivider} />

            <Pressable style={styles.menuItem} onPress={handleRemoveItemToList}>
              <Lucide name="trash-2" size={16} color={colors.primary} />
              <Text style={[styles.menuText, { color: colors.primary }]}>{'Delete from list'}</Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
};

export default CardItem;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 6,
    gap: 10,
  },

  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },

  card: {
    flex: 1,
    minWidth: 0,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: colors.dark,
    borderRadius: 12,
    gap: 10,
    position: 'relative',
  },

  image: {
    width: 95,
    height: 105,
    borderRadius: 9,
    backgroundColor: colors.white,
  },

  productInfo: {
    flex: 1,
    minWidth: 0,
    justifyContent: 'center',
    alignSelf: 'stretch',
    paddingVertical: 3,
  },

  productName: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },

  categoryButton: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 7,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    backgroundColor: 'rgba(255,255,255,0.06)',
  },

  category: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '600',
  },

  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 12,
  },

  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.darkColor,
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },

  quantity: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '600',
    minWidth: 16,
    textAlign: 'center',
  },

  priceContainer: {
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexShrink: 0,
    minWidth: 65,
  },

  moreButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  price: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '700',
    maxWidth: 100,
    textAlign: 'right',
  },

  menu: {
    position: 'absolute',
    zIndex: 100,
    elevation: 12,
    top: 35,
    right: 5,
    width: 180,
    paddingVertical: 5,
    backgroundColor: colors.darkColor,
    borderRadius: 10,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    minHeight: 44,
    paddingHorizontal: 14,
  },

  menuDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.gray,
    marginHorizontal: 12,
  },

  menuText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '600',
  },
});
