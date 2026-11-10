import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useCallback, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetView } from '@gorhom/bottom-sheet';

import Header from '../../common/Header';
import { colors } from '../../../themes/color';
import { SCREENS } from '../../../navigation/SCREENS';
import { commonStyle } from '../../../themes/commonStyle';
import { ProfileStackParamList } from '../../../navigation/types';
import BottomSheetAddress from './bottomsheet/BottomSheetAddress';
import { FormValues, SelectedAddress } from './AddAddressProfile';
import { useAddressStore } from '../../../store/profile/address.store';
import { addAddressProfileSchema } from '../../../validation/addAddressProfileSchema';
import SwitchButton from '../../common/SwitchButton';

type UpdateAddressProfileProps = NativeStackScreenProps<ProfileStackParamList, typeof SCREENS.PROFILE_ADDRESS_UPDATE>;

const UpdateAddressProfile = ({ route, navigation }: UpdateAddressProfileProps) => {
  const { item } = route.params;

  const bottomSheetRef = useRef<BottomSheet>(null);

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<SelectedAddress>({
    province: null,
    ward: null,
  });

  const updateAddress = useAddressStore((state) => state.updateAddress);
  const removeAddress = useAddressStore((state) => state.removeAddress);

  // Parse old address
  const wardActive = item.address.ward ?? ''; // ward name
  const provinceActive = item.address.province ?? ''; // province name

  const { handleSubmit, control } = useForm({
    resolver: yupResolver(addAddressProfileSchema),
    mode: 'onBlur',
    defaultValues: {
      fullName: item.fullName,
      phoneNumber: item.phoneNumber,
      isDefault: item.isDefault,
      street: item.address.street,
    },
  });

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
              {isActive && <Text style={styles.floatingLabel}>{label}</Text>}

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
  // complete
  const handleUpdateComplete = () => {
    handleSubmit(onSubmit)();
  };

  const onSubmit = (data: FormValues) => {
    const wardName = selectedAddress.ward?.name ?? wardActive;
    const provinceName = selectedAddress.province?.name ?? provinceActive;

    if (!wardName || !provinceName) {
      Alert.alert('Validation', 'Please select Province and Ward');
      return;
    }
    // update Address Store
    updateAddress({
      id: item.id,
      fullName: data.fullName,
      phoneNumber: data.phoneNumber,
      isDefault: data.isDefault,
      address: {
        street: data.street,
        ward: wardName,
        province: provinceName,
      },
    });
    navigation.goBack();
  };

  //delete
  const handleDelete = () => {
    Alert.alert('Delete', 'Are you sure you want to delete this address ?', [
      { style: 'cancel', text: 'Cancel' },
      {
        style: 'destructive',
        text: 'Delete',
        onPress: () => {
          removeAddress(item.id);
          navigation.goBack();
        },
      },
    ]);
  };

  const renderBackDropBottomSheet = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} opacity={0.45} />
    ),
    [],
  );

  const handleOpenBottomSheet = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <>
      <SafeAreaView style={styles.container} edges={['top']}>
        <Header onBack={handleBack} isShowleftElement heightContainer={33} />

        <Text style={styles.header}>{'Update Address'}</Text>

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

                <SwitchButton value={value} onValueChange={onChange} />
              </View>
            )}
          />
        </View>

        <View style={styles.footer}>
          <Text onPress={handleDelete} style={styles.submitButton}>
            {'Delete '}
          </Text>
          <Text style={styles.submitButton} onPress={handleUpdateComplete}>
            {'Complete'}
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
          <BottomSheetAddress
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
            wardActive={wardActive}
            provinceActive={provinceActive}
          />
        </BottomSheetView>
      </BottomSheet>
    </>
  );
};

export default UpdateAddressProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
  },

  submitButton: {
    backgroundColor: colors.primary,
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    paddingVertical: 10,
    borderRadius: 20,
    flex: 1,
  },
});
