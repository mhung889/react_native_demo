import React, { ReactNode, useState } from 'react';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors } from '../themes/color';
import { Ionicons } from '@react-native-vector-icons/ionicons';

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  placeholderText: string;
  secureTextEntry?: boolean;
  isShowRightElement?: boolean;
  isRightElement?: ReactNode;
};

const TextInputTitle = <T extends FieldValues>({
  control,
  name,
  placeholderText,
  secureTextEntry = false,
  isShowRightElement = false,
  isRightElement,
}: Props<T>) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const shouldHidePassword = secureTextEntry && isShowRightElement && !isPasswordVisible;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value }, fieldState: { error, isTouched } }) => (
        <View style={styles.field}>
          <View style={[styles.inputContainer, isTouched && error && styles.inputError]}>
            <TextInput
              style={styles.input}
              value={value ?? ''}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholderText}
              placeholderTextColor={colors.gray}
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={shouldHidePassword}
            />
            {isRightElement
              ? isRightElement
              : isShowRightElement && (
                  <Pressable
                    onPress={() => setIsPasswordVisible(previous => !previous)}
                    hitSlop={10}
                    accessibilityRole="button"
                  >
                    <Ionicons
                      name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
                      size={21}
                      color={colors.gray}
                    />
                  </Pressable>
                )}
          </View>
          {/* {touched && errors && <Text> {errors} </Text>} */}
          <Text style={styles.errorText}>{error ? `${error.message}` : ''}</Text>
        </View>
      )}
    />
  );
};

export default TextInputTitle;

const styles = StyleSheet.create({
  field: {
    gap: 2,
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
});
