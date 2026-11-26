import React, { memo } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import AppText from './AppText';
import { colors } from '../../theme/colors';

type ButtonHeaderProps = {
  handleNavigate: () => void;
  title: string;
  marginTop?: number;
};

const ButtonHeader = ({ handleNavigate, title, marginTop = 20 }: ButtonHeaderProps) => {
  return (
    <TouchableOpacity style={[styles.button, { marginTop }]} activeOpacity={0.8} onPress={handleNavigate}>
      <AppText style={styles.buttonText}>{title}</AppText>
    </TouchableOpacity>
  );
};

export default memo(ButtonHeader);

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors['Red-400'],
    borderRadius: 16,
    // marginTop: 20,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors['Neutral-00'],
    paddingVertical: 12,
    textAlign: 'center',
  },
});
