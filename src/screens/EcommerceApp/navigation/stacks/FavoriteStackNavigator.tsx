import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { SCREENS } from '../SCREENS';
import FavoritesScreen from '../../screens/favorites/FavoritesScreen';
import ProductDetailScreen from '../../screens/home/ProductDetailScreen';
import { FavoritesStackParamList } from '../types';

const FavoriteStack = createNativeStackNavigator<FavoritesStackParamList>();

const FavoriteStackNavigator = () => {
  return (
    <FavoriteStack.Navigator>
      <FavoriteStack.Screen
        name={SCREENS.FAVORITES}
        component={FavoritesScreen}
      />
      <FavoriteStack.Screen
        name={SCREENS.PRODUCT_DETAIL}
        component={ProductDetailScreen}
      />
    </FavoriteStack.Navigator>
  );
};

export default FavoriteStackNavigator;
