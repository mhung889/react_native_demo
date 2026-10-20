import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SCREENS } from '../SCREENS';
import ProfileScreen from '../../screens/profile/ProfileScreen';
import MyOrdersScreen from '../../screens/profile/orders/MyOrdersScreen';
import OrderDetailScreen from '../../screens/profile/orders/OrderDetailScreen';
import SettingProfileScreen from '../../screens/profile/setting/SettingProfileScreen';

const ProfileStack = createNativeStackNavigator();

const ProfileStackNavigator = () => {
  return (
    <ProfileStack.Navigator initialRouteName={SCREENS.PROFILE}>
      <ProfileStack.Screen name={SCREENS.PROFILE} component={ProfileScreen} />
      <ProfileStack.Screen name={SCREENS.PROFILE_SETTINGS} component={SettingProfileScreen} />
      <ProfileStack.Screen name={SCREENS.PROFILE_MY_ORDERS} component={MyOrdersScreen} />
      <ProfileStack.Screen name={SCREENS.PROFILE_ORDER_DETAIL} component={OrderDetailScreen} />
    </ProfileStack.Navigator>
  );
};

export default ProfileStackNavigator;
