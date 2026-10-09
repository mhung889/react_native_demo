import { NewType } from '../types/news';
import { SCREENS } from './SCREENS';

export type RootStackParamList = {
  [SCREENS.HOME]: undefined;

  [SCREENS.NEWS_DETAIL]: {
    newDetail: NewType;
    category?: string;
  };
};
