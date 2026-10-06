import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/HomeScreen/Header';
import { commonStyle } from '../theme/commonStyle';
import SearchButton from '../components/HomeScreen/SearchButton';
import Categories from '../components/HomeScreen/Categories';
import NewsList from '../components/HomeScreen/NewsList';
import { useDebounce } from 'use-debounce';

export default function Home() {
  const [category, setCategory] = useState<string>('Science');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [debouncedSearch] = useDebounce(searchTerm, 500);

  return (
    <SafeAreaView style={commonStyle.flex1}>
      <Header />

      <SearchButton searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <Categories category={category} setCategory={setCategory} />

      <NewsList category={category} searchTerm={debouncedSearch} />
    </SafeAreaView>
  );
}
