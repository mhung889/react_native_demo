import React from 'react';
import { StyleSheet } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

import { colors } from '../../themes/color';
import SelecteSizeModal, { Size } from './SelecteSizeModal';

type Props = {
  bottomSheetRef: React.RefObject<BottomSheet | null>;
  snapPoints: (string | number)[];
  selectedSize: Size | null;
  onSelectSize: (size: Size) => void;
  onAddToCart: () => void;
};

const ProductBottomSheet = ({ bottomSheetRef, snapPoints, selectedSize, onSelectSize, onAddToCart }: Props) => {
  // const handleSheetChanges = useCallback((index: number) => {
  //   console.log('Bottom sheet index:', index);
  // }, []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      // onChange={handleSheetChanges}
      snapPoints={snapPoints}
      index={-1}
      enablePanDownToClose
      backgroundStyle={styles.background}
      handleIndicatorStyle={styles.handleIndicator}
    >
      <BottomSheetView style={styles.content}>
        <SelecteSizeModal selectedSize={selectedSize} onSelectSize={onSelectSize} onAddToCart={onAddToCart} />
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
