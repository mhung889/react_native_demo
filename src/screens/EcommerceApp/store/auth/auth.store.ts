import { create } from 'zustand';

import { User, SignInPayload } from '../../types/auth';
import { authService } from '../../services/authService';

type AuthState = {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  error: string | null;

  signIn: (payload: SignInPayload) => Promise<void>;
  logOut: () => void;
  clearError: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  isLoading: false,
  error: null,

  signIn: async (payload) => {
    set({
      isLoading: true,
      error: null,
    });
    try {
      const response = await authService.signIn(payload);
      const { accessToken, refreshToken, ...user } = response;
      set({
        user,
        accessToken,
        refreshToken,
        isLoading: false,
        error: null,
      });
    } catch (error: unknown) {
      const message = 'please retry user name and password';
      set({
        isLoading: false,
        error: message,
      });
      throw error;
    }
  },

  logOut: () => {
    set({
      user: null,
      accessToken: null,
      refreshToken: null,
      isLoading: false,
      error: null,
    });
  },

  clearError: () => {
    set({ error: null });
  },
}));
