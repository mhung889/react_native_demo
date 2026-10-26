import { Pressable, StyleSheet, Text } from 'react-native';
import React, { memo } from 'react';
import { colors } from '../../../themes/color';
import { commonStyle } from '../../../themes/commonStyle';
import { capitalizeFirstLetter } from '../../../utils';

type CategoryItemProps = {
  title: string;
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
};

const CategoryItem = ({ title, selectedCategory, setSelectedCategory }: CategoryItemProps) => {
  return (
    <Pressable onPress={() => setSelectedCategory(title)}>
      <Text
        style={[
          styles.text,
          {
            backgroundColor: selectedCategory === title ? colors.primary : colors.white,
            borderColor: selectedCategory === title ? colors.primary : colors.white,
            color: selectedCategory === title ? colors.white : colors.backgroundBottom,
          },
        ]}
      >
        {capitalizeFirstLetter(title)}
      </Text>
    </Pressable>
  );
};

export default memo(CategoryItem);

const styles = StyleSheet.create({
  text: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 8,
    fontSize: 15,
    fontFamily: commonStyle.fontFamily,
    fontWeight: '500',
  },
});
