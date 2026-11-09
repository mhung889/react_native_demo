import { CartItem } from '../store/cart/cart.store';
import { AddressItem } from '../store/profile/address.store';
import { User } from '../types/auth';
import { SCREENS } from './SCREENS';
import { NavigatorScreenParams } from '@react-navigation/native';

export type HomeStackParamList = {
  [SCREENS.HOME]: undefined;
  [SCREENS.PRODUCT_DETAIL]: {
    productId: number;
    fromProductLikeThisToProductDetail?: boolean;
  };
};

export type ProfileStackParamList = {
  [SCREENS.PROFILE]: undefined;
  [SCREENS.PROFILE_SETTINGS]: {
    user: User;
  };
  [SCREENS.PROFILE_MY_ORDERS]: undefined;
  [SCREENS.PROFILE_ORDER_DETAIL]: undefined;
  [SCREENS.PROFILE_PAYMENT_METHOD]:
    | {
        fromCheckout?: boolean;
      }
    | undefined;
  [SCREENS.PROFILE_ADDRESS]:
    | {
        fromCheckout?: boolean;
      }
    | undefined;

  [SCREENS.PROFILE_ADDRESS_ADD]: undefined;
  [SCREENS.PROFILE_ADDRESS_UPDATE]: {
    item: AddressItem;
  };
};

export type FavoritesStackParamList = {
  [SCREENS.FAVORITES]: undefined;
  [SCREENS.PRODUCT_DETAIL]: {
    productId: number;
  };
};

export type BagStackParamList = {
  [SCREENS.BAG]: undefined;
  [SCREENS.PRODUCT_DETAIL]: {
    productId: number;
  };
};

export type AuthStackParamList = {
  [SCREENS.SIGN_IN]: undefined;
  [SCREENS.SIGN_UP]: undefined;
  [SCREENS.FORGOT_PASSWORD]: undefined;
};

export type ShopStackParamList = {
  [SCREENS.SHOP]: undefined;
  [SCREENS.SEARCH_PRODUCT]: undefined;
  [SCREENS.PRODUCT_DETAIL]: {
    productId: number;
  };
  [SCREENS.SEARCH_PRODUCT_LIST]: {
    keyword: string;
  };
};

export type MainTabParamList = {
  [SCREENS.HOME_TAB]: NavigatorScreenParams<HomeStackParamList> | undefined;
  [SCREENS.SHOP_TAB]: NavigatorScreenParams<ShopStackParamList> | undefined;
  [SCREENS.BAG_TAB]: NavigatorScreenParams<BagStackParamList> | undefined;
  [SCREENS.FAVORITES_TAB]: NavigatorScreenParams<FavoritesStackParamList> | undefined;
  [SCREENS.PROFILE_TAB]: NavigatorScreenParams<ProfileStackParamList> | undefined;
};

export type RootStackParamList = {
  [SCREENS.AUTH]: undefined;
  [SCREENS.MAIN_TAB]: NavigatorScreenParams<MainTabParamList>;
  [SCREENS.CHECKOUT]: {
    itemList: CartItem[];
  };
  [SCREENS.ORDER_SUCCESS]: undefined;
};
