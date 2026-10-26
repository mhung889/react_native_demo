import React, { memo, useCallback, useState } from 'react';
import {
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';

type ProductImageSliderProps = {
  images: string[];
};

const ProductImageSlider = ({ images }: ProductImageSliderProps) => {
  const { width } = useWindowDimensions();
  const [activeIndex, setActiveIndex] = useState(0);

  const imageList = images.filter(Boolean);

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetX = event.nativeEvent.contentOffset.x;
      const index = Math.round(offsetX / width);
      setActiveIndex(index);
    },
    [width],
  );

  if (imageList.length === 0) {
    return (
      <View style={[styles.imageContainer, { width }]}>
        <Text>Không có hình ảnh</Text>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={imageList}
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
        renderItem={({ item }) => (
          <View style={[styles.imageContainer, { width }]}>
            <Image source={{ uri: item }} style={styles.image} resizeMode="contain" />
          </View>
        )}
      />

      {/* Pagination dots */}
      {imageList.length > 1 && (
        <View style={styles.dotsContainer}>
          {imageList.map((_, index) => (
            <View key={index} style={[styles.dot, activeIndex === index && styles.activeDot]} />
          ))}
        </View>
      )}
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

  image: {
    width: '100%',
    height: '100%',
  },

  counter: {
    position: 'absolute',
    right: 16,
    bottom: 35,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 10,
    borderRadius: 14,
  },

  counterText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },

  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginTop: 12,
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#D0D0D0',
  },

  activeDot: {
    width: 18,
    backgroundColor: '#333333',
  },
});
