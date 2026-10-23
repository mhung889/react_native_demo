import React from 'react';
import { FlatList, Pressable, StyleSheet, Text } from 'react-native';
import CategoryItem from './CategoryItem';
import { capitalizeFirstLetter } from '../../../utils';
import { commonStyle } from '../../../themes/commonStyle';
import { colors } from '../../../themes/color';

interface CategoryListProps {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
}

const CategoryList = ({ categories, selectedCategory, setSelectedCategory }: CategoryListProps) => {
  const categoryData = ['all', ...categories];

  const renderCateAll = (title: string) => (
    <Pressable onPress={() => setSelectedCategory(title)}>
      <Text
        style={[
          styles.text,
          {
            backgroundColor: selectedCategory.toLowerCase() === title.toLowerCase() ? colors.primary : colors.white,
            borderColor: selectedCategory.toLowerCase() === title.toLowerCase() ? colors.primary : colors.white,
            color: selectedCategory.toLowerCase() === title.toLowerCase() ? colors.white : colors.backgroundBottom,
          },
        ]}
      >
        {capitalizeFirstLetter(title)}
      </Text>
    </Pressable>
  );

  const renderCate = ({ item }: { item: string }) => {
    if (item.toLowerCase() === 'all') {
      return renderCateAll(item);
    }

    return <CategoryItem title={item} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />;
  };

  return (
    <FlatList
      data={categoryData}
      keyExtractor={(item) => item}
      renderItem={renderCate}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.contentCategory}
    />
  );
};

export default CategoryList;

const styles = StyleSheet.create({
  contentCategory: {
    // Giữ style hiện tại
  },

  text: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 8,
    fontSize: 15,
    fontFamily: commonStyle.fontFamily,
    fontWeight: '500',
  },
});
