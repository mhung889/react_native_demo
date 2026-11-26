import React from 'react';
import { Text, TextProps } from 'react-native';
import { Fonts } from '../../theme/fonts';

type AppTextProps = TextProps & {
  fontFamily?: string;
};

const AppText = ({ style, fontFamily = Fonts.Light, ...props }: AppTextProps) => {
  return (
    <Text
      {...props}
      style={[
        {
          fontFamily,
        },
        style,
      ]}
    />
  );
};

export default AppText;
