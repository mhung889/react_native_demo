import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import React from 'react';
import { colors } from '../themes/color';

type TextInputTitleProps = TextInputProps & {
  errors?: string;
  touched?: boolean;
  field?: string;
  placeholderText: string;
};

const TextInputTitle = ({
  errors,
  value,
  touched,
  placeholderText,
  ...inputProps
}: TextInputTitleProps) => {
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
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="next"
          {...inputProps}
        />
      </View>

      {touched && errors && <Text style={styles.errorText}>{errors}</Text>}
    </View>
  );
};

export default TextInputTitle;

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
