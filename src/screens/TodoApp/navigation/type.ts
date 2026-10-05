import { SCREENS } from './SCREENS';

export type RootStackParamList = {
  [SCREENS.HOME]: undefined;

  [SCREENS.TODO_DETAIL]: {
    todo_id: string;
  };
};
