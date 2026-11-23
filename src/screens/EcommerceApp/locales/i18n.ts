import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './en/translation.json';
import vi from './vn/translation.json';
import { MMKVStorage } from '../store/MMKVstore/MMKV.store';

export const LANGUAGE_KEY = 'app_language';

export type AppLanguage = 'en' | 'vi';

const resources = {
  en: {
    translation: en,
  },
  vi: {
    translation: vi,
  },
};

// Initialize i18n
export const initI18n = async () => {
  const savedLanguage = MMKVStorage.getString(LANGUAGE_KEY);

  await i18n.use(initReactI18next).init({
    resources,
    lng: savedLanguage || 'en',
    fallbackLng: 'en',
    supportedLngs: ['en', 'vi'],
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });
};

// Change language and save to MMKV
export const changeAppLanguage = async (language: AppLanguage) => {
  await i18n.changeLanguage(language);

  MMKVStorage.set(LANGUAGE_KEY, language);
};

export default i18n;
