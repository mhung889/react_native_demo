import { create } from 'zustand';

interface OTPStoreState {
  otp: string | null;
  setOTP: (otp: string) => void;
}

export const useOTPStore = create<OTPStoreState>((set) => ({
  otp: null,
  setOTP: (otp: string) => {
    set({
      otp,
    });
  },
}));
