import React from 'react';
import { SCREENS } from '../SCREENS';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { screenOption } from '../screenOptions';

type tabBarIconProps = {
  routeName: string;
  focused: boolean;
  color: string;
  size: number;
};

const TabBarIcon = ({ routeName, focused, color, size }: tabBarIconProps) => {
  const icons = {
    [SCREENS.HOME_TAB]: focused ? 'home' : 'home-outline',
    [SCREENS.SHOP_TAB]: focused ? 'cart' : 'cart-outline',
    [SCREENS.BAG_TAB]: focused ? 'bag' : 'bag-outline',
    [SCREENS.FAVORITES_TAB]: focused ? 'heart' : 'heart-outline',
    [SCREENS.PROFILE_TAB]: focused ? 'person' : 'person-outline',
  };

  const iconName = icons[routeName as keyof typeof icons] ?? 'ellipse-outline';

  return (
    <Ionicons
      name={iconName}
      size={screenOption.tabBarIconStyle.size}
      color={color}
    />
  );
};

export default TabBarIcon;
