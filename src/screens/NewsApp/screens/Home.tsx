import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/HomeScreen/Header';
import { commonStyle } from '../theme/commonStyle';
import SearchInput from '../components/HomeScreen/SearchInput';
import Categories from '../components/HomeScreen/Categories';
import NewsList from '../components/HomeScreen/NewsList';
import { useDebounce } from 'use-debounce';

export default function Home() {
  const [category, setCategory] = useState<string>('Science');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [debouncedSearch] = useDebounce(searchTerm, 500);

  const [resetSignal, setResetSignal] = useState(0);

  const handleCategoryPress = (nextCategory: string) => {
    if (nextCategory === category) {
      setResetSignal((prev) => prev + 1);
      return;
    }
    setCategory(nextCategory);
  };

  return (
    <SafeAreaView style={commonStyle.flex1}>
      <Header />

      <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <Categories
        category={category}
        setCategory={setCategory}
        handleCategoryPress={handleCategoryPress}
      />

      <NewsList category={category} searchTerm={debouncedSearch} resetSignal={resetSignal} />
    </SafeAreaView>
  );
}
