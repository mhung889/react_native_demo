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
import { useTranslation } from 'react-i18next';

const MainTab = createBottomTabNavigator<MainTabParamList>();

const MainBottomTabNavigator = () => {
  const renderIcon = (name: string, focused: boolean, color: string, size: number) => (
    <TabBarIcon routeName={name} focused={focused} color={color} size={size} />
  );

  const { bottom } = useSafeAreaInsets();
  const { t } = useTranslation();

  return (
    <MainTab.Navigator
      initialRouteName={SCREENS.HOME_TAB}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => renderIcon(route.name, focused, color, size),
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.background,
          paddingBottom: bottom,
        },
        tabBarItemStyle: {},
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.gray,
      })}
    >
      <MainTab.Screen
        name={SCREENS.HOME_TAB}
        component={HomeStackNavigator}
        options={{ title: t('bottomMainTabs.home') }}
      />
      <MainTab.Screen
        name={SCREENS.SHOP_TAB}
        component={ShopStackNavigator}
        options={{ title: t('bottomMainTabs.shop') }}
      />
      <MainTab.Screen
        name={SCREENS.BAG_TAB}
        component={BagStackNavigator}
        options={{ title: t('bottomMainTabs.bag') }}
      />
      <MainTab.Screen
        name={SCREENS.FAVORITES_TAB}
        component={FavoriteStackNavigator}
        options={{ title: t('bottomMainTabs.favorites') }}
      />
      <MainTab.Screen
        name={SCREENS.PROFILE_TAB}
        component={ProfileStackNavigator}
        options={{ title: t('bottomMainTabs.profile') }}
      />
    </MainTab.Navigator>
  );
};

export default MainBottomTabNavigator;
