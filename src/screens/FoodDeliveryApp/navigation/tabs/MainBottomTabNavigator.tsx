import React from 'react';
import HomeStackNavigator from '../stacks/HomeStackNavigator';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { SCREENS } from '../SCREENS';
import { screenOption } from '../screenOption';
import ProfileStackNavigator from '../stacks/ProfileStackNavigator';

const Tabs = createBottomTabNavigator();

export default function MainBottomTabNavigator() {
  return (
    <Tabs.Navigator screenOptions={screenOption.default}>
      <Tabs.Screen name={SCREENS.HOME_TAB} component={HomeStackNavigator} />
      <Tabs.Screen name={SCREENS.PROFILE_TAB} component={ProfileStackNavigator} />
    </Tabs.Navigator>
  );
}
