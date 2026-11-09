import React, { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { Lucide } from '@react-native-vector-icons/lucide/static';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { colors } from '../../../themes/color';
import { formatCardNumber } from '../../../utils';
import { commonStyle } from '../../../themes/commonStyle';
import { IconCVV, VisaIcon } from '../../../assets/icons';
import { addNewCardSchema } from '../../../validation/addNewCardSchema';

type BottomSheetAddPaymentProps = {
  handleAddPaymentMethod: (data: FormValues, isDefault: boolean) => void;
};

export interface FormValues {
  nameCard: string;
  cardNumber: string;
  expireDate: string;
  cvv: string;
}

const BottomSheetAddPayment = ({ handleAddPaymentMethod }: BottomSheetAddPaymentProps) => {
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isDefault, setIsDefault] = useState<boolean>(false);

  const { control, handleSubmit, reset } = useForm<FormValues>({
    resolver: yupResolver(addNewCardSchema),
    mode: 'onBlur',
    defaultValues: {
      nameCard: '',
      cardNumber: '',
      expireDate: '',
      cvv: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    handleAddPaymentMethod(data, isDefault);
    reset();
    setIsDefault(false);
    setFocusedField(null);
  };

  const renderInput = (
    name: 'nameCard' | 'cardNumber' | 'expireDate' | 'cvv',
    label: string,
    keyboardType?: 'default' | 'phone-pad',
    icon?: React.ReactNode,
  ) => (
    <Controller
      name={name}
      control={control}
      render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => {
        const isFocused = focusedField === name;
        const isActive = isFocused || value.length > 0;

        return (
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              {isActive && (
                <Text style={styles.floatingLabel}>
                  {label} <Text style={styles.required}>{'*'}</Text>
                </Text>
              )}

              <View style={styles.placeHolderContainer}>
                <TextInput
                  style={styles.input}
                  value={value}
                  onChangeText={(text) => {
                    const formattedValue = name === 'cardNumber' ? formatCardNumber(text) : text;

                    onChange(formattedValue);
                  }}
                  onFocus={() => setFocusedField(name)}
                  onBlur={() => {
                    onBlur();
                    setFocusedField(null);
                  }}
                  placeholder={isActive ? '' : label}
                  placeholderTextColor={colors.gray}
                  keyboardType={keyboardType ?? 'default'}
                />
                {icon && <View style={styles.inputIcon}>{icon}</View>}
              </View>
            </View>

            {error && <Text style={styles.errorText}>{error.message}</Text>}
          </View>
        );
      }}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>{'Add new card'}</Text>

      <View style={styles.formContainer}>
        {renderInput('nameCard', 'Name on card')}

        {renderInput('cardNumber', 'Card number', 'default', <VisaIcon />)}

        {renderInput('expireDate', 'Expire Date')}

        {renderInput('cvv', 'CVV', 'phone-pad', <IconCVV />)}
      </View>

      <View style={styles.defaultContainer}>
        <Pressable style={styles.setDefault} onPress={() => setIsDefault(!isDefault)}>
          {isDefault && <Lucide name="check" size={20} color={colors.dark} />}
        </Pressable>
        <Text style={styles.defaultText}>{'Set as default payment method'}</Text>
      </View>

      <Pressable style={styles.button} onPress={() => handleSubmit(onSubmit)()}>
        <Text style={styles.buttonText}>{'ADD CARD'}</Text>
      </Pressable>
    </View>
  );
};

export default BottomSheetAddPayment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  headerText: {
    color: colors.white,
    fontSize: 21,
    fontWeight: '500',
    lineHeight: 22,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 18,
  },

  formContainer: {
    gap: 20,
    marginHorizontal: 16,
  },

  inputContainer: {
    gap: 2,
  },

  inputWrapper: {
    minHeight: 58,
    borderWidth: 1,
    borderColor: '#454545',
    borderRadius: 10,
    paddingHorizontal: 14,
    justifyContent: 'center',
    backgroundColor: '#292929',
  },

  floatingLabel: {
    color: colors.gray,
    fontSize: 11,
    marginTop: 6,
    fontFamily: commonStyle.fontFamily,
  },

  required: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },

  input: {
    flex: 1,
    color: colors.white,
    fontSize: 15,
    fontFamily: commonStyle.fontFamily,
    paddingVertical: 0,
    minHeight: 38,
  },

  errorText: {
    color: colors.primary,
  },

  defaultContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    gap: 13,
    marginTop: 12,
  },

  setDefault: {
    width: 20,
    height: 20,
    backgroundColor: colors.white,
    borderRadius: 5,
  },

  defaultText: {
    color: colors.white,
    fontSize: 14,
    height: 21,
    fontWeight: '500',
  },

  button: {
    backgroundColor: colors.primary,
    borderRadius: 32,
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 30,
  },

  buttonText: {
    paddingVertical: 14,
    color: colors.white,
    textAlign: 'center',
    lineHeight: 20,
    fontSize: 16,
    fontWeight: '600',
  },

  placeHolderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  inputIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
});
