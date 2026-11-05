import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../../../themes/color';
import { SCREENS } from '../../../navigation/SCREENS';
import Header from '../../../components/common/Header';
import AddressProfileLogic from './AddressProfile.logic';
import { commonStyle } from '../../../themes/commonStyle';
import { ProfileStackParamList } from '../../../navigation/types';
import { AddressItem } from '../../../store/profile/address.store';

export type AddressProfileScreensProps = NativeStackScreenProps<ProfileStackParamList, typeof SCREENS.PROFILE_ADDRESS>;

const AddressProfileScreen = ({ route, navigation }: AddressProfileScreensProps) => {
  const { handleBack, handleNavigateToAddAddress, handleNavigateToUpdateAddress, addressList } = AddressProfileLogic({
    route,
    navigation,
  });

  const renderAddressItem = ({ item }: { item: AddressItem }) => {
    return (
      <Pressable style={styles.addressItem} onPress={() => handleNavigateToUpdateAddress(item)}>
        <View style={styles.infoContainer}>
          <Text style={styles.fullName}>{item.fullName}</Text>
          <View style={styles.divider} />
          <Text style={styles.phoneNumber}>{item.phoneNumber}</Text>
        </View>
        <Text style={styles.address}>{`${item.address.street}, ${item.address.ward}, ${item.address.province}`}</Text>
        {item.isDefault && (
          <View style={styles.defaultContainer}>
            <Text style={styles.defaultText}>{'Default'}</Text>
          </View>
        )}
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.content}>
        <Header onBack={handleBack} isShowleftElement heightContainer={33} />

        <Text style={styles.header}>{'My Addresses'}</Text>

        {addressList.length === 0 ? (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIcon}>
              <Ionicons name="location-outline" size={55} color={colors.gray} />
            </View>

            <Text style={styles.emptyTitle}>{'No addresses yet'}</Text>

            <Text style={styles.emptyDescription}>
              {'Add your delivery address to make your shopping experience easier.'}
            </Text>
          </View>
        ) : (
          <FlatList
            data={addressList}
            keyExtractor={(item) => item.id}
            renderItem={renderAddressItem}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={<View style={styles.separator} />}
          />
        )}
      </View>

      <Pressable style={styles.addButton} onPress={handleNavigateToAddAddress}>
        <Text style={styles.addButtonText}>{'Add Address'}</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default AddressProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'space-between',
  },

  content: {
    flex: 1,
  },

  header: {
    color: colors.white,
    fontFamily: commonStyle.fontFamily,
    fontWeight: 'bold',
    fontSize: 34,
    marginHorizontal: 16,
    marginTop: 18,
  },

  listContainer: {
    paddingHorizontal: 0,
    paddingTop: 16,
    paddingBottom: 20,
    flexGrow: 1,
  },

  addressItem: {
    backgroundColor: colors.dark,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },

  infoContainer: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
  },

  fullName: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
  },

  divider: {
    width: 1,
    backgroundColor: colors.gray,
    height: '60%',
  },

  phoneNumber: {
    color: colors.gray,
    fontSize: 13,
  },

  address: {
    color: colors.white,
    fontSize: 13,
    paddingVertical: 5,
  },

  defaultContainer: {
    borderColor: colors.primary,
    borderWidth: 1,
    alignSelf: 'flex-start',
    flexShrink: 0,
  },

  defaultText: {
    color: colors.primary,
    padding: 2,
    fontSize: 12,
  },

  separator: {
    height: 10,
  },

  emptyText: {
    color: colors.gray,
    textAlign: 'center',
    marginTop: 30,
    fontSize: 14,
  },

  addButton: {
    backgroundColor: colors.primary,
    marginBottom: 6,
    borderRadius: 26,
    marginHorizontal: 16,
  },

  addButtonText: {
    color: colors.ordinaryText,
    paddingVertical: 10,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '500',
    textAlign: 'center',
  },

  // empty
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingBottom: 50,
  },

  emptyIcon: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: colors.dark,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },

  emptyTitle: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },

  emptyDescription: {
    color: colors.gray,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 21,
  },
});
