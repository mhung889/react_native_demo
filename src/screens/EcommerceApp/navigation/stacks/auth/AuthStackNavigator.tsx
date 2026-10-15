import React from 'react';
import { SCREENS } from '../../SCREENS';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ForgotPassword from '../../../screens/auth/forgotPassword/ForgotPassword';
import SignUp from '../../../screens/auth/signUp/SignUp';
import SignIn from '../../../screens/auth/signIn/SignIn';
import { screenOption } from '../../screenOptions';
import { AuthStackParamList } from '../../types';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator initialRouteName={SCREENS.SIGN_IN}>
      <AuthStack.Group screenOptions={screenOption.default}>
        <AuthStack.Screen name={SCREENS.SIGN_UP} component={SignUp} />
        <AuthStack.Screen name={SCREENS.SIGN_IN} component={SignIn} />
        <AuthStack.Screen
          name={SCREENS.FORGOT_PASSWORD}
          component={ForgotPassword}
        />
      </AuthStack.Group>
    </AuthStack.Navigator>
  );
};

export default AuthStackNavigator;
