import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { SCREENS } from './navigation/SCREENS';
import OnboardingScreen from './screens/onboarding/OnboardingScreen';
import { screenOption } from './navigation/screenOption';

const RootStack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <RootStack.Navigator screenOptions={screenOption.default}>
      <RootStack.Screen name={SCREENS.ONBOARDING_STACK} component={OnboardingScreen} />
    </RootStack.Navigator>
  );
};

export default RootNavigator;
