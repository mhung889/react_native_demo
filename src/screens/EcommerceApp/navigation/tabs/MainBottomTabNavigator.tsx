import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { SCREENS } from '../SCREENS';
import TabBarIcon from './TabBarIcon';
import { colors } from '../../themes/color';
import { MainTabParamList } from '../types';

import BagStackNavigator from '../stacks/BagStackNavigator';
import HomeStackNavigator from '../stacks/HomeStackNavigator';
import ShopStackNavigator from '../stacks/ShopStackNavigator';
import ProfileStackNavigator from '../stacks/ProfileStackNavigator';
import FavoriteStackNavigator from '../stacks/FavoriteStackNavigator';

const MainTab = createBottomTabNavigator<MainTabParamList>();

const MainBottomTabNavigator = () => {
  const renderIcon = (name: string, focused: boolean, color: string, size: number) => (
    <TabBarIcon routeName={name} focused={focused} color={color} size={size} />
  );

  const { bottom } = useSafeAreaInsets();

  return (
    <MainTab.Navigator
      initialRouteName={SCREENS.HOME_TAB}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => renderIcon(route.name, focused, color, size),
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.backgroundBottom,
          paddingBottom: bottom,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.gray,
      })}
    >
      <MainTab.Screen name={SCREENS.HOME_TAB} component={HomeStackNavigator} options={{ title: 'Home' }} />
      <MainTab.Screen name={SCREENS.SHOP_TAB} component={ShopStackNavigator} options={{ title: 'Shop' }} />
      <MainTab.Screen name={SCREENS.BAG_TAB} component={BagStackNavigator} options={{ title: 'Bag' }} />
      <MainTab.Screen
        name={SCREENS.FAVORITES_TAB}
        component={FavoriteStackNavigator}
        options={{ title: 'Favorites' }}
      />
      <MainTab.Screen name={SCREENS.PROFILE_TAB} component={ProfileStackNavigator} options={{ title: 'Profile' }} />
    </MainTab.Navigator>
  );
};

export default MainBottomTabNavigator;
