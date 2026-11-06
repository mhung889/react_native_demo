import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { colors } from '../../themes/color';
import { commonStyle } from '../../themes/commonStyle';

type AddToCartButtonProps = {
  onPress?: () => void;
  title?: string;
};

const AddToCartButton = ({ onPress, title = 'ADD TO CART' }: AddToCartButtonProps) => {
  return (
    <Pressable onPress={onPress} style={[styles.button]}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

export default AddToCartButton;

const styles = StyleSheet.create({
  button: {
    minHeight: 52,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: 30,
  },
  text: {
    color: colors.ordinaryText,
    fontFamily: commonStyle.fontFamily,
    fontSize: 15,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  pressed: {
    opacity: 0.9,
  },
});
