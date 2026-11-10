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
}

const CardItem = ({ item, handleBottomSheet, navigation }: CartItemProp) => {
  const {
    active,
    setActive,
    totalPrice,
    handleIncrementQuantity,
    handleDecrementQuantity,
    handleRemoveItemToList,
    handleAddFavorite,
  } = CardItemLogic(item);

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
    <>
      <View style={styles.card}>
        <Pressable onPress={handleNavigateProductDetail}>
          <Image
            source={{
              uri: `${item.thumbnail}`,
            }}
            style={styles.image}
            resizeMode="cover"
          />
        </Pressable>

        {/* Product information */}
        <View style={styles.productInfo}>
          <Text style={styles.productName} numberOfLines={1}>
            {item.title}
          </Text>

          <Pressable onPress={() => handleBottomSheet(item)} style={styles.categoryButton}>
            <Text style={styles.category}>{item.size}</Text>
            <Lucide name="chevron-down" size={16} color={colors.white} />
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
    height: 130,
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: colors.dark,
    borderWidth: 1,
    borderColor: colors.dark,
    borderRadius: 10,
    overflow: 'visible',
    position: 'relative',
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
    marginLeft: 10,
    marginTop: 12,
    marginBottom: 12,
  },

  productName: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 20,
  },

  categoryButton: {
    alignSelf: 'flex-start',
    flexGrow: 0,
    flexShrink: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: 3,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'rgba(255,255,255,0.18)',
    backgroundColor: 'rgba(255,255,255,0.06)',
    marginTop: 3,
  },

  category: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '600',
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
