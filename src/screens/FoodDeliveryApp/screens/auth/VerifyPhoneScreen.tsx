import { useShallow } from 'zustand/react/shallow';
import React, { useCallback, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';

import { colors } from '../../theme/colors';
import { SCREENS } from '../../navigation/SCREENS';
import { useOTPStore } from '../../store/otpStore';
import { AuthScreensProps, generateOTP } from './GetStartedScreen';

import AppText from '../../components/common/AppText';
import ButtonHeader from '../../components/common/ButtonHeader';
import HeaderAuth from '../../components/auth/header/HeaderAuth';

const CELL_COUNT = 4;

const VerifyPhoneScreen = ({ navigation }: AuthScreensProps) => {
  const { otpCodeVerification, setOTP } = useOTPStore(
    useShallow((state) => ({
      otpCodeVerification: state.otp,
      setOTP: state.setOTP,
    })),
  );

  console.log({ otpCodeVerification });

  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const handleNavigateAddress = useCallback(() => {
    if (value.length !== CELL_COUNT) {
      Alert.alert('Invalid OTP', 'Please enter the complete 4-digit verification code.');
      return;
    }

    if (value !== otpCodeVerification) {
      Alert.alert('Verification failed', 'The verification code is incorrect. Please try again.');
      setValue('');
      return;
    }

    navigation.push(SCREENS.PASSWORD_RECOVERY);
    // setValue('');
  }, [value, otpCodeVerification, navigation]);

  const handleSendAgain = () => {
    setOTP(generateOTP());
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderAuth title="Verify phone number" description="We have just sent a code to your phone" />

      <View style={styles.main}>
        <CodeField
          ref={ref}
          {...props}
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
            <Text
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}
            >
              {symbol || (isFocused && <Cursor />)}
            </Text>
          )}
        />

        <ButtonHeader handleNavigate={handleNavigateAddress} title="Next" marginTop={40} />

        <Pressable style={styles.buttonAgain} onPress={handleSendAgain}>
          <AppText style={styles.againText}>{'Send again'}</AppText>
        </Pressable>

        <View style={styles.termsContainer}>
          <AppText style={styles.termsText}>{'By signing up you agree to'}</AppText>
          <AppText style={styles.termsLinkText}>{'our terms of service and privacy policy'}</AppText>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default VerifyPhoneScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
  },
  codeFieldRoot: {
    // marginTop: 20,
  },
  cell: {
    width: 65,
    height: 65,
    fontSize: 30,
    borderBottomWidth: 2,
    textAlign: 'center',
  },
  focusCell: {
    borderColor: colors['Red-400'],
  },

  //
  main: {
    marginHorizontal: 35,
    marginTop: 24,
  },

  buttonAgain: {
    marginVertical: 16,
  },

  againText: {
    fontSize: 18,
    lineHeight: 20,
    textAlign: 'center',
    fontWeight: '500',
    color: colors['Neutral-800'],
    paddingVertical: 12,
  },

  termsContainer: {
    alignSelf: 'center',
  },

  termsText: {
    lineHeight: 20,
    textAlign: 'center',
    color: colors['Neutral-100'],
  },

  termsLinkText: {
    lineHeight: 20,
    color: colors['Red-400'],
  },
});
