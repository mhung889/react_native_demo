import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { colors } from '../../themes/color';

const Footer = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.textSocialAccount}>
        {'Or sign up with social account'}
      </Text>
      <View style={styles.itemContainer}>
        <Ionicons
          name="logo-google"
          size={20}
          color={'red'}
          style={styles.logo}
        />

        <Ionicons
          name="logo-facebook"
          size={20}
          color={'red'}
          style={styles.logo}
        />
      </View>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 20,
    flex: 1,
    marginBottom: 30,
  },
  itemContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  logo: {
    paddingVertical: 16,
    paddingHorizontal: 26,
    backgroundColor: colors.whiteLogo,
    borderRadius: 20,
  },
  textSocialAccount: {
    color: colors.white,
    fontSize: 14,
  },
});
