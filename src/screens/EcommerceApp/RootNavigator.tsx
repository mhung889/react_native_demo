import React from 'react';
import { useAuthStore } from './store/auth.store';
import AuthStackNavigator from './navigation/stacks/auth/AuthStackNavigator';
import MainBottomTabNavigator from './navigation/tabs/MainBottomTabNavigator';

const RootNavigator = () => {
  const token = useAuthStore(state => state.accessToken);

  if (token) {
    return <MainBottomTabNavigator />;
  }

  return <AuthStackNavigator />;
};

export default RootNavigator;
