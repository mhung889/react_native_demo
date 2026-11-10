import React, { useEffect } from 'react';
import { Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type SwitchProps = {
  value: boolean;
  onValueChange: (value: boolean) => void;
  style?: StyleProp<ViewStyle>;
  duration?: number;
  trackColor?: {
    on: string;
    off: string;
  };
  thumbColor?: string;
};

const SwitchButton = ({
  value,
  onValueChange,
  style,
  duration = 300,
  trackColor = {
    on: '#82cab2',
    off: '#fa7f7c',
  },
  thumbColor = '#FFFFFF',
}: SwitchProps) => {
  const progress = useSharedValue(value ? 1 : 0);
  const height = useSharedValue(0);
  const width = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(value ? 1 : 0, { duration });
  }, [value, duration, progress]);

  const trackAnimatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(progress.value, [0, 1], [trackColor.off, trackColor.on]),
      borderRadius: height.value / 2,
    };
  });

  const thumbAnimatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(progress.value, [0, 1], [0, Math.max(0, width.value - height.value)]);

    return {
      transform: [{ translateX }],
      borderRadius: height.value / 2,
    };
  });

  return (
    <Pressable onPress={() => onValueChange(!value)} accessibilityRole="switch" accessibilityState={{ checked: value }}>
      <Animated.View
        onLayout={(event) => {
          height.value = event.nativeEvent.layout.height;
          width.value = event.nativeEvent.layout.width;
        }}
        style={[switchStyles.track, style, trackAnimatedStyle]}
      >
        <Animated.View style={[switchStyles.thumb, { backgroundColor: thumbColor }, thumbAnimatedStyle]} />
      </Animated.View>
    </Pressable>
  );
};

export default SwitchButton;

const switchStyles = StyleSheet.create({
  track: {
    width: 60,
    height: 28,
    padding: 3,
    justifyContent: 'center',
  },
  thumb: {
    width: 21,
    height: 21,
  },
});
