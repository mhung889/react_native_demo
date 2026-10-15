import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SCREENS } from '../SCREENS';
import Home from '../../screens/home/Home';
import ProductDetailScreen from '../../screens/home/ProductDetailScreen';
import { screenOption } from '../screenOptions';
import { HomeStackParamList } from '../types';

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator
      initialRouteName={SCREENS.HOME}
      screenOptions={screenOption.default}
    >
      <HomeStack.Screen name={SCREENS.HOME} component={Home} />
      <HomeStack.Screen
        name={SCREENS.PRODUCT_DETAIL}
        component={ProductDetailScreen}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
