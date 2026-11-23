import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import CountryFlag from 'react-native-country-flag';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, StyleSheet, FlatList, TouchableOpacity, View } from 'react-native';

import { colors } from '../../../themes/color';
import { SCREENS } from '../../../navigation/SCREENS';
import Header from '../../../components/common/Header';
import { DATA_FLAG_COUNTRY } from '../../../constants';
import { changeAppLanguage } from '../../../locales/i18n';
import { ProfileStackParamList } from '../../../navigation/types';

type LanguageProps = NativeStackScreenProps<ProfileStackParamList, typeof SCREENS.PROFILE_LANGUAGE>;

type FlagCountry = {
  code: string;
  name: string;
  language: 'en' | 'vi' | null;
  isSupported: boolean;
};

const LanguageScreen = ({ navigation }: LanguageProps) => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleChangeLanguage = async (language: 'en' | 'vi') => {
    try {
      await changeAppLanguage(language);
    } catch (error) {
      console.error('Change language error:', error);
    }
  };

  const renderItem = ({ item }: { item: FlagCountry }) => {
    const isSelected = currentLanguage === item.language;
    return (
      <TouchableOpacity
        disabled={!item.isSupported}
        onPress={() => {
          if (item.language) {
            handleChangeLanguage(item.language);
          }
        }}
        style={[styles.item, !item.isSupported && styles.disabledItem, isSelected && styles.selectedItem]}
      >
        <CountryFlag isoCode={item.code} size={30} />
        <Text style={styles.itemText}>{item.name}</Text>
        <View style={styles.rightContent}>
          {!item.isSupported ? (
            <Text style={styles.comingSoon}>{'Coming soon'}</Text>
          ) : (
            isSelected && <Ionicons name="checkmark" size={26} color={colors.primary} />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header onBack={handleBack} isShowleftElement />

      <Text style={styles.title}>{t('language.selectLanguage')}</Text>

      <FlatList
        data={DATA_FLAG_COUNTRY}
        keyExtractor={(item) => item.code}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 26,
    marginBottom: 20,
    marginHorizontal: 16,
    color: colors.white,
    fontWeight: '600',
  },
  listContent: {
    marginHorizontal: 16,
    gap: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.white,
  },
  selectedItem: {
    borderColor: colors.primary,
  },
  disabledItem: {
    opacity: 0.4,
  },
  itemText: {
    color: colors.white,
    fontSize: 17,
    flex: 1,
  },
  rightContent: {
    minWidth: 85,
    alignItems: 'flex-end',
  },
  comingSoon: {
    color: colors.gray,
    fontSize: 12,
  },
});

export default LanguageScreen;
