import { DefaultTheme } from '@react-navigation/native';

import { colors } from '../theme/colors';
import { Fonts } from '../theme/fonts';

export const NavigationTheme = {
  ...DefaultTheme,

  colors: {
    ...DefaultTheme.colors,
    primary: colors['Red-400'],
    background: colors['Neutral-00'],
    // card: colors['Neutral-00'],
    // text: colors['Neutral-800'],
    // border: colors['Neutral-100'],
    // notification: colors['Red-400'],
  },

  fonts: {
    regular: {
      fontFamily: Fonts.Light,
      fontWeight: 'normal' as const,
    },
    medium: {
      fontFamily: Fonts.Medium,
      fontWeight: 'normal' as const,
    },
    bold: {
      fontFamily: Fonts.Bold,
      fontWeight: 'normal' as const,
    },
    heavy: {
      fontFamily: Fonts.ExtraBold,
      fontWeight: 'normal' as const,
    },
  },
};
