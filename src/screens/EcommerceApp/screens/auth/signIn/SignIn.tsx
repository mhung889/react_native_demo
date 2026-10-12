import { StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import Header from '../../../components/auth/Header';
import ButtonAuth from '../../../components/ButtonAuth';
import Footer from '../../../components/auth/Footer';
import { FontAwesomeFreeSolid } from '@react-native-vector-icons/fontawesome-free-solid';
import { colors } from '../../../themes/color';
import { commonStyle } from '../../../themes/commonStyle';
import { SafeAreaView } from 'react-native-safe-area-context';
import PasswordInput from '../../../components/auth/PasswordInput';
import { SCREENS } from '../../../navigation/SCREENS';
import { Link } from '@react-navigation/native';

const SignIn = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header name={'Login'} />

      {/* Form Signup */}
      <View style={styles.formContainer}>
        <View style={styles.item}>
          <Text style={styles.labelInput}>{'Email'} </Text>
          <TextInput
            placeholder="enter Email"
            style={styles.textInput}
            placeholderTextColor={colors.ordinaryText}
          />
        </View>

        <PasswordInput />
      </View>

      <View style={styles.loginPromptContainer}>
        <Text style={styles.loginPromptText}>{'Forgot your password?'}</Text>
        <Link screen={SCREENS.FORGOT_PASSWORD} params={{}}>
          <FontAwesomeFreeSolid
            name="arrow-right-long"
            color={colors.primary}
            size={20}
          />
        </Link>
      </View>

      <ButtonAuth name={'LOGIN'} />

      <Footer />
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 10,
  },

  formContainer: {
    marginTop: 50,
    gap: 10,
  },

  item: {
    backgroundColor: colors.dark,
    padding: 12,
    height: 55,
    paddingHorizontal: 15,
  },
  labelInput: {
    color: colors.gray,
    fontSize: 10,
  },
  textInput: {
    color: colors.ordinaryText,
    fontSize: 16,
  },

  loginPromptContainer: {
    flexDirection: 'row',
    gap: 6,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginVertical: 15,
    marginRight: 2,
  },
  loginPromptText: {
    color: colors.white,
    fontFamily: commonStyle.fontFamily,
    fontSize: 14,
  },
});
