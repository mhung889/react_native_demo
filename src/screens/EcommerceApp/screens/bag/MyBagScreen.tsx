import React, { useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Alert, Dimensions, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetView } from '@gorhom/bottom-sheet';

import CartItemComponent from '../../components/bag/CartItem';
import { DATA_SIZES } from '../../components/ProductDetail/SelecteSizeModal';

import { formatPrice } from '../../utils';
import { colors } from '../../themes/color';
import MyBagScreenLogic from './MyBagScreen.logic';
import { SCREENS } from '../../navigation/SCREENS';
import { commonStyle } from '../../themes/commonStyle';
import { CartItem } from '../../store/cart/cart.store';
import { Lucide } from '@react-native-vector-icons/lucide';

const MyBagScreen = () => {
  const {
    handleBottomSheet,
    handleUpdateCartItem,
    bottomSheetRef,
    cartItemList,
    selectedItem,
    selectedSize,
    setSelectedSize,
    navigation,
    selectedOrderList,
    totalAmoutPrice,
    isItemSelected,
    toggleSelectedItem,
    isSelectedAll,
    toggleSelectedAll,

    activeFix,
    setActiveFix,
    toggleDeleteSelected,
  } = MyBagScreenLogic();

  const handleNavigateCheckout = useCallback(() => {
    if (selectedOrderList.length > 0) {
      navigation.navigate(SCREENS.CHECKOUT, {
        itemList: selectedOrderList,
      });
      return;
    }
    Alert.alert('', 'Plese select item you want buy?', [{ style: 'destructive', text: 'OK' }]);
  }, [navigation, selectedOrderList]);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} opacity={0.5} pressBehavior="close" />
    ),
    [],
  );

  const renderCardItem = ({ item }: { item: CartItem }) => {
    return (
      <CartItemComponent
        item={item}
        handleBottomSheet={handleBottomSheet}
        navigation={navigation}
        isItemSelected={isItemSelected}
        toggleSelectedItem={toggleSelectedItem}
      />
    );
  };

  // neu cartItemList co san pham thi moi cho an edit

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={[styles.headerBag]}>{'My Bag'}</Text>
        {activeFix ? (
          <Pressable onPress={() => setActiveFix(!activeFix)}>
            <Text style={styles.fixText}>{'Complete'}</Text>
          </Pressable>
        ) : (
          <Pressable onPress={() => setActiveFix(!activeFix)}>
            <Text style={styles.fixText}>{'Edit'}</Text>
          </Pressable>
        )}
      </View>

      {cartItemList.length > 0 ? (
        <>
          <FlatList
            data={cartItemList}
            keyExtractor={(item) => `${item.id}-${item.size}`}
            renderItem={renderCardItem}
            contentContainerStyle={styles.containerList}
          />

          <View style={styles.footerContainer}>
            <View style={styles.footer}>
              <View style={styles.checkboxContainer}>
                <Pressable style={styles.checkbox} onPress={toggleSelectedAll}>
                  {isSelectedAll && <Lucide name="check" size={20} color={colors.white} />}
                </Pressable>
                <Text style={styles.selectAllText}>{'All'}</Text>
              </View>

              {activeFix ? (
                <Pressable style={styles.buttonDelete} onPress={toggleDeleteSelected}>
                  <Text style={styles.deleteText}>{'Delete'}</Text>
                </Pressable>
              ) : (
                <Text style={styles.totalAmountPrice}>{formatPrice(totalAmoutPrice)}</Text>
              )}
            </View>

            <Pressable style={styles.buttonCheckout} onPress={handleNavigateCheckout}>
              <Text style={styles.buttonCheckoutText}>{'CHECK OUT'}</Text>
            </Pressable>
          </View>

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
                <Text style={styles.buttonCheckoutText}>{'Confirm'}</Text>
              </Pressable>
            </BottomSheetView>
          </BottomSheet>
        </>
      ) : (
        <View style={styles.textEmptyContainer}>
          <Text style={styles.textEmpty}>{'Không có sản phẩm nào'}</Text>
        </View>
      )}
    </SafeAreaView>
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
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerBag: {
    color: colors.white,
    fontFamily: commonStyle.fontFamily,
    fontWeight: '700',
    fontSize: 34,
    marginVertical: Dimensions.get('window').height * 0.01, //1 % screen
  },

  fixText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '500',
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

  textEmptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  textEmpty: {
    color: colors.white,
    fontSize: 18,
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

  footerContainer: {},

  footer: {
    marginVertical: 5,
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    marginBottom: 20,
  },
  buttonCheckoutText: {
    color: colors.ordinaryText,
    paddingVertical: 14,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },

  checkboxContainer: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },

  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },

  selectAllText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '500',
  },

  buttonDelete: {
    backgroundColor: colors.primary,
    borderRadius: 7,
  },

  deleteText: {
    color: colors.white,
    paddingVertical: 3,
    paddingHorizontal: 7,
    fontSize: 15,
    fontWeight: '500',
  },
});
