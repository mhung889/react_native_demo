import { NavigatorScreenParams } from '@react-navigation/native';
import { SCREENS } from './SCREENS';

export type OnBoardingStackParamList = {
  [SCREENS.ONBOARDING_STACK]: undefined;
};

export type AuthStackParamList = {
  [SCREENS.LOGIN]: undefined;
  [SCREENS.REGISTER]: undefined;

  [SCREENS.GET_STARTED]: undefined;
  [SCREENS.VERIFY_PHONE]: undefined;
  [SCREENS.PASSWORD_RECOVERY]: undefined;
  [SCREENS.VERIFY_IDENTITY]: undefined;
  [SCREENS.RESET_PASSWORD]: undefined;
};

export type HomeStackParamList = {
  [SCREENS.HOMEV1]: undefined;
};

export type MainTabParamList = {
  [SCREENS.HOME_TAB]: NavigatorScreenParams<HomeStackParamList> | undefined;
};

export type RootStackParamList = {
  [SCREENS.ONBOARDING_STACK]: NavigatorScreenParams<OnBoardingStackParamList>;

  [SCREENS.AUTH_STACK]: NavigatorScreenParams<AuthStackParamList>;

  [SCREENS.MAIN_STACK]: undefined;
};
