import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SCREENS } from '../SCREENS';
import { screenOption } from '../screenOptions';
import { ProfileStackParamList } from '../types';
import ProfileScreen from '../../screens/profile/ProfileScreen';
import MyOrdersScreen from '../../screens/profile/orders/MyOrdersScreen';
import OrderDetailScreen from '../../screens/profile/orders/OrderDetailScreen';
import SettingProfileScreen from '../../screens/profile/setting/SettingProfileScreen';
import AddressProfileScreen from '../../screens/profile/address/AddressProfileScreen';
import AddAddressProfile from '../../components/profile/address/AddAddressProfile';
import UpdateAddressProfile from '../../components/profile/address/UpdateAddressProfile';

const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();

const ProfileStackNavigator = () => {
  return (
    <ProfileStack.Navigator initialRouteName={SCREENS.PROFILE} screenOptions={screenOption.default}>
      <ProfileStack.Screen name={SCREENS.PROFILE} component={ProfileScreen} />
      <ProfileStack.Screen name={SCREENS.PROFILE_MY_ORDERS} component={MyOrdersScreen} />
      {/* <ProfileStack.Screen name={SCREENS.PROFILE_PAYMENT_METHOD} component={PaymentMethodScreen} /> */}

      <ProfileStack.Screen name={SCREENS.PROFILE_ADDRESS} component={AddressProfileScreen} />
      <ProfileStack.Screen name={SCREENS.PROFILE_ADDRESS_ADD} component={AddAddressProfile} />
      <ProfileStack.Screen name={SCREENS.PROFILE_ADDRESS_UPDATE} component={UpdateAddressProfile} />

      <ProfileStack.Screen name={SCREENS.PROFILE_SETTINGS} component={SettingProfileScreen} />
      <ProfileStack.Screen name={SCREENS.PROFILE_ORDER_DETAIL} component={OrderDetailScreen} />
    </ProfileStack.Navigator>
  );
};

export default ProfileStackNavigator;
