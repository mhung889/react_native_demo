export const SCREENS = {
  //Root stack
  AUTH: 'Auth',
  CHECKOUT: 'Checkout',
  MAIN_TAB: 'MainTab',
  ORDER_SUCCESS: 'OrderSuccess',

  // Auth stack
  SIGN_UP: 'SignUp',
  SIGN_IN: 'SignIn',
  FORGOT_PASSWORD: 'ForgotPassword',

  // Bottom tabs
  HOME_TAB: 'HomeTab',
  SHOP_TAB: 'ShopTab',
  BAG_TAB: 'BagTab',
  FAVORITES_TAB: 'FavoritesTab',
  PROFILE_TAB: 'ProfileTab',

  // Home stack
  HOME: 'Home',
  PRODUCT_DETAIL: 'ProductDetail',

  //Shop stack
  SHOP: 'Shop',
  SEARCH_PRODUCT: 'SearchProduct',
  SEARCH_PRODUCT_LIST: 'SearchProductList',

  //Favaroties stack
  FAVORITES: 'Favorites',

  // Bag stack
  BAG: 'Bag',

  // Profile stack
  PROFILE: 'Profile',
  PROFILE_SETTINGS: 'ProfileSettings',
  PROFILE_MY_ORDERS: 'ProfileMyOrders',
  PROFILE_ORDER_DETAIL: 'ProfileOrderDetail',
  PROFILE_ADDRESS: 'ProfileAddress',
  PROFILE_PAYMENT_METHOD: 'ProfilePaymentMethod',

  // Profile Address management
  PROFILE_ADDRESS_ADD: 'ProfileAddressAdd',
  PROFILE_ADDRESS_UPDATE: 'ProfileAddressUpdate',
} as const;
