import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SCREENS } from '../SCREENS';
import { screenOption } from '../screenOptions';
import { FavoritesStackParamList } from '../types';
import FavoritesScreen from '../../screens/favorites/FavoritesScreen';
import ProductDetailScreen from '../../screens/home/ProductDetailScreen';

const FavoriteStack = createNativeStackNavigator<FavoritesStackParamList>();

const FavoriteStackNavigator = () => {
  return (
    <FavoriteStack.Navigator screenOptions={screenOption.default}>
      <FavoriteStack.Screen name={SCREENS.FAVORITES} component={FavoritesScreen} />
      <FavoriteStack.Screen name={SCREENS.PRODUCT_DETAIL} component={ProductDetailScreen} />
    </FavoriteStack.Navigator>
  );
};

export default FavoriteStackNavigator;
