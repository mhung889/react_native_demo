import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SCREENS } from '../../SCREENS';
import { screenOption } from '../../screenOption';
import LoginScreen from '../../../screens/auth/LoginScreen';
import ResetPassword from '../../../screens/auth/ResetPassword';
import GetStartedScreen from '../../../screens/auth/GetStartedScreen';
import VerifyPhoneScreen from '../../../screens/auth/VerifyPhoneScreen';
import VerifyIdentityScreen from '../../../screens/auth/VerifyIdentityScreen';
import PasswordRecoveryScreen from '../../../screens/auth/PasswordRecoveryScreen';

const AuthStack = createNativeStackNavigator();

export default function AuthStackNavigator() {
  return (
    <AuthStack.Navigator screenOptions={screenOption.default}>
      <AuthStack.Screen name={SCREENS.LOGIN} component={LoginScreen} />
      <AuthStack.Screen name={SCREENS.GET_STARTED} component={GetStartedScreen} />
      <AuthStack.Screen name={SCREENS.VERIFY_PHONE} component={VerifyPhoneScreen} />

      <AuthStack.Screen name={SCREENS.PASSWORD_RECOVERY} component={PasswordRecoveryScreen} />
      <AuthStack.Screen name={SCREENS.VERIFY_IDENTITY} component={VerifyIdentityScreen} />
      <AuthStack.Screen name={SCREENS.RESET_PASSWORD} component={ResetPassword} />
    </AuthStack.Navigator>
  );
}
