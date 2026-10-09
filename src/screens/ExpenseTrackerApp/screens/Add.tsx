import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

import AddTransaction from '../components/Add/AddTransaction';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';

type TransactionType = 'expense' | 'income';

export default function Add() {
  const [type, setType] = useState<TransactionType>('expense');

  //ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // point view bottom-sheet
  const snapPoints = useMemo(() => ['45%', '70%'], []);

  //log để xem index snapPoint cho dễ, ko sử dụng đến chỉ để xem log
  const handleSheetChanges = useCallback((index: number) => {
    console.log('Bottom sheet index:', index);
  }, []);

  const handleOpen = (transactionType: TransactionType) => {
    setType(transactionType);
    bottomSheetRef.current?.snapToIndex(2);
  };

  const handleClose = () => {
    bottomSheetRef.current?.close();
  };

  // console.log(bottomSheetRef);

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.content}>
        <Text style={styles.title}>Add Transaction</Text>

        <View style={styles.buttons}>
          <Pressable
            style={[styles.button, styles.expenseButton]}
            onPress={() => handleOpen('expense')}
          >
            <Text style={styles.buttonText}> Expense</Text>
          </Pressable>

          <Pressable
            style={[styles.button, styles.incomeButton]}
            onPress={() => handleOpen('income')}
          >
            <Text style={styles.buttonText}> Income</Text>
          </Pressable>
        </View>
      </SafeAreaView>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        onChange={handleSheetChanges}
      >
        <BottomSheetView style={styles.sheetContent}>
          <AddTransaction type={type} onClose={handleClose} />
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8FAFC',
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 24,
  },

  buttons: {
    gap: 12,
    marginHorizontal: 50,
  },

  button: {
    padding: 10,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  expenseButton: {
    backgroundColor: colors.expense,
  },

  incomeButton: {
    backgroundColor: colors.income,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },

  sheetContent: {
    flex: 1,
  },
});
