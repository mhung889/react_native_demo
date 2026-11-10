import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@react-native-vector-icons/ionicons';

import { SCREENS } from '../SCREENS';
import { colors } from '../../themes/color';
import { screenOption } from '../screenOptions';
import { useCartStore } from '../../store/cart/cart.store';

type TabBarIconProps = {
  routeName: string;
  focused: boolean;
  color: string;
  size: number;
};

const TabBarIcon = ({ routeName, focused, color }: TabBarIconProps) => {
  const cartLength = useCartStore((state) => state.items.length);

  const icons = {
    [SCREENS.HOME_TAB]: focused ? 'home' : 'home-outline',
    [SCREENS.SHOP_TAB]: focused ? 'cart' : 'cart-outline',
    [SCREENS.BAG_TAB]: focused ? 'bag' : 'bag-outline',
    [SCREENS.FAVORITES_TAB]: focused ? 'heart' : 'heart-outline',
    [SCREENS.PROFILE_TAB]: focused ? 'person' : 'person-outline',
  } as const;

  const iconName = icons[routeName as keyof typeof icons] ?? 'ellipse-outline';

  return (
    <View style={styles.container}>
      <Ionicons name={iconName} size={screenOption.tabBarIconStyle.size} color={color} />

      {routeName === SCREENS.BAG_TAB && cartLength > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{cartLength > 99 ? '99+' : cartLength}</Text>
        </View>
      )}
    </View>
  );
};

export default TabBarIcon;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },

  badge: {
    position: 'absolute',
    top: -7,
    right: -11,
    minWidth: 17,
    height: 17,
    borderRadius: 10,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    borderWidth: 1,
    borderColor: colors.backgroundBottom,
  },

  badgeText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '700',
  },
});
