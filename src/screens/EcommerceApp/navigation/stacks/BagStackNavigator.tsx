import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SCREENS } from '../SCREENS';
import { BagStackParamList } from '../types';
import { screenOption } from '../screenOptions';
import MyBagScreen from '../../screens/bag/MyBagScreen';

const BagStack = createNativeStackNavigator<BagStackParamList>();

const BagStackNavigator = () => {
  return (
    <BagStack.Navigator initialRouteName={SCREENS.BAG} screenOptions={screenOption.default}>
      <BagStack.Screen name={SCREENS.BAG} component={MyBagScreen} />
    </BagStack.Navigator>
  );
};

export default BagStackNavigator;
