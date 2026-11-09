import React, { useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { Lucide } from '@react-native-vector-icons/lucide/static';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetView } from '@gorhom/bottom-sheet';

import { colors } from '../../themes/color';
import CheckoutLogic from './Checkout.logic';
import { VisaIcon } from '../../assets/icons';
import { SCREENS } from '../../navigation/SCREENS';
import Header from '../../components/common/Header';
import { CartItem } from '../../store/cart/cart.store';
import { RootStackParamList } from '../../navigation/types';
import { formatPrice, transformCardNumber } from '../../utils';
import PaymentMethodBottomSheet from '../../components/checkout/PaymentMethodBottomSheet';

export type CheckoutProps = NativeStackScreenProps<RootStackParamList, typeof SCREENS.CHECKOUT>;

const CheckoutScreen = ({ route, navigation }: CheckoutProps) => {
  const {
    itemList,
    paymentMethod,
    setPaymentMethod,
    defaultAddress,
    totalAmount,
    handleBack,
    handleOrderNow,
    handleOpenPaymentMethod,
    bottomSheetRef,
    handleNavigateAddress,
    defaultPaymentCard,
    handleNavigatePaymentMethod,
  } = CheckoutLogic({ route, navigation });

  const renderBackDrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} opacity={0.45} />
    ),
    [],
  );

  const renderItem = useCallback(({ item }: { item: CartItem }) => {
    return (
      <>
        <View style={styles.productCard}>
          <Image
            source={{
              uri: `${item.thumbnail}`,
            }}
            style={styles.productImage}
            resizeMode="cover"
          />

          <View style={styles.productInfo}>
            <Text style={styles.title} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={styles.productDetail}>{item.size}</Text>
            <Text style={styles.productDetail}>{item.category}</Text>
            <Text style={styles.quantity}>{`x${item.quantity}`}</Text>
          </View>

          <View style={styles.priceContainer}>
            <Text style={styles.productPrice} numberOfLines={1} adjustsFontSizeToFit>
              {formatPrice(item.price)}
            </Text>
          </View>
        </View>
      </>
    );
  }, []);

  const renderAddress = () => (
    <Pressable style={styles.addressCard} onPress={handleNavigateAddress}>
      <View style={styles.addressContent}>
        <Ionicons name="location-outline" size={22} color={colors.primary} />

        <View style={styles.addressInfo}>
          {defaultAddress ? (
            <>
              <View style={styles.infor}>
                <Text style={styles.fullName}>{defaultAddress.fullName}</Text>
                <View style={styles.divider} />
                <Text style={styles.phoneNumber}>{defaultAddress.phoneNumber}</Text>
              </View>

              <Text style={styles.address} numberOfLines={2}>
                {[defaultAddress.address.street, defaultAddress.address.ward, defaultAddress.address.province]
                  .filter(Boolean)
                  .join(', ')}
              </Text>
            </>
          ) : (
            <>
              <Text style={styles.fullName}>{'No delivery address'}</Text>
              <Text style={styles.phoneNumber}>{'Please add a delivery address'}</Text>
            </>
          )}
        </View>
      </View>

      <Ionicons name="chevron-forward-outline" size={21} color={colors.gray} />
    </Pressable>
  );

  const renderSelectedCard = () => {
    if (!defaultPaymentCard) {
      return (
        <Pressable style={styles.emptyCard} onPress={handleNavigatePaymentMethod}>
          <Lucide name="plus-circle" size={22} color={colors.primary} />

          <View style={styles.emptyCardInfo}>
            <Text style={styles.emptyCardTitle}>{'No default card selected'}</Text>
            <Text style={styles.emptyCardDescription}>{'Please select a card to continue'}</Text>
          </View>

          <Lucide name="chevron-right" size={20} color={colors.gray} />
        </Pressable>
      );
    }

    return (
      <View style={styles.selectedCard}>
        <View style={styles.selectedCardHeader}>
          <VisaIcon />
        </View>

        <Text style={styles.cardNumber}>{transformCardNumber(defaultPaymentCard.cardNumber)}</Text>

        <View style={styles.selectedCardFooter}>
          <View style={styles.cardHolder}>
            <Text style={styles.cardLabel}>{'Card Holder Name'}</Text>
            <Text style={styles.cardValue} numberOfLines={1}>
              {defaultPaymentCard.nameCard}
            </Text>
          </View>

          <View>
            <Text style={styles.cardLabel}>{'Expire Date'}</Text>
            <Text style={styles.cardValue}>{defaultPaymentCard.expireDate}</Text>
          </View>
        </View>

        <Pressable style={styles.changeCardButton} onPress={handleNavigatePaymentMethod}>
          <Text style={styles.changeCardText}>{'Change card'}</Text>
          <Lucide name="chevron-right" size={17} color={colors.white} />
        </Pressable>
      </View>
    );
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Header onBack={handleBack} isShowleftElement heightContainer={40} title="Checkout" />

        <FlatList
          data={itemList}
          keyExtractor={(item) => `${item.id}-${item.size}`}
          renderItem={renderItem}
          ListHeaderComponent={renderAddress}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />

        <View style={styles.paymentMethodContainer}>
          <Text style={styles.sectionTitle}>{'Payment Method'}</Text>
          <Pressable hitSlop={{ top: 3, bottom: 3, left: 6, right: 6 }} onPress={handleOpenPaymentMethod}>
            <Lucide name="ellipsis" size={23} color={colors.gray} />
          </Pressable>
        </View>

        {paymentMethod === 'card' && renderSelectedCard()}

        {/* Bottom checkout */}
        <View style={styles.footer}>
          <View style={styles.totalContainer}>
            <View>
              <Text style={styles.totalLabel}>{'Total Amount'}</Text>
              <Text style={styles.totalNote}>{`${itemList.length} products`}</Text>
            </View>

            <Text style={styles.totalPrice} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.75}>
              {formatPrice(totalAmount)}
            </Text>
          </View>

          <Pressable
            style={({ pressed }) => [styles.orderButton, pressed && styles.orderButtonPressed]}
            onPress={handleOrderNow}
          >
            <Text style={styles.orderButtonText}>{'Order Now'}</Text>
          </Pressable>
        </View>
      </SafeAreaView>

      <BottomSheet
        index={-1}
        ref={bottomSheetRef}
        enablePanDownToClose
        backdropComponent={renderBackDrop}
        backgroundStyle={{ backgroundColor: colors.dark }}
      >
        <BottomSheetView>
          <PaymentMethodBottomSheet paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
        </BottomSheetView>
      </BottomSheet>
    </>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // Address
  addressCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.dark,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 6,
  },

  addressContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
    gap: 8,
  },

  addressInfo: {
    flex: 1,
    minWidth: 0,
  },

  infor: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },

  fullName: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },

  divider: {
    width: 1,
    height: 15,
    backgroundColor: colors.gray,
  },

  phoneNumber: {
    color: colors.gray,
    fontSize: 13,
  },

  address: {
    color: colors.white,
    fontSize: 14,
    marginTop: 5,
    lineHeight: 20,
  },

  // Product list
  listContent: {
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 16,
    gap: 10,
  },

  productCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.dark,
    borderRadius: 10,
    overflow: 'hidden',
    minHeight: 110,
    paddingRight: 10,
  },

  productImage: {
    width: 95,
    height: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },

  productInfo: {
    flex: 1,
    paddingHorizontal: 10,
    gap: 4,
  },

  title: {
    color: colors.white,
    fontSize: 17,
    fontWeight: '600',
  },

  productDetail: {
    color: colors.gray,
    fontSize: 12,
  },

  quantity: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '500',
  },

  // Price
  priceContainer: {
    maxWidth: '30%',
    minWidth: 55,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  productPrice: {
    color: colors.white,
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'right',
    // flexShrink: 1,
    width: '100%',
  },

  // Bottom footer
  footer: {
    backgroundColor: colors.dark,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 10,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    gap: 14,
  },

  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },

  totalLabel: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '500',
  },

  totalNote: {
    color: colors.gray,
    fontSize: 12,
    marginTop: 3,
  },

  totalPrice: {
    color: colors.primary,
    fontSize: 21,
    fontWeight: '700',
    flexShrink: 1,
    textAlign: 'right',
  },

  orderButton: {
    height: 48,
    backgroundColor: colors.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  orderButtonPressed: {
    opacity: 0.8,
  },

  orderButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },

  sectionTitle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '700',
  },

  paymentMethodContainer: {
    flexDirection: 'row',
    marginHorizontal: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 12,
  },

  // Selected payment card
  selectedCard: {
    backgroundColor: colors.primary,
    marginHorizontal: 12,
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#3A3A3A',
    gap: 18,
  },

  selectedCardHeader: {
    alignSelf: 'flex-end',
  },

  defaultBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#263A32',
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 20,
  },

  defaultBadgeText: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: '600',
  },

  cardNumber: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 2,
  },

  selectedCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  cardHolder: {
    flex: 1,
    marginRight: 12,
  },

  cardLabel: {
    color: colors.white,
    fontSize: 12,
    marginBottom: 5,
    letterSpacing: 1,
  },

  cardValue: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '500',
  },

  changeCardButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#3A3A3A',
    paddingTop: 12,
  },

  changeCardText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '600',
  },

  // Empty card
  emptyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.dark,
    marginHorizontal: 12,
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },

  emptyCardInfo: {
    flex: 1,
    gap: 4,
  },

  emptyCardTitle: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },

  emptyCardDescription: {
    color: colors.gray,
    fontSize: 12,
  },
});
