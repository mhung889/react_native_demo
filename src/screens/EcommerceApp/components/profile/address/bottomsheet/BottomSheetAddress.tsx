import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import React, { memo, useCallback, useEffect, useState } from 'react';

import { colors } from '../../../../themes/color';
import { SelectedAddress } from '../AddAddressProfile';
import { addressService } from '../../../../services/addressService';

export type Province = {
  code: number;
  name: string;
};

export type Ward = {
  code: number;
  name: string;
};

interface BottomSheetProps {
  selectedAddress: SelectedAddress;
  setSelectedAddress: React.Dispatch<React.SetStateAction<SelectedAddress>>;
  wardActive?: string;
  provinceActive?: string;
}

const BottomSheetAddress = ({ selectedAddress, setSelectedAddress, wardActive, provinceActive }: BottomSheetProps) => {
  const [listProvinces, setListProvinces] = useState<Province[]>([]);
  const [listWards, setListWards] = useState<Ward[]>([]);

  const fetchListProvinces = useCallback(async () => {
    try {
      const response = await addressService.getListProvinces();

      setListProvinces(response);
    } catch (error) {
      console.log('Fetch provinces error:', error);
    }
  }, []);

  const fetchListWards = useCallback(async (provinceCode: number) => {
    try {
      setListWards([]);

      const response = await addressService.getListWardsByProvinceCode(provinceCode);

      setListWards(response);
    } catch (error) {
      console.log('Fetch wards error:', error);
    }
  }, []);

  useEffect(() => {
    fetchListProvinces();
  }, [fetchListProvinces]);

  useEffect(() => {
    if (!provinceActive || !listProvinces.length) return;

    const province = listProvinces.find((item) => item.name === String(provinceActive));

    if (province) {
      setSelectedAddress((prev) => ({
        ...prev,
        province,
      }));

      fetchListWards(province.code);
    }
  }, [provinceActive, listProvinces, fetchListWards, setSelectedAddress]);

  useEffect(() => {
    if (!wardActive || !listWards.length) return;

    const ward = listWards.find((item) => item.name === String(wardActive));

    if (ward) {
      setSelectedAddress((prev) => ({
        ...prev,
        ward,
      }));
    }
  }, [wardActive, listWards, setSelectedAddress]);

  const handleSelectProvince = (item: Province) => {
    setSelectedAddress({
      province: item,
      ward: null,
    });
    fetchListWards(item.code);
  };

  const handleSelectWard = (item: Ward) => {
    setSelectedAddress((prev) => ({ ...prev, ward: item }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{'Select Address'}</Text>

      {/* Province Dropdown */}
      <View style={styles.section}>
        <Text style={styles.label}>{'Province / City'}</Text>

        <Dropdown
          style={styles.dropdown}
          containerStyle={styles.dropdownList}
          placeholderStyle={styles.placeholder}
          selectedTextStyle={styles.selectedText}
          itemTextStyle={styles.itemText}
          data={listProvinces}
          activeColor={'gray'}
          labelField="name"
          valueField="code"
          placeholder={'Select province'}
          value={selectedAddress.province?.code}
          onChange={handleSelectProvince}
        />
      </View>

      {/* Ward Dropdown */}
      <View style={styles.section}>
        <Text style={styles.label}>{'Ward / Commune'}</Text>

        <Dropdown
          style={[styles.dropdown, !selectedAddress.province?.code && styles.dropdownDisabled]}
          containerStyle={styles.dropdownList}
          placeholderStyle={styles.placeholder}
          selectedTextStyle={styles.selectedText}
          itemTextStyle={styles.itemText}
          data={listWards}
          activeColor={'gray'}
          labelField="name"
          valueField="code"
          placeholder={'Select ward'}
          value={selectedAddress.ward?.code}
          onChange={handleSelectWard}
        />
      </View>
    </View>
  );
};

export default memo(BottomSheetAddress);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 32,
    gap: 16,
    height: 300,
  },

  title: {
    color: colors.white,
    fontSize: 25,
    fontWeight: '700',
    textAlign: 'center',
  },

  subtitle: {
    color: colors.gray,
    fontSize: 13,
    marginTop: 5,
  },

  section: {
    gap: 5,
    paddingBottom: 10,
  },

  label: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },

  dropdown: {
    height: 50,
    borderWidth: 1,
    borderColor: '#454545',
    borderRadius: 10,
    paddingHorizontal: 14,
    backgroundColor: '#292929',
  },

  dropdownDisabled: {
    opacity: 0.5,
  },

  dropdownList: {
    backgroundColor: '#292929',
    borderRadius: 10,
    borderColor: '#454545',
    height: 100,
  },

  placeholder: {
    color: colors.gray,
    fontSize: 14,
  },

  selectedText: {
    color: colors.white,
    fontSize: 14,
  },

  itemText: {
    color: colors.white,
    fontSize: 14,
  },
});
