import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SCREENS } from '../SCREENS';
import HomeV1 from '../../screens/home/HomeV1';

const HomeStack = createNativeStackNavigator();

export default function HomeStackNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name={SCREENS.HOMEV1} component={HomeV1} />
    </HomeStack.Navigator>
  );
}
