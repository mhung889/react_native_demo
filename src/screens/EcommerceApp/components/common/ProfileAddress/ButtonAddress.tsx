import { Pressable, StyleSheet, Text } from 'react-native';
import React from 'react';
import { colors } from '../../../themes/color';

interface ButtonAddressProps {
  title: string;
  onPress: () => void;
}

const ButtonAddress = ({ title, onPress }: ButtonAddressProps) => {
  return (
    <Pressable style={styles.addButton} onPress={onPress}>
      <Text style={styles.addButtonText}>{title}</Text>
    </Pressable>
  );
};

export default ButtonAddress;

const styles = StyleSheet.create({
  addButton: {
    marginTop: 'auto',
    backgroundColor: colors.primary,
    marginBottom: 6,
    borderRadius: 26,
    marginHorizontal: 16,
  },

  addButtonText: {
    color: colors.ordinaryText,
    paddingVertical: 10,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '500',
    textAlign: 'center',
  },
});
