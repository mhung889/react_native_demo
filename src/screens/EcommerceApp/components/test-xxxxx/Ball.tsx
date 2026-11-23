import { StyleSheet } from 'react-native';
import { GestureDetector, usePanGesture } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

export default function Ball() {
  const isPressed = useSharedValue(false);
  const offset = useSharedValue({ x: 0, y: 0 });

  console.log({ isPressed });
  console.log({ offset });

  const gesture = usePanGesture({
    onBegin: () => {
      isPressed.value = true;
    },
    onUpdate: (e) => {
      console.log({ e });
      offset.value = {
        x: offset.value.x + e.changeX,
        y: offset.value.y + e.changeY,
      };
    },
    onFinalize: () => {
      isPressed.value = false;
    },
  });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: offset.value.x }, // di chuyển sang phải giá trị bằng offset.value.x
        { translateY: offset.value.y }, // di chuyển xuống dưới
        { scale: withSpring(isPressed.value ? 1.6 : 1) }, // scale: phóng to lên, ví dụ 1.6 = (160%)
      ],
      backgroundColor: isPressed.value ? 'yellow' : 'blue',
    };
  });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.ball, animatedStyles]} />
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  ball: {
    width: 100,
    height: 100,
    borderRadius: 100,
    alignSelf: 'center',
  },
});
