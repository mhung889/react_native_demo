import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SCREENS } from '../SCREENS';
import ProfileScreen from '../../screens/profile/ProfileScreen';

const ProfileStack = createNativeStackNavigator();

export default function ProfileStackNavigator() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name={SCREENS.PROFILE} component={ProfileScreen} />
    </ProfileStack.Navigator>
  );
}
