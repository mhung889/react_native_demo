import { StyleSheet, Text } from 'react-native';
import React from 'react';
import { colors } from '../themes/color';

const ButtonAuth = ({ name }: { name: string }) => {
  return <Text style={styles.buttonText}> {name} </Text>;
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
