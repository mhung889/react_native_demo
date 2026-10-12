import { StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import Header from '../../../components/auth/Header';
import { colors } from '../../../themes/color';
import ButtonAuth from '../../../components/ButtonAuth';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SCREENS } from '../../../navigation/SCREENS';

const ForgotPassword = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header name={'Forgot password'} screen={SCREENS.SIGN_IN} />

      <Text style={styles.descriptionText}>
        {
          'Please, enter your email address. You will receive a link to create a new password via email.'
        }
      </Text>

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
      </View>

      <ButtonAuth name={'SEND'} />
    </SafeAreaView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 10,
  },

  formContainer: {
    marginTop: 15,
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

  descriptionText: {
    color: colors.white,
    marginTop: 80,
  },
});
