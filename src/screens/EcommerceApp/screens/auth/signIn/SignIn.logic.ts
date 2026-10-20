import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { useAuthStore } from '../../../store/auth.store';
import { authService } from '../../../services/authService';
import { AuthStackParamList } from '../../../navigation/types';

type SignInNavigationProp = NativeStackNavigationProp<AuthStackParamList>;

export const useSignInLogic = () => {
  const navigation = useNavigation<SignInNavigationProp>();
  const signIn = useAuthStore(state => state.signIn);

  const _onSubmit = async (values: any) => {
    try {
      const username = values.username.trim().toLowerCase();

      const listUsers = await authService.findAllUser();

      const existUser = listUsers.some(
        (user: any) => user.username === username,
      );

      if (!existUser) {
        Alert.alert('Đăng nhập thất bại', 'Tên đăng nhập không tồn tại.');
        return;
      }

      await signIn({
        username,
        password: values.password,
      });
    } catch {
      const message = useAuthStore.getState().error;

      Alert.alert(
        'Đăng nhập thất bại',
        message ?? 'Đã xảy ra lỗi. Vui lòng thử lại.',
      );
    }
  };

  return {
    onSubmit: _onSubmit,
    navigation,
    signIn,
  };
};
