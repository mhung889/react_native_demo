import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStackNavigator from './navigation/stacks/auth/AuthStackNavigator';
import MainBottomTabNavigator from './navigation/tabs/MainBottomTabNavigator';

import { SCREENS } from './navigation/SCREENS';
import { RootStackParamList } from './navigation/types';
import { screenOption } from './navigation/screenOptions';
import CheckoutScreen from './screens/bag/CheckoutScreen';

import { useAuthStore } from './store/auth/auth.store';
import { useFavoriteStore } from './store/favorite/favorite.store';
import OrderSuccess from './screens/bag/OrderSuccess';

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const token = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    if (token) {
      useFavoriteStore.getState().loadFavorites();
    }
  }, [token]);

  return (
    <RootStack.Navigator>
      {token ? (
        <RootStack.Group screenOptions={screenOption.default}>
          <RootStack.Screen name={SCREENS.MAIN_TAB} component={MainBottomTabNavigator} />
          <RootStack.Screen name={SCREENS.CHECKOUT} component={CheckoutScreen} />
          <RootStack.Screen name={SCREENS.ORDER_SUCCESS} component={OrderSuccess} />
        </RootStack.Group>
      ) : (
        <RootStack.Group screenOptions={screenOption.default}>
          <RootStack.Screen name={SCREENS.AUTH} component={AuthStackNavigator} />
        </RootStack.Group>
      )}
    </RootStack.Navigator>
  );
};

export default RootNavigator;
