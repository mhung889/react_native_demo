import React, { memo, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { colors } from '../../themes/color';
import { AvatarDefaultIcon } from '../../assets/icons';
import { SCREENS } from '../../navigation/SCREENS';
import { commonStyle } from '../../themes/commonStyle';
import { useAuthStore } from '../../store/auth/auth.store';
import { ProfileStackParamList } from '../../navigation/types';
import ProfileMenuItem from '../../components/profile/ProfileMenuItem';
import { useAddressStore } from '../../store/profile/address.store';
import { useTranslation } from 'react-i18next';

type ProfileNavigationProp = NativeStackNavigationProp<ProfileStackParamList>;

const ProfileScreen = () => {
  const navigation = useNavigation<ProfileNavigationProp>();

  const { t } = useTranslation();

  const user = useAuthStore((state) => state.user);
  const addressList = useAddressStore((state) => state.addressList);

  const handleNavigateMyOrder = useCallback(() => {
    navigation.navigate(SCREENS.PROFILE_MY_ORDERS);
  }, [navigation]);

  const handleNavigatePaymentMethod = useCallback(() => {
    navigation.navigate(SCREENS.PROFILE_PAYMENT_METHOD);
  }, [navigation]);

  const handleNavigateAddress = useCallback(() => {
    navigation.navigate(SCREENS.PROFILE_ADDRESS);
  }, [navigation]);

  const handleNavigateSetting = useCallback(() => {
    if (!user) return;
    navigation.navigate(SCREENS.PROFILE_SETTINGS, {
      user,
    });
  }, [navigation, user]);

  const handleNavigatePassCode = useCallback(() => {
    navigation.navigate(SCREENS.PROFILE_PASSCODE);
  }, [navigation]);

  const handleNavigateChangeLanguage = useCallback(() => {
    navigation.navigate(SCREENS.PROFILE_LANGUAGE);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={[styles.header]}>{t('profile.myProfile')}</Text>

      <View style={styles.profileContainer}>
        <AvatarDefaultIcon width={64} height={64} style={styles.avatarDefaultIcon} />

        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{`${user?.firstName} ${user?.lastName}`}</Text>
          <Text style={styles.profileEmail}>{user?.email}</Text>
        </View>
      </View>

      <ProfileMenuItem
        title={t('profile.myOrders')}
        subtitle={t('profile.myOrderDescription')}
        isItemDivider
        onPress={handleNavigateMyOrder}
        isShowIconRight
      />

      <ProfileMenuItem
        title={t('profile.addresses')}
        subtitle={t('profile.addressesDescription', {
          count: addressList.length,
        })}
        isItemDivider
        onPress={handleNavigateAddress}
        isShowIconRight
      />

      <ProfileMenuItem
        title={t('profile.paymentMethods')}
        subtitle={t('profile.paymentMethodsDescription')}
        isItemDivider
        isShowIconRight
        onPress={handleNavigatePaymentMethod}
      />

      {/* <ProfileMenuItem title="My reviews" subtitle={`Reviews for `} isItemDivider isShowIconRight /> */}

      <ProfileMenuItem
        title={t('profile.settings')}
        subtitle={t('profile.settingsDescription')}
        onPress={handleNavigateSetting}
        isShowIconRight
        isItemDivider
      />

      <ProfileMenuItem
        title={t('profile.passcode')}
        subtitle={`Test PassCode`}
        onPress={handleNavigatePassCode}
        isShowIconRight
      />

      <ProfileMenuItem
        title={t('profile.language')}
        subtitle={t('profile.languageDescription')}
        onPress={handleNavigateChangeLanguage}
        isShowIconRight
      />
    </SafeAreaView>
  );
};

export default memo(ProfileScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  header: {
    color: colors.white,
    fontFamily: commonStyle.fontFamily,
    fontWeight: '700',
    fontSize: 34,
    marginHorizontal: 16,
    marginTop: Dimensions.get('window').height * 0.05, //5% screen
  },

  profileContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 18,
    marginHorizontal: 16,
    marginVertical: 20,
  },

  avatarDefaultIcon: {
    borderRadius: 32,
    backgroundColor: colors.whiteLogo,
  },

  profileInfo: {
    gap: 5,
  },

  profileName: {
    fontSize: 23,
    fontWeight: '700',
    color: colors.white,
  },

  profileEmail: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.gray,
  },
});
