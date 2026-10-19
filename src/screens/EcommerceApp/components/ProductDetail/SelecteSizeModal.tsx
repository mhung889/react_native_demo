// import { Pressable, StyleSheet, Text, View } from 'react-native';
// import React, { useState } from 'react';
// import { colors } from '../../themes/color';
// import { commonStyle } from '../../themes/commonStyle';
// import { Ionicons } from '@react-native-vector-icons/ionicons';

// type Size = 'S' | 'M' | 'L';

// const DATA_SIZES: Size[] = ['S', 'M', 'L'];

// const SelecteSizeModal = () => {
//   const [selectedSize, setSelectedSize] = useState<Size | null>(null);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Select Size</Text>

//       <View style={styles.sizeContainer}>
//         {DATA_SIZES.map(size => {
//           const isSelected = selectedSize === size;

//           return (
//             <Pressable
//               key={size}
//               onPress={() => setSelectedSize(size)}
//               style={[
//                 styles.sizeButton,
//                 isSelected && styles.selectedSizeButton,
//               ]}
//             >
//               <Text
//                 style={[styles.sizeText, isSelected && styles.selectedSizeText]}
//               >
//                 {size}
//               </Text>
//             </Pressable>
//           );
//         })}
//       </View>

//       <View style={styles.divider} />

//       <Pressable style={styles.sizeInfo}>
//         <Text style={styles.sizeInfoText}>Size info</Text>
//         <Ionicons name="chevron-forward" size={20} color={colors.white} />
//       </Pressable>

//       <View style={styles.divider} />

//       <Pressable
//         style={[styles.addButton]}
//         onPress={() => {
//           if (!selectedSize) return;
//           console.log('Selected size:', selectedSize);
//         }}
//       >
//         <Text style={styles.addButtonText}>ADD TO CART</Text>
//       </Pressable>
//     </View>
//   );
// };

// export default SelecteSizeModal;

// const styles = StyleSheet.create({
//   container: {
//     marginHorizontal: 16,
//   },

//   title: {
//     textAlign: 'center',
//     fontFamily: commonStyle.fontFamily,
//     color: colors.white,
//     fontSize: 23,
//     fontWeight: 'bold',
//     marginTop: 8,
//   },

//   sizeContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     gap: 12,
//     marginTop: 28,
//     marginBottom: 24,
//   },

//   sizeButton: {
//     flex: 1,
//     height: 54,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: colors.gray,
//     borderRadius: 10,
//   },

//   selectedSizeButton: {
//     backgroundColor: colors.primary,
//     borderColor: colors.primary,
//   },

//   sizeText: {
//     fontSize: 20,
//     fontFamily: commonStyle.fontFamily,
//     color: colors.white,
//     fontWeight: '500',
//   },

//   selectedSizeText: {
//     color: colors.ordinaryText,
//     fontWeight: 'bold',
//   },

//   divider: {
//     borderTopWidth: StyleSheet.hairlineWidth,
//     borderTopColor: colors.gray,
//     marginHorizontal: -16,
//   },

//   sizeInfo: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     minHeight: 52,
//     paddingHorizontal: 10,
//   },

//   sizeInfoText: {
//     color: colors.white,
//     fontFamily: commonStyle.fontFamily,
//     fontSize: 16,
//   },

//   addButton: {
//     height: 52,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: colors.primary,
//     borderRadius: 12,
//     marginTop: 20,
//     marginBottom: 12,
//   },

//   addButtonText: {
//     color: colors.ordinaryText,
//     fontFamily: commonStyle.fontFamily,
//     fontSize: 15,
//     fontWeight: 'bold',
//     letterSpacing: 0.5,
//   },
// });

import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { colors } from '../../themes/color';
import { commonStyle } from '../../themes/commonStyle';
import AddToCartButton from './AddToCartButton';

export type Size = 'S' | 'M' | 'L';

const DATA_SIZES: Size[] = ['S', 'M', 'L'];

type Props = {
  selectedSize: Size | null;
  onSelectSize: (size: Size) => void;
  onAddToCart?: () => void;
};

const SelecteSizeModal = ({
  selectedSize,
  onSelectSize,
  onAddToCart,
}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Size</Text>

      <View style={styles.sizeContainer}>
        {DATA_SIZES.map(size => {
          const selected = selectedSize === size;

          return (
            <Pressable
              key={size}
              onPress={() => onSelectSize(size)}
              style={[styles.sizeButton, selected && styles.selectedSizeButton]}
            >
              <Text
                style={[styles.sizeText, selected && styles.selectedSizeText]}
              >
                {size}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.divider} />

      <Pressable style={styles.sizeInfo} onPress={() => {}}>
        <Text style={styles.sizeInfoText}>Size info</Text>
        <Ionicons name="chevron-forward" size={20} color={colors.white} />
      </Pressable>

      <View style={styles.divider} />

      <View style={styles.buttonContainer}>
        <AddToCartButton disabled={!selectedSize} onPress={onAddToCart} />
      </View>
    </View>
  );
};

export default SelecteSizeModal;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    fontFamily: commonStyle.fontFamily,
    color: colors.white,
    fontSize: 23,
    fontWeight: 'bold',
    marginTop: 8,
  },
  sizeContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 28,
    marginBottom: 24,
  },
  sizeButton: {
    flex: 1,
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 10,
  },
  selectedSizeButton: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  sizeText: {
    fontSize: 20,
    fontFamily: commonStyle.fontFamily,
    color: colors.white,
    fontWeight: '500',
  },
  selectedSizeText: {
    color: colors.ordinaryText,
    fontWeight: 'bold',
  },
  divider: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.gray,
    marginHorizontal: -16,
  },
  sizeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 52,
    paddingHorizontal: 10,
  },
  sizeInfoText: {
    color: colors.white,
    fontFamily: commonStyle.fontFamily,
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 12,
  },
});
