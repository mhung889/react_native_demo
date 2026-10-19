import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { colors } from '../../themes/color';
import { commonStyle } from '../../themes/commonStyle';

type Props = {
  title: string;
  onPress?: () => void;
};

const ProductInfoRow = ({ title, onPress }: Props) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <Ionicons name="chevron-forward" color={colors.whiteLogo} size={18} />
    </Pressable>
  );
};

export default ProductInfoRow;

const styles = StyleSheet.create({
  container: {
    minHeight: 48,
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: colors.white,
    fontFamily: commonStyle.fontFamily,
    fontSize: 16,
    fontWeight: '400',
  },
});
