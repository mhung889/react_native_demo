import React from 'react';
import { Lucide } from '@react-native-vector-icons/lucide';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { formatPrice } from '../../utils';
import { colors } from '../../themes/color';
import CardItemLogic from './CardItem.logic';
import { CartItem } from '../../store/cart/cart.store';

interface CartItemProp {
  item: CartItem;
  handleBottomSheet: (item: CartItem) => void;
}

const CardItem = ({ item, handleBottomSheet }: CartItemProp) => {
  const {
    active,
    setActive,
    totalPrice,
    handleIncrementQuantity,
    handleDecrementQuantity,
    handleRemoveItemToList,
    handleAddFavorite,
  } = CardItemLogic(item);

  return (
    <>
      <View style={styles.card}>
        <Image
          source={{
            uri: `${item.thumbnail}`,
          }}
          style={styles.image}
          resizeMode="cover"
        />

        {/* Product information */}
        <View style={styles.productInfo}>
          <Text style={styles.productName} numberOfLines={1}>
            {item.title}
          </Text>

          <Pressable onPress={() => handleBottomSheet(item)}>
            <Text style={styles.category} numberOfLines={1}>
              {item.size}
            </Text>
          </Pressable>

          <View style={styles.quantityContainer}>
            <Pressable style={styles.quantityButton} onPress={handleDecrementQuantity}>
              <Lucide name="minus" color={colors.white} size={20} />
            </Pressable>

            <Text style={styles.quantity}>{item.quantity}</Text>

            <Pressable style={styles.quantityButton} onPress={handleIncrementQuantity}>
              <Lucide name="plus" color={colors.gray} size={20} />
            </Pressable>
          </View>
        </View>

        {/* Menu and price */}
        <View style={styles.priceContainer}>
          <Pressable onPress={() => setActive(!active)}>
            <Lucide name="ellipsis-vertical" size={24} color={colors.gray} />
          </Pressable>

          <Text style={styles.price} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.9}>
            {formatPrice(totalPrice)}
          </Text>
        </View>
      </View>

      {active && (
        <View style={styles.menu}>
          <Pressable style={styles.menuItem} onPress={handleAddFavorite}>
            <Text style={styles.menuText}>{'Add to favorites'}</Text>
          </Pressable>

          <Pressable style={[styles.menuItem, styles.menuItemDivider]} onPress={handleRemoveItemToList}>
            <Text style={styles.menuText}>{'Delete from the list'}</Text>
          </Pressable>
        </View>
      )}
    </>
  );
};

export default CardItem;

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    height: 150,
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: colors.dark,
    borderWidth: 1,
    borderColor: colors.dark,
    borderRadius: 10,
    overflow: 'visible',
    position: 'relative',
    marginTop: 10,
  },

  image: {
    width: 125,
    height: '100%',
    backgroundColor: colors.white,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },

  productInfo: {
    flex: 1,
    minWidth: 0,
    marginLeft: 10,
    marginTop: 12,
    marginBottom: 12,
  },

  productName: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 20,
  },

  category: {
    color: colors.white,
    fontSize: 15,
  },

  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 20,
  },

  quantityButton: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: colors.darkColor,
    borderRadius: 15,
    backgroundColor: colors.darkColor,
    justifyContent: 'center',
    alignItems: 'center',

    // Android
    elevation: 5,

    // iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },

  quantity: {
    color: colors.white,
    fontSize: 16,
    paddingHorizontal: 4,
  },

  priceContainer: {
    width: 85,
    flexShrink: 0,
    marginRight: 8,
    marginVertical: 12,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },

  price: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '500',
    right: 10,
  },

  divider: {
    borderWidth: 1,
    borderTopColor: colors.white,
  },

  menu: {
    position: 'absolute',
    backgroundColor: colors.dark,
    right: 55,
    top: -5,
    width: 170,
    minHeight: 100,
    justifyContent: 'center',
    alignItems: 'stretch',
    borderRadius: 10,

    // Android
    elevation: 12,

    // iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },

  menuItem: {
    minHeight: 48,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },

  menuItemDivider: {
    borderTopWidth: 1,
    borderTopColor: colors.gray,
  },

  menuText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
});
