import { SCREENS } from './SCREENS';

export type RootBottomTabList = {
  [SCREENS.HOME]: undefined;
  [SCREENS.ADD]: undefined;
  [SCREENS.HISTORY]: undefined;
  [SCREENS.STATISTICS]: undefined;
};

export type TabBarIconType = {
  routeName: string;
  color: string;
  size: number;
  focused: boolean;
};
