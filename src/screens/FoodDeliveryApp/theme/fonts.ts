export const Fonts = {
  Thin: 'DMSans-Thin',
  ThinItalic: 'DMSans-ThinItalic',

  ExtraLight: 'DMSans-ExtraLight',
  ExtraLightItalic: 'DMSans-ExtraLightItalic',

  Light: 'DMSans-Light',
  LightItalic: 'DMSans-LightItalic',

  Regular: 'DMSans-Regular',
  Italic: 'DMSans-Italic',

  Medium: 'DMSans-Medium',
  MediumItalic: 'DMSans-MediumItalic',

  SemiBold: 'DMSans-SemiBold',
  SemiBoldItalic: 'DMSans-SemiBoldItalic',

  Bold: 'DMSans-Bold',
  BoldItalic: 'DMSans-BoldItalic',

  ExtraBold: 'DMSans-ExtraBold',
  ExtraBoldItalic: 'DMSans-ExtraBoldItalic',

  Black: 'DMSans-Black',
  BlackItalic: 'DMSans-BlackItalic',
} as const;

export type FontName = keyof typeof Fonts;
export type FontFamily = (typeof Fonts)[FontName];
