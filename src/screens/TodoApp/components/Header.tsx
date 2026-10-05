import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { colors } from '../theme/color';

export default function Header() {
  return (
    <View style={styles.container}>
      <Text style={styles.inputHeader}>Todo List App</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    backgroundColor: colors.primary.orange,
  },
  inputHeader: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '600',
  },
});
