import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { colors } from '../../themes/color';
import { commonStyle } from '../../themes/commonStyle';
import { ProductType } from '../../types/product';
import { useFavoriteStore } from '../../store/favorite.store';
import { useShallow } from 'zustand/react/shallow';

type Props = {
  selectedSize?: string | null;
  onSelectSize?: () => void;
  product: ProductType;
};

const ProductOptions = ({ selectedSize, onSelectSize, product }: Props) => {
  // use zustand
  const { addFavoriteProduct, removeFavoriteProduct, isFavorite } =
    useFavoriteStore(
      useShallow(state => ({
        addFavoriteProduct: state.addFavoriteProduct,
        removeFavoriteProduct: state.removeFavoriteProduct,
        isFavorite: state.isFavoriteProduct(product.id),
      })),
    );

  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFavoriteProduct(product.id);
    } else {
      addFavoriteProduct(product);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={onSelectSize} style={styles.sizeButton}>
        <Text style={styles.sizeText}>
          {selectedSize ? `Size: ${selectedSize}` : 'Select size'}
        </Text>

        <Ionicons name="chevron-down" size={20} color={colors.gray} />
      </Pressable>

      <Pressable
        style={styles.favoriteButton}
        hitSlop={8}
        onPress={handleToggleFavorite}
      >
        <Ionicons
          name={isFavorite ? 'heart' : 'heart-outline'}
          size={21}
          color={isFavorite ? colors.primary : colors.gray}
        />
      </Pressable>
    </View>
  );
};

export default ProductOptions;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  sizeButton: {
    flex: 1,
    minHeight: 52,
    paddingHorizontal: 18,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.gray,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sizeText: {
    color: colors.white,
    fontFamily: commonStyle.fontFamily,
    fontSize: 16,
    fontWeight: '500',
  },
  favoriteButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.dark,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
  },
});
