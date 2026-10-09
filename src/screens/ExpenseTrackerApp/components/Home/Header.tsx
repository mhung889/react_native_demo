import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Header = () => {
  return (
    <View style={styles.welcome}>
      <Text>Welcome Back </Text>
      <Text style={styles.welcomeApp}>My Expense Tracker App </Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  // Welcome
  welcome: {
    flex: 1,
    gap: 3,
    marginVertical: 10,
  },
  welcomeApp: {
    fontSize: 18,
    fontWeight: 'semibold',
  },
});
