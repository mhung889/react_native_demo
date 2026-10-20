import React from 'react';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../../themes/color';
import { commonStyle } from '../../themes/commonStyle';

type Props = {
  onBack?: () => void;
  onShare?: () => void;
};

const ProductDetailHeader = ({ onBack, onShare }: Props) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={onBack} hitSlop={12} style={styles.action}>
        <Ionicons name="chevron-back" size={24} color={colors.white} />
      </Pressable>

      <Text style={styles.title}>Product details</Text>

      <Pressable onPress={onShare} hitSlop={12} style={styles.action}>
        <Ionicons name="share-social-outline" size={22} color={colors.white} />
      </Pressable>
    </View>
  );
};

export default ProductDetailHeader;

const styles = StyleSheet.create({
  container: {
    height: 90,
    paddingHorizontal: 18,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    backgroundColor: colors.background,
  },
  action: {
    width: 36,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    color: colors.white,
    fontFamily: commonStyle.fontFamily,
    fontSize: 18,
    fontWeight: '600',
  },
});
