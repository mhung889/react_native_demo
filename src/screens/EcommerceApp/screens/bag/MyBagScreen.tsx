import React, { useCallback } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Dimensions, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetView } from '@gorhom/bottom-sheet';

import CardItem from '../../components/bag/CardItem';
import { DATA_SIZES } from '../../components/ProductDetail/SelecteSizeModal';

import { formatPrice } from '../../utils';
import { colors } from '../../themes/color';
import MyBagScreenLogic from './MyBagScreen.logic';
import { commonStyle } from '../../themes/commonStyle';
import { CartItem } from '../../store/cart/cart.store';

const MyBagScreen = () => {
  const {
    handleBottomSheet,
    handleUpdateCartItem,
    bottomSheetRef,
    totalAmountPrice,
    cartItemList,
    selectedItem,
    selectedSize,
    setSelectedSize,
  } = MyBagScreenLogic();

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} opacity={0.5} pressBehavior="close" />
    ),
    [],
  );

  const renderCardItem = ({ item }: { item: CartItem }) => {
    return <CardItem item={item} handleBottomSheet={handleBottomSheet} />;
  };

  if (cartItemList.length === 0) {
    return (
      <View style={[styles.container]}>
        <View style={styles.header}>
          <Text style={styles.headerBag}>{'My Bag'}</Text>
        </View>
        <Text style={styles.textEmpty}>{'Không có sản phẩm nào'}</Text>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.headerBag]}>{'My Bag'}</Text>
      </View>
      <FlatList
        data={cartItemList}
        keyExtractor={(item) => `${item.id}-${item.size}`}
        renderItem={renderCardItem}
        contentContainerStyle={styles.containerList}
      />

      <View style={styles.totalAmountContainer}>
        <Text style={styles.totalAmountText}>{'Total amount:'}</Text>
        <Text style={styles.totalAmountPrice}>{formatPrice(totalAmountPrice)}</Text>
      </View>

      <Pressable style={styles.buttonCheckout}>
        <Text style={styles.buttonCheckoutText}>{'CHECK OUT'}</Text>
      </Pressable>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        backgroundStyle={{
          backgroundColor: colors.background,
        }}
      >
        <BottomSheetView style={styles.contentBottom}>
          <Text style={styles.title}>{selectedItem?.title}</Text>

          <View style={styles.sizeContainer}>
            {DATA_SIZES.map((size) => {
              const select = size === selectedSize;

              return (
                <Pressable
                  key={`${size} - ${Math.random()}`}
                  style={[styles.sizeButton, select && styles.selectedSizeButton]}
                  onPress={() => setSelectedSize(size)}
                >
                  <Text style={styles.sizeText}>{size}</Text>
                </Pressable>
              );
            })}
          </View>
          <Pressable style={styles.buttonCheckout} onPress={handleUpdateCartItem}>
            <Text style={styles.buttonCheckoutText}>{'Xac nhan'}</Text>
          </Pressable>
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export default MyBagScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  containerList: {
    backgroundColor: colors.background,
    gap: 16,
  },

  header: {
    minHeight: 140,
    marginBottom: 10,
  },

  headerBag: {
    color: colors.white,
    fontFamily: commonStyle.fontFamily,
    fontWeight: '700',
    fontSize: 34,
    marginHorizontal: 16,
    marginTop: Dimensions.get('window').height * 0.13, //13% screen
  },

  card: {
    marginHorizontal: 16,
    height: 150,
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: colors.dark,
    borderWidth: 1,
    borderColor: colors.dark,
    borderRadius: 10,
    overflow: 'visible',
  },

  image: {
    width: 125,
    height: '100%',
    backgroundColor: colors.white,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },

  productInfo: {
    flex: 1,
    minWidth: 0,
    marginLeft: 10,
    marginTop: 12,
    marginBottom: 12,
  },

  productName: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 20,
  },

  category: {
    color: colors.white,
    paddingTop: 5,
    fontSize: 12,
  },

  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 20,
  },

  quantityButton: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: colors.darkColor,
    borderRadius: 15,
    backgroundColor: colors.darkColor,
    justifyContent: 'center',
    alignItems: 'center',

    // Android
    elevation: 5,

    // iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },

  quantity: {
    color: colors.white,
    fontSize: 16,
    paddingHorizontal: 4,
  },

  priceContainer: {
    width: 85,
    flexShrink: 0,
    marginRight: 8,
    marginVertical: 12,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },

  price: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '500',
    right: 10,
  },

  textEmpty: {
    color: colors.white,
    fontSize: 18,
    textAlign: 'center',
    paddingTop: 170,
  },

  iconSearch: {
    alignSelf: 'flex-end',
    paddingRight: 16,
  },

  // bottom sheet size
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

  contentBottom: {
    marginHorizontal: 16,
  },

  totalAmountContainer: {
    marginVertical: 10,
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  totalAmountText: {
    color: colors.gray,
    fontSize: 15,
    fontFamily: commonStyle.fontFamily,
    fontWeight: '600',
  },
  totalAmountPrice: {
    color: colors.white,
    fontSize: 19,
    fontFamily: commonStyle.fontFamily,
    fontWeight: 'bold',
  },

  buttonCheckout: {
    backgroundColor: colors.primary,
    marginHorizontal: 16,
    borderRadius: 32,
    marginBottom: 16,
  },
  buttonCheckoutText: {
    color: colors.ordinaryText,
    paddingVertical: 14,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
