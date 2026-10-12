import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainBottomTabNavigator from './navigation/tabs/MainBottomTabNavigator';
import AuthStackNavigator from './navigation/stacks/auth/AuthStackNavigator';

const EcommerceApp = () => {
  const isLogined: boolean = false;

  return (
    <NavigationContainer>
      {!isLogined ? <AuthStackNavigator /> : <MainBottomTabNavigator />}
    </NavigationContainer>
  );
};

export default EcommerceApp;
