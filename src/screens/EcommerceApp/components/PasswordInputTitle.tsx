import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import React from 'react';
import { useSignInLogic } from '../screens/auth/signIn/SignIn.logic';
import { colors } from '../themes/color';
import { Ionicons } from '@react-native-vector-icons/ionicons';

type PasswordInputTitleProps = TextInputProps & {
  touched?: boolean;
  errors?: string;
  placeholderText: string;
};

const PasswordInputTitle = ({
  errors,
  touched,
  placeholderText,
  value,
  ...inputProps
}: PasswordInputTitleProps) => {
  const { setIsPasswordVisible, isPasswordVisible } = useSignInLogic();

  return (
    <View style={styles.field}>
      <View
        style={[styles.inputContainer, touched && errors && styles.inputError]}
      >
        <TextInput
          style={styles.input}
          value={value}
          placeholder={placeholderText}
          placeholderTextColor={colors.gray}
          secureTextEntry={!isPasswordVisible}
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="current-password"
          returnKeyType="done"
          {...inputProps}
        />

        <Pressable
          onPress={() => setIsPasswordVisible(previous => !previous)}
          hitSlop={10}
          accessibilityRole="button"
          accessibilityLabel={
            isPasswordVisible ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'
          }
        >
          <Ionicons
            name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
            size={21}
            color={colors.gray}
          />
        </Pressable>
      </View>

      {touched && errors && <Text style={styles.errorText}>{errors}</Text>}
    </View>
  );
};

export default PasswordInputTitle;

const styles = StyleSheet.create({
  field: {
    gap: 9,
  },

  label: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },

  inputContainer: {
    minHeight: 54,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.gray,
    backgroundColor: colors.dark,
  },

  inputError: {
    borderColor: '#ef4444',
  },

  input: {
    flex: 1,
    minHeight: 52,
    color: colors.white,
    fontSize: 15,
    paddingVertical: 10,
  },

  errorText: {
    color: '#f87171',
    fontSize: 12,
    lineHeight: 17,
  },

  forgotPassword: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    alignItems: 'center',
  },

  forgotPasswordText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '600',
  },

  submitButton: {
    minHeight: 54,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: colors.primary,
    marginTop: 26,
  },

  submitButtonDisabled: {
    opacity: 0.6,
  },

  submitButtonPressed: {
    opacity: 0.85,
  },

  submitButtonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.7,
  },

  footerText: {
    color: colors.gray,
    fontSize: 12,
    textAlign: 'center',
    marginTop: 8,
  },
});
