import React, { memo } from 'react';
import { Image, StyleSheet, View } from 'react-native';

import LogoImage from '../../../assets/Logo.png';
import HeaderTextAuth from './HeaderTextAuth';

type HeaderAuthProps = {
  title: string;
  description: string;
};

const HeaderAuth = ({ title, description }: HeaderAuthProps) => {
  return (
    <View>
      <Image source={LogoImage} style={styles.image} />

      <HeaderTextAuth title={title} description={description} />
    </View>
  );
};

export default memo(HeaderAuth);

const styles = StyleSheet.create({
  image: {
    marginTop: 58,
    marginBottom: 48,
    alignSelf: 'center',
  },
});
