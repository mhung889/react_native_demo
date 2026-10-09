import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const RenderCategory = ({ item }: any) => {
  return (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.urlImage }} style={styles.itemImage} />
      <Text style={styles.itemText}>{item.label}</Text>
    </View>
  );
};

export default RenderCategory;

const styles = StyleSheet.create({
  // Style cho cục item trong danh sách thả xuống
  itemContainer: {
    padding: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemImage: {
    width: 40,
    height: 40,
    borderRadius: 6, // Bo góc nhẹ cho ảnh danh mục
    marginRight: 12,
    resizeMode: 'cover',
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
});
