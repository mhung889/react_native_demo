import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import MyBagScreen from '../../screens/bag/MyBagScreen';
import { SCREENS } from '../SCREENS';
import { BagStackParamList } from '../types';

const BagStack = createNativeStackNavigator<BagStackParamList>();

const BagStackNavigator = () => {
  return (
    <BagStack.Navigator initialRouteName={SCREENS.BAG}>
      <BagStack.Screen name={SCREENS.BAG} component={MyBagScreen} />
    </BagStack.Navigator>
  );
};

export default BagStackNavigator;
