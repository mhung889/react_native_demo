import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SCREENS } from '../SCREENS';
import { ShopStackParamList } from '../types';
import { screenOption } from '../screenOptions';
import ShopScreen from '../../screens/shop/ShopScreen';

const ShopStack = createNativeStackNavigator<ShopStackParamList>();

const ShopStackNavigator = () => {
  return (
    <ShopStack.Navigator screenOptions={screenOption.default}>
      <ShopStack.Screen name={SCREENS.SHOP} component={ShopScreen} />
    </ShopStack.Navigator>
  );
};

export default ShopStackNavigator;
