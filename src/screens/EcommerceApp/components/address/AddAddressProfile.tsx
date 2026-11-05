import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useCallback, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Alert, Pressable, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetView } from '@gorhom/bottom-sheet';

import Header from '../common/Header';
import { colors } from '../../themes/color';
import { SCREENS } from '../../navigation/SCREENS';
import { commonStyle } from '../../themes/commonStyle';
import { ProfileStackParamList } from '../../navigation/types';
import { useAddressStore } from '../../store/profile/address.store';
import { addAddressProfileSchema } from '../../validation/addAddressProfileSchema';
import BottomSheetAddress, { Province, Ward } from './bottomsheet/BottomSheetAddress';

type AddAddressProfileProps = NativeStackScreenProps<ProfileStackParamList, typeof SCREENS.PROFILE_ADDRESS_ADD>;

export type FormValues = {
  fullName: string;
  phoneNumber: string;
  street: string;
  isDefault: boolean;
};

export type SelectedAddress = {
  province: Province | null;
  ward: Ward | null;
};

const AddAddressProfile = ({ navigation }: AddAddressProfileProps) => {
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const addAddress = useAddressStore((state) => state.addAddress);

  const bottomSheetRef = useRef<BottomSheet>(null);

  const [selectedAddress, setSelectedAddress] = useState<SelectedAddress>({
    province: null,
    ward: null,
  });

  const { handleSubmit, control, watch } = useForm<FormValues>({
    resolver: yupResolver(addAddressProfileSchema),
    mode: 'onBlur',
    defaultValues: {
      fullName: '',
      phoneNumber: '',
      street: '',
      isDefault: false,
    },
  });

  const handleBack = () => {
    if (watch('fullName') || watch('phoneNumber') || watch('street')) {
      return Alert.alert('', 'Updates have not been saved, Are you sure you want to discard the changes?', [
        {
          text: 'Cancel',
          style: 'default',
        },
        {
          text: 'Discard',
          style: 'destructive',
          onPress: () => navigation.goBack(),
        },
      ]);
    }
    navigation.goBack();
  };

  const handleAddAddress = () => {
    handleSubmit(onSubmit)();
  };

  const onSubmit = (data: FormValues) => {
    if (!selectedAddress.province || !selectedAddress.ward) {
      Alert.alert('Validation', 'Please select Province and Ward');
      return;
    }
    addAddress({
      id: Math.random().toString(),
      fullName: data.fullName,
      phoneNumber: data.phoneNumber,
      address: {
        street: data.street,
        ward: selectedAddress.ward.name,
        province: selectedAddress.province.name,
      },
      isDefault: data.isDefault,
    });
    navigation.goBack();
  };

  const renderInput = (
    name: 'fullName' | 'phoneNumber' | 'street',
    label: string,
    options?: {
      keyboardType?: 'default' | 'phone-pad';
      multiline?: boolean;
    },
  ) => (
    <Controller
      name={name}
      control={control}
      render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => {
        const isFocused = focusedField === name;
        const isActive = isFocused || value.length > 0;

        return (
          <View style={styles.inputContainer}>
            <View style={[styles.inputWrapper, options?.multiline && styles.multilineWrapper]}>
              {isActive && (
                <Text style={styles.floatingLabel}>
                  {label} <Text style={styles.required}>{'*'}</Text>
                </Text>
              )}

              <TextInput
                style={[styles.input, options?.multiline && styles.multilineInput]}
                value={value}
                onChangeText={onChange}
                onFocus={() => setFocusedField(name)}
                onBlur={() => {
                  onBlur();
                  setFocusedField(null);
                }}
                placeholder={isActive ? '' : label}
                placeholderTextColor={colors.gray}
                keyboardType={options?.keyboardType ?? 'default'}
                multiline={options?.multiline}
              />
            </View>

            {error && <Text style={styles.errorText}>{error.message}</Text>}
          </View>
        );
      }}
    />
  );

  const handleOpenBottomSheet = () => {
    bottomSheetRef.current?.expand();
  };

  const renderBackDropBottomSheet = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} opacity={0.45} />
    ),
    [],
  );

  return (
    <>
      <SafeAreaView style={styles.container} edges={['top']}>
        <Header onBack={handleBack} isShowleftElement heightContainer={33} />

        <Text style={styles.header}>{'Add Address'}</Text>

        <View style={styles.formContainer}>
          {renderInput('fullName', 'Full Name')}

          {renderInput('phoneNumber', 'Phone Number', {
            keyboardType: 'phone-pad',
          })}

          <Pressable onPress={handleOpenBottomSheet}>
            <View style={styles.selectedAddressContainer}>
              <View style={[styles.selectInput]}>
                <Text style={styles.selectLabel}>{'Provinces and Ward'}</Text>
                <Ionicons name="chevron-forward" size={20} color={colors.gray} />
              </View>
              {selectedAddress.ward?.name && selectedAddress.province?.name && (
                <Text
                  style={styles.selectedAddressInput}
                >{`${selectedAddress.ward.name}, ${selectedAddress.province.name}`}</Text>
              )}
            </View>
          </Pressable>

          {renderInput('street', 'Street', {
            multiline: false,
          })}

          <Controller
            name="isDefault"
            control={control}
            render={({ field: { value, onChange } }) => (
              <View style={styles.switchContainer}>
                <View style={styles.switchContent}>
                  <Text style={styles.switchTitle}>{'Set as default address'}</Text>
                </View>

                <Switch
                  trackColor={{
                    false: '#BDBDBD',
                    true: colors.primary,
                  }}
                  thumbColor="#FFFFFF"
                  ios_backgroundColor="#BDBDBD"
                  onValueChange={onChange}
                  value={value}
                />
              </View>
            )}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.submitButton} onPress={handleAddAddress}>
            {'Save Address'}
          </Text>
        </View>
      </SafeAreaView>

      <BottomSheet
        index={-1}
        ref={bottomSheetRef}
        enablePanDownToClose
        backdropComponent={renderBackDropBottomSheet}
        backgroundStyle={{ backgroundColor: colors.background }}
      >
        <BottomSheetView>
          <BottomSheetAddress selectedAddress={selectedAddress} setSelectedAddress={setSelectedAddress} />
        </BottomSheetView>
      </BottomSheet>
    </>
  );
};

export default AddAddressProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  header: {
    color: colors.white,
    fontFamily: commonStyle.fontFamily,
    fontWeight: 'bold',
    fontSize: 30,
    marginHorizontal: 16,
    marginTop: 22,
    marginBottom: 24,
  },

  formContainer: {
    backgroundColor: colors.dark,
    paddingHorizontal: 16,
    paddingVertical: 20,
    gap: 16,
  },

  inputContainer: {
    gap: 5,
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
    color: colors.white,
    fontSize: 15,
    fontFamily: commonStyle.fontFamily,
    paddingVertical: 0,
    minHeight: 38,
  },

  multilineWrapper: {
    minHeight: 100,
    justifyContent: 'flex-start',
    paddingTop: 8,
  },

  multilineInput: {
    minHeight: 65,
    paddingTop: 5,
  },

  errorText: {
    color: colors.primary,
    fontSize: 12,
    marginLeft: 4,
  },

  // province & ward
  selectedAddressContainer: {
    height: 58,
    borderWidth: 1,
    borderColor: '#454545',
    borderRadius: 10,
    backgroundColor: '#292929',
    justifyContent: 'center',
  },

  selectedAddressInput: {
    color: colors.white,
    fontSize: 15,
    marginLeft: 14,
  },

  selectInput: {
    paddingHorizontal: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  selectLabel: {
    color: colors.gray,
    fontSize: 15,
    fontFamily: commonStyle.fontFamily,
  },

  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  switchContent: {
    flex: 1,
  },

  switchTitle: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '600',
  },

  footer: {
    marginTop: 'auto',
    paddingHorizontal: 16,
    marginBottom: 6,
  },

  submitButton: {
    backgroundColor: colors.primary,
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    paddingVertical: 12,
    borderRadius: 24,
  },
});
