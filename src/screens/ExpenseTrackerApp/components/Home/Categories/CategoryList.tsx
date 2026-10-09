import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const CategoryList = () => {
  return (
    <View style={styles.categoryContainer}>
      <View style={styles.commonHeader}>
        <Text style={styles.commonText}> Spending by Category </Text>
        <Text> See all </Text>
      </View>

      <View style={styles.categoryItemContainer}>
        {/* cate 1 */}
        <View style={styles.categoryItem}>
          <Image
            source={{
              uri: 'https://static.vecteezy.com/system/resources/thumbnails/046/032/696/small/japanese-food-3d-icon-png.png',
            }}
            style={styles.categoryImage}
            resizeMode="cover"
          />
          <Text style={styles.categoryName}> Food </Text>
          <Text style={styles.categoryPrice}> $999 </Text>
        </View>

        {/* cate 2 */}
        <View style={styles.categoryItem}>
          <Image
            source={{
              uri: 'https://static.vecteezy.com/system/resources/thumbnails/046/032/696/small/japanese-food-3d-icon-png.png',
            }}
            style={styles.categoryImage}
            resizeMode="cover"
          />
          <Text style={styles.categoryName}> Rent </Text>
          <Text style={styles.categoryPrice}> $123 </Text>
        </View>

        {/* cate 3 */}
        <View style={styles.categoryItem}>
          <Image
            source={{
              uri: 'https://static.vecteezy.com/system/resources/thumbnails/046/032/696/small/japanese-food-3d-icon-png.png',
            }}
            style={styles.categoryImage}
            resizeMode="cover"
          />
          <Text style={styles.categoryName}> Transport </Text>
          <Text style={styles.categoryPrice}> $666 </Text>
        </View>
      </View>
    </View>
  );
};

export default CategoryList;

const styles = StyleSheet.create({
  //category
  categoryContainer: {
    marginVertical: 10,
  },

  //category Item
  categoryItemContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  categoryItem: {
    alignItems: 'center',
  },
  categoryImage: {
    width: 95,
    height: 95,
  },
  categoryName: {
    marginBottom: 2,
  },
  categoryPrice: {
    fontWeight: '600',
  },

  commonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  commonText: {
    fontSize: 18,
    fontWeight: 'semibold',
  },
});
