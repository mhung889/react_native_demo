import { Text, FlatList, StyleSheet } from 'react-native';
import React from 'react';
import { useBookMark } from '../context/BookmarkContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NewType } from '../types/news';
import BookMarkCard from '../components/BookMarkScreen/BookMarkCard';

export default function BookMark() {
  const { bookMarks } = useBookMark();

  const renderItem = ({ item }: { item: NewType }) => {
    return <BookMarkCard item={item} />;
  };

  console.log(bookMarks);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Bookmarks</Text>

      <FlatList
        data={bookMarks}
        keyExtractor={(item) => item.url}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  header: {
    fontSize: 24,
    fontWeight: '700',
    paddingHorizontal: 16,
    paddingVertical: 16,
    color: '#222',
  },

  list: {
    paddingBottom: 20,
  },
});
