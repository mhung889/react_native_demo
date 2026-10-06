import { NewType } from '../types/news';
import { SCREENS } from './SCREENS';

export type RootStackParamList = {
  [SCREENS.HOME]: undefined;

  [SCREENS.DETAIL]: {
    new: NewType;
  };
};
