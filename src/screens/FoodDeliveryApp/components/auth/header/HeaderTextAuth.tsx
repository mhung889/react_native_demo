import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';

import AppText from '../../common/AppText';
import { colors } from '../../../theme/colors';

type HeaderTextAuthProps = {
  title: string;
  description: string;
};

const HeaderTextAuth = ({ title, description }: HeaderTextAuthProps) => {
  return (
    <View style={styles.container}>
      <AppText style={styles.title}>{title}</AppText>

      <AppText style={styles.description}>{description}</AppText>
    </View>
  );
};

export default memo(HeaderTextAuth);

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors['Neutral-800'],
    lineHeight: 32,
    paddingBottom: 4,
    textAlign: 'center',
  },

  description: {
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 24,
    color: colors['Neutral-100'],
  },
});
