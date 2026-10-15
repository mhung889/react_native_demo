import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SCREENS } from '../SCREENS';
import HomeStackNavigator from '../stacks/HomeStackNavigator';
import Home from '../../screens/home/Home';
import BagStackNavigator from '../stacks/BagStackNavigator';
import FavoriteStackNavigator from '../stacks/FavoriteStackNavigator';
import ProfileStackNavigator from '../stacks/ProfileStackNavigator';
import TabBarIcon from './TabBarIcon';
import { colors } from '../../themes/color';
import { MainTabParamList } from '../types';

const MainTab = createBottomTabNavigator<MainTabParamList>();

const MainBottomTabNavigator = () => {
  const renderIcon = (
    name: string,
    focused: boolean,
    color: string,
    size: number,
  ) => (
    <TabBarIcon routeName={name} focused={focused} color={color} size={size} />
  );

  return (
    <MainTab.Navigator
      initialRouteName={SCREENS.HOME_TAB}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) =>
          renderIcon(route.name, focused, color, size),
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.backgroundBottom,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.gray,
      })}
    >
      <MainTab.Screen
        name={SCREENS.HOME_TAB}
        component={HomeStackNavigator}
        options={{ title: 'Home' }}
      />
      <MainTab.Screen
        name={SCREENS.SHOP_TAB}
        component={Home}
        options={{ title: 'Shop' }}
      />
      <MainTab.Screen
        name={SCREENS.BAG_TAB}
        component={BagStackNavigator}
        options={{ title: 'Bag' }}
      />
      <MainTab.Screen
        name={SCREENS.FAVORITES_TAB}
        component={FavoriteStackNavigator}
        options={{ title: 'Favorites' }}
      />
      <MainTab.Screen
        name={SCREENS.PROFILE_TAB}
        component={ProfileStackNavigator}
        options={{ title: 'Profile' }}
      />
    </MainTab.Navigator>
  );
};

export default MainBottomTabNavigator;
