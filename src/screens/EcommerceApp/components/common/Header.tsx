import React, { ReactNode } from 'react';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { colors } from '../../themes/color';
import { SCREENS } from '../../navigation/SCREENS';
import { capitalizeFirstLetter } from '../../utils';
import { commonStyle } from '../../themes/commonStyle';
import { ShopStackParamList } from '../../navigation/types';

type Props = {
  onBack?: () => void;
  title?: string;
  rightElement?: ReactNode;
  isShowleftElement?: boolean;
  isCategory?: boolean;
  isSearch?: boolean;
  heightContainer?: number;
  navigation?: NativeStackNavigationProp<ShopStackParamList>;
};

const Header = ({
  onBack,
  title,
  rightElement,
  isShowleftElement = false,
  isCategory = false,
  isSearch = false,
  heightContainer = 90,
  navigation,
}: Props) => {
  const handleNavigationToSearch = () => {
    navigation?.navigate(SCREENS.SEARCH_PRODUCT);
  };

  return (
    <View style={[styles.container, { height: heightContainer }]}>
      {isShowleftElement && (
        <Pressable onPress={onBack} hitSlop={12}>
          <Ionicons name="chevron-back" size={24} color={colors.white} />
        </Pressable>
      )}

      {isCategory ? (
        <Text style={styles.title}>{capitalizeFirstLetter(title || '')}</Text>
      ) : (
        <Text style={styles.title}>{title}</Text>
      )}

      {rightElement &&
        (isSearch ? <Pressable onPress={handleNavigationToSearch}>{rightElement}</Pressable> : rightElement)}
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
