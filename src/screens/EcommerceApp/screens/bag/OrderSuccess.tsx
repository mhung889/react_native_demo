import React, { memo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { colors } from '../../themes/color';
import { SCREENS } from '../../navigation/SCREENS';
import { BagsIconSuccess } from '../../assets/icons';
import { RootStackParamList } from '../../navigation/types';

type OrderSuccessProps = NativeStackScreenProps<RootStackParamList, typeof SCREENS.ORDER_SUCCESS>;

const OrderSuccess = ({ navigation }: OrderSuccessProps) => {
  const handleNavigateContinuteShopping = () => {
    navigation.navigate(SCREENS.MAIN_TAB, {
      screen: SCREENS.SHOP_TAB,
      params: {
        screen: SCREENS.SHOP,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <BagsIconSuccess width={220} height={210} />
        <Text style={styles.successText}>{'Success!'}</Text>
        <View>
          <Text style={styles.successDescription}>{'Your order will be delivered soon.'}</Text>
          <Text style={styles.successDescription}>{'Thank you for choosing our app!'}</Text>
        </View>
      </View>

      <Pressable style={styles.button} onPress={handleNavigateContinuteShopping}>
        <Text style={styles.buttonText}>{'CONTINUE SHOPPING'}</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default memo(OrderSuccess);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successText: {
    fontSize: 38,
    fontWeight: '700',
    color: colors.white,
    marginTop: 30,
    marginBottom: 12,
  },

  successDescription: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.ordinaryText,
  },

  button: {
    backgroundColor: colors.primary,
    borderRadius: 28,
    marginHorizontal: 16,
  },
  buttonText: {
    color: colors.ordinaryText,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 20,
    paddingVertical: 14,
    textAlign: 'center',
  },
});
