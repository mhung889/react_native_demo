import React, { memo, useState } from 'react';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../../themes/color';
import AddToCartButton from './AddToCartButton';
import { commonStyle } from '../../themes/commonStyle';
import { Lucide } from '@react-native-vector-icons/lucide/static';

export type Size = 'S' | 'M' | 'L';

export const DATA_SIZES: Size[] = ['S', 'M', 'L'];

type Props = {
  selectedSize: Size | null;
  onSelectSize: (size: Size) => void;
  onAddToCart?: () => void;
  quantityProduct: number;
  setQuantityProduct: React.Dispatch<React.SetStateAction<number>>;
};

const SelecteSizeModal = ({ selectedSize, onSelectSize, onAddToCart, quantityProduct, setQuantityProduct }: Props) => {
  const [sizeInfo, setSizeInfo] = useState(false);

  const handleDecrementQuantity = () => {
    setQuantityProduct((prev) => {
      if (prev === 1) {
        return prev;
      }
      return prev - 1;
    });
  };

  const handleIncrementQuantity = () => {
    setQuantityProduct((prev) => {
      if (prev === 20) {
        return prev;
      }
      return prev + 1;
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{'Select Size'}</Text>

      <View style={styles.sizeContainer}>
        {DATA_SIZES.map((size) => {
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
        <Text style={styles.sizeInfoText}>{'Size info'}</Text>
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

      <View style={styles.quantityContainer}>
        <Text style={styles.quantityLabel}>{'Quantity'}</Text>

        <View style={styles.quantityControl}>
          <Pressable style={styles.quantityButton} onPress={handleDecrementQuantity}>
            <Lucide name="minus" color={colors.white} size={20} />
          </Pressable>

          <Text style={styles.quantityText}>{quantityProduct}</Text>

          <Pressable style={styles.quantityButton} onPress={handleIncrementQuantity}>
            <Lucide name="plus" color={colors.gray} size={20} />
          </Pressable>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <AddToCartButton onPress={onAddToCart} />
      </View>
    </View>
  );
};

export default memo(SelecteSizeModal);

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
    borderTopWidth: 0.6,
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
    marginBottom: 6,
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

  // quantity
  quantityLabel: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '400',
  },

  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // gap: 10,
    marginHorizontal: 12,
    marginVertical: 12,
  },

  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },

  quantityButton: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: colors.darkColor,
    borderRadius: 15,
    backgroundColor: colors.darkColor,
    justifyContent: 'center',
    alignItems: 'center',

    // Android
    elevation: 5,

    // iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },

  quantity: {
    color: colors.white,
    fontSize: 16,
    paddingHorizontal: 4,
  },

  quantityText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '300',
    textAlign: 'center',
    minWidth: 20,
  },
});
