import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { colors } from '../../themes/color';
import { commonStyle } from '../../themes/commonStyle';

type ProfileMenuItemProps = {
  title: string;
  subtitle: string;
  onPress?: () => void;
  isItemDivider?: boolean;
  isShowIconRight?: boolean;
};

const ProfileMenuItem = ({
  title,
  subtitle,
  onPress,
  isItemDivider = false,
  isShowIconRight = false,
}: ProfileMenuItemProps) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.item}>
        <View style={styles.itemContent}>
          <Text style={styles.itemTitle}>{title}</Text>
          <Text style={styles.itemSubtitle}>{subtitle}</Text>
        </View>
        {isShowIconRight && <Ionicons name="chevron-forward" size={24} color={colors.gray} />}
      </View>
      {isItemDivider && <View style={styles.itemDivider} />}
    </Pressable>
  );
};

export default ProfileMenuItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
  },

  itemContent: {
    flex: 1,
    justifyContent: 'center',
    gap: 5,
    paddingVertical: 18,
  },

  itemTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.white,
    fontFamily: commonStyle.fontFamily,
  },

  itemSubtitle: {
    fontSize: 14,
    color: colors.gray,
    fontWeight: '400',
    fontFamily: commonStyle.fontFamily,
  },

  itemDivider: {
    height: 0.5,
    backgroundColor: colors.gray,
    opacity: 0.2,
  },
});
