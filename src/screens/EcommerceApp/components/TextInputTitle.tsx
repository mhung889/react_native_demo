import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import React, { ReactNode, useState } from 'react';
import { colors } from '../themes/color';
import { Ionicons } from '@react-native-vector-icons/ionicons';

type TextInputTitleProps = TextInputProps & {
  errors?: string;
  touched?: boolean;
  field?: string;
  placeholderText: string;
  isRightElement?: ReactNode;
  isShowRightElement?: boolean;
  secureTextEntry?: boolean;
};

const TextInputTitle = ({
  errors,
  value,
  touched,
  placeholderText,
  isRightElement,
  secureTextEntry = false,
  isShowRightElement = false,
  ...inputProps
}: TextInputTitleProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const shouldHidePassword =
    isShowRightElement && secureTextEntry && !isPasswordVisible;

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
          secureTextEntry={shouldHidePassword}
          //

          {...inputProps}
        />
        {isRightElement
          ? isRightElement
          : isShowRightElement && (
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
            )}
      </View>

      {/* {touched && errors && <Text> {errors} </Text>} */}

      <Text style={styles.errorText}>{errors ? `${errors}` : ''}</Text>
    </View>
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
