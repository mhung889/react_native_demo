import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';

const limit = 20;

export default function TestFlatList2() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchProduct = async (pageNumber, refreshing = false) => {
    if (loading || refreshing) return;
    try {
      if (refreshing) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      let skip = (pageNumber - 1) * limit;

      const response = await fetch(
        `https://dummyjson.com/products?page=${pageNumber}&limit=${limit}&skip=${skip}`,
      );
      const data = await response.json();
      const newProducts = data.products;

      if (refreshing) {
        setProducts(newProducts);
        setPage(1);
      } else {
        setProducts(prev => [...prev, ...newProducts]);
      }

      //Kiểm tra nếu dữ liệu trả về ít hơn `limit` hoặc tổng số đã tải bằng `total` thì dừng lại
      if (
        newProducts.length < limit ||
        products.length + newProducts.length >= data.total
      ) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    // setRefreshing(true);
    setHasMore(true);
    fetchProduct(1, true);
  };

  const handleLoadMore = () => {
    if (loading || refreshing || !hasMore) return;

    const nextPage = page + 1;
    setPage(nextPage);
    fetchProduct(nextPage);
  };

  useEffect(() => {
    fetchProduct(1);
  }, []);

  console.log(products);

  const renderItem = ({ item }) => {
    return (
      <View style={{ marginVertical: 12 }}>
        <Text> {item.title} </Text>
        <Text> {item.price} </Text>
      </View>
    );
  };

  const renderFooter = () => {
    if (!loading) return;
    return <ActivityIndicator color="red" size="large" />;
  };

  return (
    <View>
      <Text>TestFlatList2</Text>

      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        // onRefresh
        onRefresh={handleRefresh}
        refreshing={refreshing}
        //load more
        ListFooterComponent={renderFooter}
        onEndReachedThreshold={0.2}
        onEndReached={handleLoadMore}
      />
    </View>
  );
}

// import { View, Text, FlatList, ActivityIndicator } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import { SafeAreaView } from 'react-native-safe-area-context';

// const limit = 20;
// const itemsPerPage = 20;

// export default function TestFlatList2() {
//   const [products, setProducts] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);

//   const [loading, setLoading] = useState(false);

//   const fetchProduct = async page => {
//     if (loading) return;
//     try {
//       //   let skip = (pageNumber - 1) * limit;

//       const response = await fetch(`https://dummyjson.com/products`);
//       const data = await response.json();
//       const newProducts = data.products;

//       //   2*20 = 40,
//       //   40 - 20 = 20
//       console.log(newProducts.length);

//       const indexOfLast = page * itemsPerPage;
//       const indexOfFirst = indexOfLast - itemsPerPage;
//       const currentData = newProducts.slice(indexOfFirst, indexOfLast);
//       setProducts(currentData);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProduct(currentPage);
//   }, [currentPage]);

//   console.log(products);

//   const renderItem = ({ item }) => {
//     return (
//       <View style={{ marginVertical: 12 }}>
//         <Text> {item.title} </Text>
//         <Text> {item.price} </Text>
//       </View>
//     );
//   };

//   const renderHeader = () => {
//     if (!loading) return;
//     return <ActivityIndicator color="red" size="large" />;
//   };

//   return (
//     <SafeAreaView>
//       <Text>TestFlatList2</Text>

//       <FlatList
//         data={products}
//         keyExtractor={item => item.id.toString()}
//         renderItem={renderItem}
//         ListHeaderComponent={renderHeader}
//       />

//       <View
//         style={{
//           marginBottom: 20,
//           flexDirection: 'row',
//           gap: 10,
//           justifyContent: 'center',
//         }}
//       >
//         <Text onPress={() => setCurrentPage(1)}> 1 </Text>
//         <Text onPress={() => setCurrentPage(2)}> 2 </Text>
//       </View>
//     </SafeAreaView>
//   );
// }
