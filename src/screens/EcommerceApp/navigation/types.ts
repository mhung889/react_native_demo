import { SCREENS } from './SCREENS';
import { NavigatorScreenParams } from '@react-navigation/native';

export type HomeStackParamList = {
  [SCREENS.HOME]: undefined;
  [SCREENS.PRODUCT_DETAIL]: {
    productId: number;
  };
};

export type ProfileStackParamList = {
  [SCREENS.PROFILE]: undefined;
  [SCREENS.PROFILE_SETTINGS]: undefined;
  [SCREENS.PROFILE_MY_ORDERS]: undefined;
  [SCREENS.PROFILE_ORDER_DETAIL]: undefined;
  [SCREENS.PROFILE_ADDRESS]: undefined;
};

export type FavoritesStackParamList = {
  [SCREENS.FAVORITES]: undefined;
  // thieu [SCREENS.PRODUCT_DETAIL]
};

export type BagStackParamList = {
  [SCREENS.BAG]: undefined;
};

export type AuthStackParamList = {
  [SCREENS.SIGN_IN]: undefined;
  [SCREENS.SIGN_UP]: undefined;
  [SCREENS.FORGOT_PASSWORD]: undefined;
};

export type ShopStackParamList = {
  [SCREENS.SHOP]: undefined;
};

export type MainTabParamList = {
  [SCREENS.HOME_TAB]: NavigatorScreenParams<HomeStackParamList> | undefined;
  [SCREENS.SHOP_TAB]: NavigatorScreenParams<ShopStackParamList> | undefined;
  [SCREENS.BAG_TAB]: NavigatorScreenParams<BagStackParamList> | undefined;
  [SCREENS.FAVORITES_TAB]:
    | NavigatorScreenParams<FavoritesStackParamList>
    | undefined;
  [SCREENS.PROFILE_TAB]:
    | NavigatorScreenParams<ProfileStackParamList>
    | undefined;
};

export type RootStackParamList = {
  [SCREENS.AUTH]: undefined;
  [SCREENS.MAIN_TAB]: NavigatorScreenParams<MainTabParamList>;
};
