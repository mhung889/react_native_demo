import React, { useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetView } from '@gorhom/bottom-sheet';

import { colors } from '../../../themes/color';
import { SCREENS } from '../../../navigation/SCREENS';
import SettingProfileLogic from './SettingProfile.logic';
import { commonStyle } from '../../../themes/commonStyle';
import { ProfileStackParamList } from '../../../navigation/types';

import Header from '../../../components/common/Header';
import ProfileMenuItem from '../../../components/profile/ProfileMenuItem';
import PasswordChange from '../../../components/profile/settings/PasswordChange';

export type SettingProfileScreenProps = NativeStackScreenProps<ProfileStackParamList, typeof SCREENS.PROFILE_SETTINGS>;

const SettingProfileScreen = ({ route, navigation }: SettingProfileScreenProps) => {
  const {
    activePersonal,
    activePassword,
    handlePersonalPress,
    handlePasswordPress,
    handleBack,
    bottomSheetRef,
    handleOpenBottomSheet,
  } = SettingProfileLogic({
    route,
    navigation,
  });

  const { user } = route.params;

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} opacity={0.45} pressBehavior="close" />
    ),
    [],
  );

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={styles.container}>
        <Header onBack={handleBack} isShowleftElement heightContainer={33} />

        <Text style={styles.header}>{'Settings'}</Text>

        {/* Personal Information */}
        {activePersonal ? (
          <View style={styles.section}>
            <Pressable onPress={handlePersonalPress}>
              <Text style={styles.personalInformationText}>{'Personal Information'}</Text>
            </Pressable>

            <View style={styles.infoItem}>
              <Text style={styles.itemLabel}>{'Full name'}</Text>
              <Text style={styles.itemValue}>{`${user.firstName} ${user.lastName}`}</Text>
            </View>

            <View style={[styles.infoItem, styles.itemSpacing]}>
              <Text style={styles.itemLabel}>{'Date of birth'}</Text>
              <Text style={styles.itemValue}>{'test'}</Text>
            </View>
          </View>
        ) : (
          <ProfileMenuItem
            title="Personal Information"
            subtitle="Name, Date of Birth"
            onPress={handlePersonalPress}
            isItemDivider
          />
        )}

        {/* Password */}
        {activePassword ? (
          <View style={styles.section}>
            <View style={styles.passwordTitleRow}>
              <Pressable onPress={handlePasswordPress}>
                <Text style={styles.personalInformationText}>{'Password'}</Text>
              </Pressable>
              <Pressable style={styles.changeButton} onPress={handleOpenBottomSheet}>
                <Text style={styles.changeText}>{'Change'}</Text>
              </Pressable>
            </View>

            <View style={styles.passwordHeader}>
              <Text style={styles.itemLabel}>{'Password'}</Text>
              <Text style={styles.itemValue}>{'••••••••••••'}</Text>
            </View>
          </View>
        ) : (
          <ProfileMenuItem title="Password" subtitle="Password settings" onPress={handlePasswordPress} isItemDivider />
        )}
      </SafeAreaView>

      <BottomSheet
        ref={bottomSheetRef}
        enablePanDownToClose
        index={-1}
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: colors.background }}
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
        android_keyboardInputMode="adjustResize"
      >
        <BottomSheetView>
          <PasswordChange />
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export default SettingProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  header: {
    color: colors.white,
    fontFamily: commonStyle.fontFamily,
    fontWeight: 'bold',
    fontSize: 34,
    marginHorizontal: 16,
    marginTop: 18,
  },

  personalInformationText: {
    fontSize: 20,
    color: commonStyle.colorText,
    fontFamily: commonStyle.fontFamily,
    fontWeight: '500',
    marginTop: 23,
    marginBottom: 21,
  },

  section: {
    marginHorizontal: 16,
  },

  infoItem: {
    height: 64,
    backgroundColor: colors.dark,
    justifyContent: 'center',
    paddingLeft: 20,
    borderRadius: 8,
  },

  itemSpacing: {
    marginTop: 24,
  },

  passwordHeader: {
    height: 64,
    backgroundColor: colors.dark,
    borderRadius: 8,
    paddingLeft: 20,
    justifyContent: 'center',
  },

  changeButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: colors.background,
  },

  changeText: {
    color: colors.gray,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: commonStyle.fontFamily,
  },

  itemLabel: {
    color: colors.gray,
    fontFamily: commonStyle.fontFamily,
    fontSize: 11,
    marginBottom: 4,
  },

  itemValue: {
    color: colors.white,
    fontFamily: commonStyle.fontFamily,
    fontSize: 15,
    fontWeight: '400',
  },

  passwordTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  itemPassword: {
    color: colors.gray,
    fontFamily: commonStyle.fontFamily,
    fontSize: 15,
    fontWeight: '500',
  },
});
