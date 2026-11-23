// import React, { memo, useCallback, useState } from 'react';
// import {
//   FlatList,
//   Image,
//   NativeScrollEvent,
//   NativeSyntheticEvent,
//   StyleSheet,
//   Text,
//   View,
//   useWindowDimensions,
// } from 'react-native';
// import Ball from '../test-xxxxx/Ball';

// type ProductImageSliderProps = {
//   images: string[];
//   product: ProductType;
// };

// const ProductImageSlider = ({ images, product }: ProductImageSliderProps) => {
//   const { width } = useWindowDimensions();
//   const [activeIndex, setActiveIndex] = useState(0);

//   const imageList = images.filter(Boolean);

//   const handleScroll = useCallback(
//     (event: NativeSyntheticEvent<NativeScrollEvent>) => {
//       const offsetX = event.nativeEvent.contentOffset.x;
//       const index = Math.round(offsetX / width);
//       setActiveIndex(index);
//     },
//     [width],
//   );

//   if (imageList.length === 0) {
//     return (
//       <View style={[styles.imageContainer, { width }]}>
//         <Text>{'Không có hình ảnh'}</Text>
//       </View>
//     );
//   }

//   return (
//     <View>
//       <FlatList
//         data={imageList}
//         keyExtractor={(item, index) => `${index}-${item}`}
//         horizontal
//         pagingEnabled
//         showsHorizontalScrollIndicator={false}
//         onMomentumScrollEnd={handleScroll}
//         getItemLayout={(_, index) => ({
//           length: width,
//           offset: width * index,
//           index,
//         })}
//         renderItem={({ item }) => (
//           <View style={[styles.imageContainer, { width }]}>
//             <Image source={{ uri: item }} style={styles.image} resizeMode="contain" />
//           </View>
//         )}
//       />

//       {/* Test ball */}
//       {/* <Ball /> */}

//       {/* Pagination dots */}
//       {imageList.length > 1 && (
//         <View style={styles.dotsContainer}>
//           {imageList.map((_, index) => (
//             <View key={index} style={[styles.dot, activeIndex === index && styles.activeDot]} />
//           ))}
//         </View>
//       )}
//     </View>
//   );
// };

// export default memo(ProductImageSlider);

// const styles = StyleSheet.create({
//   imageContainer: {
//     height: 320,
//     backgroundColor: '#F7F7F7',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   image: {
//     width: '100%',
//     height: '100%',
//   },

//   counter: {
//     position: 'absolute',
//     right: 16,
//     bottom: 35,
//     backgroundColor: 'rgba(0,0,0,0.6)',
//     paddingHorizontal: 10,
//     borderRadius: 14,
//   },

//   counterText: {
//     color: '#FFFFFF',
//     fontSize: 12,
//     fontWeight: '600',
//   },

//   dotsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     gap: 6,
//     marginTop: 12,
//   },

//   dot: {
//     width: 6,
//     height: 6,
//     borderRadius: 3,
//     backgroundColor: '#D0D0D0',
//   },

//   activeDot: {
//     width: 18,
//     backgroundColor: '#333333',
//   },
// });

/* 
Hiển thị số thứ tự ảnh ở góc phải phía dưới hoặc phía trên.
Ví dụ:
1 / 5
Khi vuốt sang ảnh thứ hai:
2 / 5
và khi ấn 2 lần vào ảnh thì tự động thêm sản phẩm vào yêu thích
*/

import React, { memo, useCallback, useRef, useState } from 'react';
import {
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import ProductImageItem from './ProductImageItem';
import { ProductType } from '../../types/product';
import { useFavoriteStore } from '../../store/favorite/favorite.store';

type ProductImageSliderProps = {
  images: string[];
  product: ProductType;
};

const ProductImageSlider = ({ images, product }: ProductImageSliderProps) => {
  // add Product to Favorite
  const addProductToFavorite = useFavoriteStore((state) => state.addFavoriteProduct);
  const isFavorite = useFavoriteStore((state) => state.isFavoriteProduct(product.id));
  const removeFavoriteProduct = useFavoriteStore((state) => state.removeFavoriteProduct);

  const { width } = useWindowDimensions();
  const [activeIndex, setActiveIndex] = useState(0);
  const imageList = images.filter(Boolean);

  const flatListRef = useRef<FlatList<string>>(null);

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetX = event.nativeEvent.contentOffset.x;
      const index = Math.round(offsetX / width);
      setActiveIndex(index);
    },
    [width],
  );

  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFavoriteProduct(product.id);
    } else {
      addProductToFavorite(product);
    }
  };

  // xu ly khi click anh duoi thi se thay doi thumbnail
  const handlePressThumbnail = (value: number) => {
    flatListRef.current?.scrollToIndex({
      index: value,
      animated: true,
    });
  };

  const renderItem = ({ item }: { item: string }) => {
    return <ProductImageItem image={item} width={width} handleToggleFavorite={handleToggleFavorite} />;
  };

  if (imageList.length === 0) {
    return (
      <View style={[styles.imageContainer, { width }]}>
        <Text>{'Không có hình ảnh'}</Text>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={imageList}
        ref={flatListRef}
        keyExtractor={(item, index) => `${index}-${item}`}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        renderItem={renderItem}
      />

      <View
        style={{
          flexDirection: 'row',
          gap: 10,
          justifyContent: 'flex-start',
          alignItems: 'center',
          marginVertical: 10,
        }}
      >
        {imageList.map((item, index) => {
          return (
            <Pressable
              key={index}
              style={[
                { width: 80, height: 80, backgroundColor: 'white' },
                { opacity: activeIndex === index ? 0.3 : 0.7 },
              ]}
              onPress={() => handlePressThumbnail(index)}
            >
              <Image source={{ uri: item }} style={{ width: '100%', height: '100%' }} />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default memo(ProductImageSlider);

const styles = StyleSheet.create({
  imageContainer: {
    height: 320,
    backgroundColor: '#F7F7F7',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
