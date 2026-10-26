import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SCREENS } from '../SCREENS';
import { ShopStackParamList } from '../types';
import { screenOption } from '../screenOptions';
import ShopScreen from '../../screens/shop/ShopScreen';
import ProductDetailScreen from '../../screens/home/ProductDetailScreen';
import SearchProductScreen from '../../screens/shop/SearchProductScreen';
import SearchProductList from '../../components/shop/search/SearchProductList';

const ShopStack = createNativeStackNavigator<ShopStackParamList>();

const ShopStackNavigator = () => {
  return (
    <ShopStack.Navigator screenOptions={screenOption.default} initialRouteName={SCREENS.SHOP}>
      <ShopStack.Screen name={SCREENS.SHOP} component={ShopScreen} />
      <ShopStack.Screen name={SCREENS.PRODUCT_DETAIL} component={ProductDetailScreen} />
      <ShopStack.Screen name={SCREENS.SEARCH_PRODUCT} component={SearchProductScreen} />
      <ShopStack.Screen name={SCREENS.SEARCH_PRODUCT_LIST} component={SearchProductList} />
    </ShopStack.Navigator>
  );
};

export default ShopStackNavigator;
