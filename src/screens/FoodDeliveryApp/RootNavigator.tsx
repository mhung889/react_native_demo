import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SCREENS } from './navigation/SCREENS';
import OnboardingScreen from './screens/onboarding/OnboardingScreen';
import { screenOption } from './navigation/screenOption';
import AuthStackNavigator from './navigation/stacks/auth/AuthStackNavigator';
import MainBottomTabNavigator from './navigation/tabs/MainBottomTabNavigator';

const RootStack = createNativeStackNavigator();

const RootNavigator = () => {
  const isToken = false;

  return (
    <RootStack.Navigator screenOptions={screenOption.default}>
      {isToken ? (
        <>
          <RootStack.Screen name={SCREENS.ONBOARDING_STACK} component={OnboardingScreen} />
          <RootStack.Screen name={SCREENS.AUTH_STACK} component={AuthStackNavigator} />
        </>
      ) : (
        <RootStack.Screen name={SCREENS.MAIN_STACK} component={MainBottomTabNavigator} />
      )}
    </RootStack.Navigator>
  );
};

export default RootNavigator;
