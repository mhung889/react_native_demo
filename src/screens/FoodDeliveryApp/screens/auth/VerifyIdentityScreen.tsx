import React, { useCallback, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';

import { colors } from '../../theme/colors';
import HeaderAuth from '../../components/auth/header/HeaderAuth';
import ButtonHeader from '../../components/common/ButtonHeader';
import AppText from '../../components/common/AppText';

const CELL_COUNT = 4;

const VerifyIdentityScreen = () => {
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const handleNavigateVerifyIdentity = useCallback(() => {}, []);

  const handleSendAgain = useCallback(() => {
    console.log('first');
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderAuth title="Verify your identity" description="We have just sent a code to ..." />

      <View style={styles.main}>
        <CodeField
          ref={ref}
          {...props}
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
            <Text
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}
            >
              {symbol || (isFocused && <Cursor />)}
            </Text>
          )}
        />

        <ButtonHeader handleNavigate={handleNavigateVerifyIdentity} title="Next" marginTop={40} />

        <Pressable style={styles.buttonAgain} onPress={handleSendAgain}>
          <AppText style={styles.againText}>{'Send again'}</AppText>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default VerifyIdentityScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
  },
  codeFieldRoot: {
    // marginTop: 20,
  },
  cell: {
    width: 65,
    height: 65,
    fontSize: 30,
    borderBottomWidth: 2,
    textAlign: 'center',
  },
  focusCell: {
    borderColor: colors['Red-400'],
  },

  //
  main: {
    marginHorizontal: 35,
    marginTop: 24,
  },

  buttonAgain: {
    marginVertical: 16,
  },

  againText: {
    fontSize: 18,
    lineHeight: 20,
    textAlign: 'center',
    fontWeight: '500',
    color: colors['Neutral-800'],
    paddingVertical: 12,
  },
});
