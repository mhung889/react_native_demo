import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetView } from '@gorhom/bottom-sheet';

import { colors } from '../../themes/color';
import SelecteSizeModal, { Size } from './SelecteSizeModal';

type Props = {
  bottomSheetRef: React.RefObject<BottomSheet | null>;
  selectedSize: Size | null;
  onSelectSize: (size: Size) => void;
  onAddToCart: () => void;
  quantityProduct: number;
  setQuantityProduct: React.Dispatch<React.SetStateAction<number>>;
};

const ProductBottomSheet = ({
  bottomSheetRef,
  selectedSize,
  onSelectSize,
  onAddToCart,
  quantityProduct,
  setQuantityProduct,
}: Props) => {
  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} opacity={0.45} />
    ),
    [],
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      backgroundStyle={styles.background}
      handleIndicatorStyle={styles.handleIndicator}
    >
      <BottomSheetView style={styles.content}>
        <SelecteSizeModal
          selectedSize={selectedSize}
          onSelectSize={onSelectSize}
          onAddToCart={onAddToCart}
          quantityProduct={quantityProduct}
          setQuantityProduct={setQuantityProduct}
        />
      </BottomSheetView>
    </BottomSheet>
  );
};

export default ProductBottomSheet;

const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    backgroundColor: colors.background,
  },
  handleIndicator: {
    backgroundColor: colors.white,
  },
});
