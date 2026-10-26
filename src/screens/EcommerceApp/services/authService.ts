import { api } from '../api/apiConfig';
import { SignInPayload } from '../types/auth';

export const authService = {
  signIn: async (payload: SignInPayload) => {
    const response = await api.post('/auth/login', {
      ...payload,
      expiresInMins: 30,
    });
    return response.data;
  },

  findAllUser: async () => {
    const response = await api.get('/users');
    return response.data.users || [];
  },

  // signUp: async (payload: any) => {
  //   const response = await api.post('/users/add', payload);
  //   return response.data;
  // },

  // logout: async () => {
  // },
};
