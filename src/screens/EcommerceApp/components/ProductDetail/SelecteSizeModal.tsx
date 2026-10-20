import React, { useState } from 'react';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../../themes/color';
import AddToCartButton from './AddToCartButton';
import { commonStyle } from '../../themes/commonStyle';

export type Size = 'S' | 'M' | 'L';

const DATA_SIZES: Size[] = ['S', 'M', 'L'];

type Props = {
  selectedSize: Size | null;
  onSelectSize: (size: Size) => void;
  onAddToCart?: () => void;
};

const SelecteSizeModal = ({ selectedSize, onSelectSize, onAddToCart }: Props) => {
  const [sizeInfo, setSizeInfo] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{'Select Size'}</Text>

      <View style={styles.sizeContainer}>
        {DATA_SIZES.map(size => {
          const selected = selectedSize === size;

          return (
            <Pressable
              key={size}
              onPress={() => onSelectSize(size)}
              style={[styles.sizeButton, selected && styles.selectedSizeButton]}
            >
              <Text style={[styles.sizeText, selected && styles.selectedSizeText]}>{size}</Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.divider} />

      <View style={styles.sizeInfo}>
        <Text style={styles.sizeInfoText}>Size info</Text>
        <Pressable onPress={() => setSizeInfo(!sizeInfo)}>
          <Ionicons name="chevron-forward" size={20} color={colors.white} />
        </Pressable>
      </View>

      {sizeInfo && (
        <View style={styles.sizeInfoContent}>
          <Text style={styles.dimensionText}>{'S: ≤ 1,000 units³'}</Text>
          <Text style={styles.dimensionText}>{'M: 1,001 - 5,000 units³'}</Text>
          <Text style={styles.dimensionText}>{'L: > 5,000 units³'}</Text>
        </View>
      )}

      <View style={styles.divider} />

      <View style={styles.buttonContainer}>
        <AddToCartButton disabled={!selectedSize} onPress={onAddToCart} />
      </View>
    </View>
  );
};

export default SelecteSizeModal;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    fontFamily: commonStyle.fontFamily,
    color: colors.white,
    fontSize: 23,
    fontWeight: 'bold',
    marginTop: 8,
  },
  sizeContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 28,
    marginBottom: 24,
  },
  sizeButton: {
    flex: 1,
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 10,
  },
  selectedSizeButton: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  sizeText: {
    fontSize: 20,
    fontFamily: commonStyle.fontFamily,
    color: colors.white,
    fontWeight: '500',
  },
  selectedSizeText: {
    color: colors.ordinaryText,
    fontWeight: 'bold',
  },
  divider: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.gray,
    marginHorizontal: -16,
  },
  sizeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 52,
    paddingHorizontal: 10,
  },
  sizeInfoText: {
    color: colors.white,
    fontFamily: commonStyle.fontFamily,
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 12,
  },

  //infor size
  sizeInfoContent: {
    paddingHorizontal: 10,
    paddingBottom: 16,
    gap: 8,
  },

  dimensionText: {
    color: colors.white,
    fontFamily: commonStyle.fontFamily,
    fontSize: 14,
  },
});
