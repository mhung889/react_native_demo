import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const limit = 20;

export default function TestFlatList() {
  const [list, setLists] = useState([]);
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = async (pageNumber, refresh = false) => {
    if (loading || refreshing) return;

    try {
      if (refresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      // API DummyJSON tính phân trang dựa trên `skip` và `limit`
      let skip = (pageNumber - 1) * limit;

      const response = await fetch(
        `https://dummyjson.com/products?page=${pageNumber}&limit=${limit}&skip=${skip}`,
      );
      const data = await response.json();

      const newProducts = data.products || [];

      if (refresh) {
        // Nếu là làm mới (pull to refresh): Thay thế toàn bộ bằng dữ liệu trang 1
        setLists(newProducts);
        setPage(1);
      } else {
        // Nếu là cuộn xuống tải thêm: NỐI dữ liệu mới vào mảng cũ
        setLists(prev => [...prev, ...newProducts]);
      }

      //Kiểm tra nếu dữ liệu trả về ít hơn `limit` hoặc tổng số đã tải bằng `total` thì dừng lại
      if (newProducts.length < limit || list.length + newProducts.length >= data.total) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }

    } catch (error) {
      console.log("Error fetching data:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData(1);
  }, []);

  const handleLoadMore = () => {
    if (loading || refreshing || !hasMore) return;

    const nextPage = page + 1;
    setPage(nextPage);
    fetchData(nextPage);
  };

  const handleRefresh = () => {
    // Reset lại cờ để cho phép tải dữ liệu
    setHasMore(true);
    fetchData(1, true);
  };

  // Hiển thị vòng xoay loading ở cuối danh sách khi đang tải trang tiếp theo
  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  };

  console.log(list) 
  
  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          padding: 20,
          borderBottomWidth: 1,
          borderBottomColor: '#ddd',
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.title}</Text>
        <Text style={{ marginTop: 5, color: '#888' }}>\${item.price}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', padding: 15 }}>
        Danh sách sản phẩm
      </Text>

      <FlatList
        data={list}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        
        // Phân trang
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.2} 
        ListFooterComponent={renderFooter} 

        // Kéo để làm mới
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
    </SafeAreaView>
  );
}
