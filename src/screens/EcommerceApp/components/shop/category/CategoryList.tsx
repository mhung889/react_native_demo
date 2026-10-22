import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import CategoryItem from './CategoryItem';

interface CategoryListProps {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
}

const CategoryList = ({ categories, selectedCategory, setSelectedCategory }: CategoryListProps) => {
  const renderCate = ({ item }: { item: string }) => (
    <CategoryItem title={item} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
  );

  return (
    <FlatList
      data={categories}
      keyExtractor={(item) => item}
      renderItem={renderCate}
      horizontal
      showsHorizontalScrollIndicator={false}
      pagingEnabled
      contentContainerStyle={styles.contentCategory}
    />
  );
};

export default CategoryList;

const styles = StyleSheet.create({
  contentCategory: {
    // Giữ nguyên style contentCategory hiện tại của bạn
  },
});
