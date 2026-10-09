import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import NewsCard from './NewsCard';
import { NewType } from '../../types/news';
import { commonStyle } from '../../theme/commonStyle';
import { getDataTopHeadlines } from '../../services/topHeadlineService';
import { getDataSearch } from '../../services/searchService';

export default function NewsList({
  category,
  searchTerm,
  resetSignal,
}: {
  category: string;
  searchTerm: any;
  resetSignal: number;
}) {
  const [news, setNews] = useState<NewType[]>([]);
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  const flatListRef = useRef<FlatList<NewType>>(null);

  console.log(flatListRef);

  const renderItem = useCallback(
    ({ item }: { item: NewType }) => {
      return <NewsCard item={item} category={category} />;
    },
    [category],
  );

  const fetchNews = async (pageNumber: number, isRefresh = false) => {
    try {
      setLoading(!isRefresh);
      setRefreshing(isRefresh);

      let articles;

      if (searchTerm.trim()) {
        articles = await getDataSearch(pageNumber, searchTerm);
      } else {
        articles = await getDataTopHeadlines(pageNumber, category);
      }

      if (isRefresh) {
        setNews(articles);
      } else {
        setNews((prev) => [...prev, ...articles]);
      }

      if (articles.length < 6) {
        setHasMore(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    setPage(1);
    setHasMore(true);
    // setNews([]);

    // flatListRef.current?.scrollToOffset({
    //   offset: 0,
    //   animated: false,
    // });
    fetchNews(1, true);
  }, [category, searchTerm]);

  useEffect(() => {
    flatListRef.current?.scrollToOffset({
      offset: 0,
      animated: false,
    });
  }, [resetSignal]);

  const handleLoadMore = () => {
    if (loading || refreshing || !hasMore) return;

    let nextPage = page + 1;
    setPage(nextPage);
    fetchNews(nextPage);
  };

  const handleRefresh = () => {
    setPage(1);
    fetchNews(1, true);
  };

  const renderFooter = () => {
    if (!loading) return;
    return <ActivityIndicator color="red" size="large" />;
  };

  // console.log(news);

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text style={styles.text}> {'Top Headlines'} </Text>
      </View>

      <FlatList
        style={commonStyle.flex1}
        data={news}
        keyExtractor={(item) => item.url}
        renderItem={renderItem}
        //load more
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.2}
        //refresh
        onRefresh={handleRefresh}
        refreshing={refreshing} // mình có thể cho nó bằng false nhưng khi load dữ liệu thì không có loading
        // loading || skeleton
        ListFooterComponent={renderFooter}
        // ref
        ref={flatListRef}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 20,
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 17,
    fontWeight: 'bold',
  },
});
