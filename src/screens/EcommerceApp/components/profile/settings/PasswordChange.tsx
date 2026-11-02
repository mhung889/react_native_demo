import * as Yup from 'yup';
import React, { memo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { BottomSheetScrollView, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { Keyboard, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../../../themes/color';
import { commonStyle } from '../../../themes/commonStyle';
import { changePasswordSchema } from '../../../validation/changePasswordSchema';

type PasswordFormValues = Yup.InferType<typeof changePasswordSchema>;

const PasswordChange = () => {
  const [visibleOldPassword, setVisibleOldPassword] = useState(true);
  const [visibleNewPassword, setVisibleNewPassword] = useState(true);
  const [visibleRepeatPassword, setVisibleRepeatPassword] = useState(true);

  const {
    control,
    handleSubmit,
    clearErrors,
    formState: { isSubmitting },
  } = useForm<PasswordFormValues>({
    resolver: yupResolver(changePasswordSchema),
    mode: 'onBlur',
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      repeatPassword: '',
    },
  });

  const onSubmit = (data: PasswordFormValues) => {
    // if (data.oldPassword !== user.password) {
    //   Keyboard.dismiss();
    //   setError('oldPassword', {
    //     type: 'validate',
    //     message: 'Old password is incorrect',
    //   });
    //   return;
    // }
    Keyboard.dismiss();
    console.log(data);
  };

  const handleSavePassword = () => {
    handleSubmit(onSubmit)();
  };

  return (
    <KeyboardAvoidingView style={styles.keyboardContainer} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <BottomSheetScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          <Text style={styles.headerText}>{'Password Change'}</Text>

          {/* Old Password */}
          <Controller
            control={control}
            name="oldPassword"
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
              <View style={styles.fieldContainer}>
                <View style={styles.field}>
                  <BottomSheetTextInput
                    value={value}
                    onChangeText={(text) => {
                      onChange(text);
                      clearErrors('oldPassword');
                    }}
                    onBlur={onBlur}
                    placeholder="Old Password"
                    placeholderTextColor={colors.gray}
                    style={[styles.input]}
                    autoCapitalize="characters"
                    autoCorrect={false}
                    autoComplete="current-password"
                    textContentType="password"
                    secureTextEntry={visibleOldPassword}
                  />
                  <Pressable
                    onPress={() => setVisibleOldPassword((previous) => !previous)}
                    hitSlop={10}
                    accessibilityRole="button"
                  >
                    <Ionicons
                      name={visibleOldPassword ? 'eye-outline' : 'eye-off-outline'}
                      size={21}
                      color={colors.gray}
                    />
                  </Pressable>
                </View>
                {error && <Text style={styles.errorText}>{error.message}</Text>}
              </View>
            )}
          />

          <Pressable onPress={() => {}} style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>{'Forgot Password?'}</Text>
          </Pressable>

          {/* New Password */}
          <Controller
            control={control}
            name="newPassword"
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
              <View style={styles.fieldContainer}>
                <View style={styles.field}>
                  <BottomSheetTextInput
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="New Password"
                    placeholderTextColor={colors.gray}
                    style={[styles.input]}
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoComplete="new-password"
                    textContentType="newPassword"
                    secureTextEntry={visibleNewPassword}
                  />
                  <Pressable
                    onPress={() => setVisibleNewPassword((previous) => !previous)}
                    hitSlop={10}
                    accessibilityRole="button"
                  >
                    <Ionicons
                      name={visibleNewPassword ? 'eye-outline' : 'eye-off-outline'}
                      size={21}
                      color={colors.gray}
                    />
                  </Pressable>
                </View>
                {error && <Text style={styles.errorText}>{error.message}</Text>}
              </View>
            )}
          />

          {/* Repeat Password */}
          <Controller
            control={control}
            name="repeatPassword"
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
              <View style={styles.fieldContainer}>
                <View style={styles.field}>
                  <BottomSheetTextInput
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="Repeat Password"
                    placeholderTextColor={colors.gray}
                    style={[styles.input]}
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoComplete="new-password"
                    textContentType="newPassword"
                    secureTextEntry={visibleRepeatPassword}
                    returnKeyType="done"
                    onSubmitEditing={handleSavePassword}
                  />

                  <Pressable
                    onPress={() => setVisibleRepeatPassword((previous) => !previous)}
                    hitSlop={10}
                    accessibilityRole="button"
                  >
                    <Ionicons
                      name={visibleRepeatPassword ? 'eye-outline' : 'eye-off-outline'}
                      size={21}
                      color={colors.gray}
                    />
                  </Pressable>
                </View>
                {error && <Text style={styles.errorText}>{error.message}</Text>}
              </View>
            )}
          />

          {/* Submit */}
          <Pressable
            style={[styles.saveButton, isSubmitting && styles.disabledButton]}
            disabled={isSubmitting}
            onPress={handleSavePassword}
          >
            <Text style={styles.saveButtonText}>{isSubmitting ? 'Saving...' : 'Save Password'}</Text>
          </Pressable>
        </View>
      </BottomSheetScrollView>
    </KeyboardAvoidingView>
  );
};

export default memo(PasswordChange);

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    paddingBottom: 32,
  },

  container: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },

  headerText: {
    color: commonStyle.colorText,
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: 18,
  },

  fieldContainer: {
    marginBottom: 12,
  },

  field: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 64,
    backgroundColor: colors.dark,
    borderRadius: 10,
    borderColor: 'transparent',
    borderWidth: 1,
    paddingHorizontal: 10,
    gap: 10,
  },

  label: {
    color: commonStyle.colorText,
    fontFamily: commonStyle.fontFamily,
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 8,
  },

  input: {
    color: colors.white,
    fontFamily: commonStyle.fontFamily,
    fontSize: 15,
    flex: 1,
  },

  errorText: {
    color: colors.primary,
    fontFamily: commonStyle.fontFamily,
    fontSize: 12,
    paddingVertical: 3,
  },

  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: -10,
    marginBottom: 18,
  },

  forgotPasswordText: {
    color: colors.gray,
    fontFamily: commonStyle.fontFamily,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },

  saveButton: {
    minHeight: 52,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 28,
    marginTop: 8,
  },

  saveButtonText: {
    color: colors.ordinaryText,
    fontFamily: commonStyle.fontFamily,
    fontSize: 16,
    fontWeight: '600',
  },

  disabledButton: {
    opacity: 0.6,
  },
});
