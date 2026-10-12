import { StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import Ionicons from '@react-native-vector-icons/ionicons';
import Lucide from '@react-native-vector-icons/lucide';
import { FontAwesomeFreeSolid } from '@react-native-vector-icons/fontawesome-free-solid';
import { colors } from '../../../themes/color';
import Header from '../../../components/auth/Header';
import Footer from '../../../components/auth/Footer';
import ButtonAuth from '../../../components/ButtonAuth';
import { commonStyle } from '../../../themes/commonStyle';
import PasswordInput from '../../../components/auth/PasswordInput';
import { SCREENS } from '../../../navigation/SCREENS';
import { Link } from '@react-navigation/native';

export { Ionicons, Lucide };

const SignUp = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header name={'Sign Up'} screen={SCREENS.SIGN_IN} />

      {/* Form Signup */}
      <View style={styles.formContainer}>
        <View style={styles.item}>
          <Text style={styles.labelInput}>{'Name'} </Text>
          <TextInput
            placeholder="enter Name"
            style={styles.textInput}
            placeholderTextColor={colors.ordinaryText}
          />
        </View>

        <View style={styles.item}>
          <Text style={styles.labelInput}>{'Email'} </Text>
          <TextInput
            placeholder="enter Email"
            style={styles.textInput}
            placeholderTextColor={colors.ordinaryText}
          />
        </View>

        {/* <View style={styles.item}>
          <TextInput
            placeholder="Password"
            style={styles.textInput}
            placeholderTextColor={colors.gray}
          />
        </View> */}
        <PasswordInput />
      </View>

      <View style={styles.loginPromptContainer}>
        <Text style={styles.loginPromptText}>{'Already have an account?'}</Text>
        <Link screen={SCREENS.SIGN_IN} params={{}}>
          <FontAwesomeFreeSolid
            name="arrow-right-long"
            color={colors.primary}
            size={20}
          />
        </Link>
      </View>

      <ButtonAuth name={'SIGN UP'} />

      <Footer />
    </SafeAreaView>
  );
};

export default SignUp;

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
