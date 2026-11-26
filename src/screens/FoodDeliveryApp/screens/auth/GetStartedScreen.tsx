import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Alert, StyleSheet, TextInput, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CountryPicker, { type Country, type CountryCode } from 'react-native-country-picker-modal';

import { colors } from '../../theme/colors';
import { IconDown } from '../../assets/svg';
import { SCREENS } from '../../navigation/SCREENS';
import { useOTPStore } from '../../store/otpStore';
import { AuthStackParamList } from '../../navigation/types';

import AppText from '../../components/common/AppText';
import HeaderAuth from '../../components/auth/header/HeaderAuth';
import ButtonHeader from '../../components/common/ButtonHeader';

export type AuthScreensProps = NativeStackScreenProps<AuthStackParamList>;

export const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 900).toString();
};

const GetStartedScreen = ({ navigation }: AuthScreensProps) => {
  const [countryCode, setCountryCode] = useState<CountryCode>('VN');
  const [country, setCountry] = useState<Country>();
  const [phoneNumber, setPhoneNumber] = useState('');

  const setOtp = useOTPStore((state) => state.setOTP);

  const callingCode = country?.callingCode?.[0] ?? '84';

  const handleSelectCountry = (selected: Country) => {
    setCountryCode(selected.cca2);
    setCountry(selected);
  };

  const handleNavigateVerifyPhone = () => {
    const normalizedPhone = phoneNumber.replace(/\s+/g, '');
    //  Check empty
    if (!normalizedPhone) {
      Alert.alert('Invalid phone number', 'Please enter your phone number.');
      return;
    }

    // Only support Vietnam
    if (countryCode !== 'VN') {
      Alert.alert('Unsupported country', 'Currently, we only support Vietnamese phone numbers.');
      return;
    }

    const vietnamPhoneRegex = /^0[0-9]{9}$/;
    if (!vietnamPhoneRegex.test(normalizedPhone)) {
      Alert.alert('Invalid phone number', 'Please enter a valid 10-digit Vietnamese phone number.');
      return;
    }
    setOtp(generateOTP());
    // setPhoneNumber('');
    navigation.push(SCREENS.VERIFY_PHONE);
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderAuth title="Get started with Cook" description="Enter your phone number" />

      <View style={styles.content}>
        <View style={styles.phoneContainer}>
          <AppText style={styles.label}>{'Phone number'}</AppText>

          <View style={styles.inputContainer}>
            {/* Country picker */}
            <View style={styles.countryContainer}>
              <CountryPicker
                countryCode={countryCode}
                withFilter
                withFlag
                withCallingCode
                onSelect={handleSelectCountry}
                containerButtonStyle={styles.countryPicker}
              />

              <IconDown width={16} height={16} color={colors['Neutral-50']} />
            </View>

            {/* Calling code + Phone input */}
            <View style={styles.phoneInputContainer}>
              <AppText style={styles.callingCode}>{`+${callingCode}`}</AppText>

              <TextInput
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholderTextColor={colors['Neutral-50']}
                keyboardType="phone-pad"
                style={styles.input}
                maxLength={20}
              />
            </View>
          </View>
        </View>

        <ButtonHeader handleNavigate={handleNavigateVerifyPhone} title="Next" />
      </View>
    </SafeAreaView>
  );
};

export default GetStartedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    marginHorizontal: 35,
    marginTop: 24,
  },

  phoneContainer: {
    paddingVertical: 12,
  },

  label: {
    fontSize: 15,
    marginBottom: 10,
    color: colors['Neutral-50'],
    fontWeight: '500',
  },

  inputContainer: {
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors['Neutral-50'],
    borderRadius: 12,
    paddingHorizontal: 12,
    gap: 5,
  },

  countryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  countryPicker: {
    justifyContent: 'center',
  },

  phoneInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    bottom: 1,
  },

  callingCode: {
    fontSize: 16,
    color: colors['Neutral-800'],
    fontWeight: '500',
  },

  input: {
    flex: 1,
    fontSize: 16,
    color: colors['Neutral-50'],
  },
});
