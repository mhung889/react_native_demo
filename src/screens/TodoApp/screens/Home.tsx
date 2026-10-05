import React from 'react';
import SearchInput from '../components/SearchInput/SearchInput';
import AddInput from '../components/AddTodo/AddInput';
import TodoList from '../components/TodoList/TodoList';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { commonStyle } from '../theme/commonStyle';

export default function Home() {
  return (
    <SafeAreaView style={commonStyle.flex1}>
      <Header />
      <SearchInput />
      <TodoList />
      <AddInput />
    </SafeAreaView>
  );
}
