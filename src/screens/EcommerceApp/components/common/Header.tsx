import React, { ReactNode } from 'react';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../../themes/color';
import { commonStyle } from '../../themes/commonStyle';
import { capitalizeFirstLetter } from '../../utils';

type Props = {
  onBack?: () => void;
  title?: string;
  rightElement?: ReactNode;
  isShowleftElement?: boolean;
  isCategory?: boolean;
};

const Header = ({ onBack, title, rightElement, isShowleftElement = false, isCategory = false }: Props) => {
  return (
    <View style={styles.container}>
      {isShowleftElement && (
        <Pressable onPress={onBack} hitSlop={12}>
          <Ionicons name="chevron-back" size={24} color={colors.white} />
        </Pressable>
      )}

      {isCategory ? (
        <Text style={styles.title}> {capitalizeFirstLetter(title || '')} </Text>
      ) : (
        <Text style={styles.title}> {title}</Text>
      )}

      {rightElement && <Pressable onPress={() => console.log('first')}>{rightElement}</Pressable>}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: 90,
    marginHorizontal: 16,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    backgroundColor: colors.background,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    color: colors.white,
    fontFamily: commonStyle.fontFamily,
    fontSize: 21,
    fontWeight: 'bold',
  },
});
