import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import NewsCard from './NewsCard';
import { NewType } from '../../types/news';
import { commonStyle } from '../../theme/commonStyle';

//NewsAPI
const NEWS_API_KEY = 'e7a6e8095f04422c83990f92894ef6b6';
const PAGE_SIZE = 6;

export default function NewsList({ category, searchTerm }: { category: string; searchTerm: any }) {
  const [news, setNews] = useState<NewType[]>([]);
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // const fetchDataNews = async (pageNumber: number, isRefresh = false) => {
  //   try {
  //     if (isRefresh) {
  //       setRefreshing(true);
  //     } else {
  //       setLoading(true);
  //     }

  //     const response = await fetch(
  //       `https://gnews.io/api/v4/top-headlines?category=${category}&apikey=${API_KEY}&lang=${LANGUAGE}&max=${MAX}&page=${pageNumber}`,
  //     );

  //     const data = await response.json();
  //     const dataNews: NewType[] = data.articles || [];

  //     if (isRefresh) {
  //       setNews(dataNews);
  //     } else {
  //       setNews((prev) => [...prev, ...dataNews]);
  //     }

  //     // Nếu API trả về ít hơn MAX thì coi như hết data
  //     if (dataNews.length < MAX) {
  //       setHasMore(false);
  //     } else {
  //       setHasMore(true);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //     setRefreshing(false);
  //   }
  // };

  const renderItem = ({ item }: { item: NewType }) => {
    return <NewsCard item={item} category={category} />;
  };

  const fetchTopHeadlines = async (pageNumber: number) => {
    // console.log(pageNumber);
    const response = await fetch(
      // `https://gnews.io/api/v4/top-headlines?category=${category}&apikey=${GNEWS_API_KEY}&lang=vi&max=6&page=${pageNumber}`,
      `https://newsapi.org/v2/top-headlines?apiKey=${NEWS_API_KEY}&page=${pageNumber}&category=${category}&pageSize=${PAGE_SIZE}`,
    );

    const data = await response.json();

    return data.articles || [];
  };

  const fetchSearchNews = async (pageNumber: number) => {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${encodeURIComponent(
        searchTerm,
      )}&apiKey=${NEWS_API_KEY}&searchIn=title&pageSize=6&page=${pageNumber}`,
    );

    const data = await response.json();

    return data.articles || [];
  };

  const fetchNews = async (pageNumber: number, isRefresh = false) => {
    try {
      setLoading(!isRefresh);
      setRefreshing(isRefresh);

      let articles;

      if (searchTerm.trim()) {
        // Search API
        articles = await fetchSearchNews(pageNumber);
      } else {
        // Top Headlines API
        articles = await fetchTopHeadlines(pageNumber);
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
    fetchNews(1, true);
  }, [category, searchTerm]);

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
        refreshing={refreshing}
        // loading || skeleton
        ListFooterComponent={renderFooter}
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

// GNews
// import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import NewsCard from './NewsCard';
// import { NewType } from '../../types/news';
// import { commonStyle } from '../../theme/commonStyle';

// Gnews
// const API_KEY = '9f641297ceb3fe42c4159c39a9cab561';
// const LANGUAGE = 'vi';
// const MAX = 6;
// const COUNTRY = 'vn';

// export default function NewsList({ category, searchTerm }: { category: string; searchTerm: any }) {
//   const [news, setNews] = useState<NewType[]>([]);
//   const [page, setPage] = useState(1);

//   const [loading, setLoading] = useState(false);
//   const [refreshing, setRefreshing] = useState(false);
//   const [hasMore, setHasMore] = useState(true);

//   const fetchDataNews = async (pageNumber: number, isRefresh = false) => {
//     try {
//       if (isRefresh) {
//         setRefreshing(true);
//       } else {
//         setLoading(true);
//       }

//       const response = await fetch(
//         `https://gnews.io/api/v4/top-headlines?category=${category}&apikey=${API_KEY}&lang=${LANGUAGE}&max=${MAX}&page=${pageNumber}`,
//       );

//       const data = await response.json();
//       const dataNews: NewType[] = data.articles || [];

//       if (isRefresh) {
//         setNews(dataNews);
//       } else {
//         setNews((prev) => [...prev, ...dataNews]);
//       }

//       // Nếu API trả về ít hơn MAX thì coi như hết data
//       if (dataNews.length < MAX) {
//         setHasMore(false);
//       } else {
//         setHasMore(true);
//       }
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };

//   useEffect(() => {
//     fetchDataNews(page);
//   }, []);

//   const renderItem = ({ item }: { item: NewType }) => {
//     return <NewsCard item={item} category={category} />;
//   };

//   const handleLoadMore = () => {
//     if (loading || refreshing || !hasMore) return;

//     let nextPage = page + 1;
//     setPage(nextPage);
//     fetchDataNews(nextPage);
//   };

//   const handleRefresh = () => {
//     setPage(1);
//     fetchDataNews(1, true);
//   };

//   const renderFooter = () => {
//     if (!loading) return;
//     return <ActivityIndicator color="red" size="large" />;
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.item}>
//         <Text style={styles.text}> {'Top Headlines'} </Text>
//       </View>

//       <FlatList
//         style={commonStyle.flex1}
//         data={news}
//         keyExtractor={(item) => item.id}
//         renderItem={renderItem}
//         //load more
//         onEndReached={handleLoadMore}
//         onEndReachedThreshold={0.2}
//         //refresh
//         onRefresh={handleRefresh}
//         refreshing={refreshing}
//         // loading || skeleton
//         ListFooterComponent={renderFooter}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     marginHorizontal: 20,
//     marginTop: 20,
//     flex: 1,
//   },
//   item: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   text: {
//     fontSize: 17,
//     fontWeight: 'bold',
//   },
// });
