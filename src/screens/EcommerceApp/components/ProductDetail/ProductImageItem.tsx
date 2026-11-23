/* Co ban */
// import { scheduleOnRN } from 'react-native-worklets';
// import React, { memo, useCallback, useState } from 'react';
// import { Ionicons } from '@react-native-vector-icons/ionicons';
// import { Image, View, StyleSheet, Pressable } from 'react-native';
// import { GestureDetector, useTapGesture } from 'react-native-gesture-handler';

// import { colors } from '../../themes/color';

// type ProductImageItemProps = {
//   image: string;
//   width: number;
//   handleToggleFavorite: () => void;
// };

// const ProductImageItem = ({ image, width, handleToggleFavorite }: ProductImageItemProps) => {
//   const [isVisibleHeart, setIsVisibleHeart] = useState(false);

//   const doubleTap = useTapGesture({
//     numberOfTaps: 2,
//     onActivate: () => {
//       scheduleOnRN(setIsVisibleHeart, true);
//     },
//   });

//   const handlePressHeart = useCallback(() => {
//     handleToggleFavorite();
//     setIsVisibleHeart(false);
//   }, [handleToggleFavorite]);

//   return (
//     <View style={[styles.imageContainer, { width }]}>
//       <GestureDetector gesture={doubleTap}>
//         <View style={StyleSheet.absoluteFill}>
//           <Image source={{ uri: image }} style={styles.image} resizeMode="contain" />
//         </View>
//       </GestureDetector>

//       {isVisibleHeart && (
//         <View style={styles.heartContainer} pointerEvents="box-none">
//           <Pressable onPress={handlePressHeart}>
//             <Ionicons name="heart" size={100} color={colors.primary} />
//           </Pressable>
//         </View>
//       )}
//     </View>
//   );
// };

// export default memo(ProductImageItem);

// const styles = StyleSheet.create({
//   imageContainer: {
//     height: 320,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F7F7F7',
//     position: 'relative',
//   },

//   image: {
//     width: '100%',
//     height: '100%',
//   },

//   heartContainer: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     justifyContent: 'center',
//     alignItems: 'center',
//     zIndex: 10,
//   },
// });

/* Zoom-in  */
import React, { memo, useCallback, useState } from 'react';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { GestureDetector, usePinchGesture } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, clamp } from 'react-native-reanimated';
import { Image, View, StyleSheet, Pressable, Modal, StatusBar, useWindowDimensions } from 'react-native';

import { colors } from '../../themes/color';

type ProductImageItemProps = {
  image: string;
  width: number;
  handleToggleFavorite: () => void;
};

const ProductImageItem = ({ image, width, handleToggleFavorite }: ProductImageItemProps) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  const scale = useSharedValue(1);
  const startScale = useSharedValue(0);

  // Pinch to zoom
  const pinchGesture = usePinchGesture({
    onActivate: () => {
      startScale.value = scale.value;
    },
    onUpdate: (event) => {
      scale.value = clamp(startScale.value * event.scale, 0.5, Math.min(width / 100, screenHeight / 100));
    },
  });

  // Animated image style
  const animatedImageStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handleOpenFullScreen = useCallback(() => {
    scale.value = 1;
    setIsFullScreen(true);
  }, [scale]);

  const handleCloseFullScreen = useCallback(() => {
    scale.value = withTiming(1);
    setIsFullScreen(false);
  }, [scale]);

  return (
    <>
      {/* Product Image */}
      <View style={[styles.imageContainer, { width }]}>
        <Pressable style={StyleSheet.absoluteFill} onPress={handleOpenFullScreen}>
          <Image source={{ uri: image }} style={styles.image} resizeMode="contain" />
        </Pressable>
      </View>

      {/* Full Screen Modal */}
      <Modal
        visible={isFullScreen}
        transparent
        animationType="fade"
        statusBarTranslucent
        // onRequestClose={handleCloseFullScreen}
      >
        <View style={styles.fullScreenContainer}>
          <StatusBar hidden />

          {/* Close Button */}
          <Pressable style={styles.closeButton} onPress={handleCloseFullScreen}>
            <Ionicons name="close" size={30} color={colors.dark} />
          </Pressable>

          {/* Pinch to Zoom */}
          <GestureDetector gesture={pinchGesture}>
            <Animated.View style={styles.fullScreenImageWrapper}>
              <Animated.Image
                source={{ uri: image }}
                style={[
                  {
                    width: screenWidth,
                    height: screenHeight,
                  },
                  animatedImageStyle,
                ]}
                resizeMode="contain"
              />
            </Animated.View>
          </GestureDetector>
        </View>
      </Modal>
    </>
  );
};

export default memo(ProductImageItem);

const styles = StyleSheet.create({
  imageContainer: {
    height: 320,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    position: 'relative',
  },

  image: {
    width: '100%',
    height: '100%',
  },

  fullScreenContainer: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    justifyContent: 'center',
    alignItems: 'center',
  },

  fullScreenImageWrapper: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },

  closeButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
    padding: 10,
  },
});
