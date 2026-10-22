import React from 'react';
import AuthStackNavigator from './navigation/stacks/auth/AuthStackNavigator';
import MainBottomTabNavigator from './navigation/tabs/MainBottomTabNavigator';

import { useAuthStore } from './store/auth/auth.store';
import { useFavoriteStore } from './store/favorite/favorite.store';

const RootNavigator = () => {
  const token = useAuthStore((state) => state.accessToken);

  if (token) {
    // tao key store mmkv cho tung user moi khi dang nhap
    useFavoriteStore.getState().loadFavorites();
    return <MainBottomTabNavigator />;
  }

  return <AuthStackNavigator />;
};

export default RootNavigator;
