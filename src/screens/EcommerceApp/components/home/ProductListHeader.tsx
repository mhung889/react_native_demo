import React, { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../../themes/color';
import { commonStyle } from '../../themes/commonStyle';

type ProductListHeaderProps = {
  name: string;
  title?: string;
  rightElement?: ReactNode;
};

const ProductListHeader = ({ name, title, rightElement }: ProductListHeaderProps) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{name}</Text>
        {title && <Text style={styles.subtitle}>{title}</Text>}
      </View>
      {rightElement}
    </View>
  );
};

export default ProductListHeader;

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: colors.white,
    fontFamily: commonStyle.fontFamily,
    fontSize: 30,
    fontWeight: 'bold',
  },
  subtitle: {
    color: colors.white,
    fontFamily: commonStyle.fontFamily,
  },
});
