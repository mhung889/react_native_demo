import { Pressable, StyleSheet, Text } from 'react-native';
import React from 'react';
import { colors } from '../themes/color';

const ButtonAuth = ({
  name,
  handleSubmit,
}: {
  name: string;
  handleSubmit: any;
}) => {
  return (
    <Pressable onPress={handleSubmit}>
      <Text style={styles.buttonText}>{name}</Text>
    </Pressable>
  );
};

export default ButtonAuth;

const styles = StyleSheet.create({
  buttonText: {
    textAlign: 'center',
    backgroundColor: colors.primary,
    color: colors.ordinaryText,
    padding: 16,
    marginVertical: 30,
    marginHorizontal: 30,
    borderRadius: 30,
  },
});
