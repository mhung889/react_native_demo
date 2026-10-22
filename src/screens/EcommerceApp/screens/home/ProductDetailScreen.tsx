import BottomSheet from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';

import { productServices } from '../../services/productService';
import ProductInfo from '../../components/ProductDetail/ProductInfo';
import { Size } from '../../components/ProductDetail/SelecteSizeModal';
import ProductListHeader from '../../components/home/ProductListHeader';
import ProductInfoRow from '../../components/ProductDetail/ProductInfoRow';
import ProductOptions from '../../components/ProductDetail/ProductOptions';
import AddToCartButton from '../../components/ProductDetail/AddToCartButton';
import ProductBottomSheet from '../../components/ProductDetail/ProductBottomSheet';
import ProductImageSlider from '../../components/ProductDetail/ProductImageSlider';
import Header from '../../components/common/Header';

import { colors } from '../../themes/color';
import { ProductType } from '../../types/product';
import { commonStyle } from '../../themes/commonStyle';
import { Ionicons } from '@react-native-vector-icons/ionicons';

type Props = {
  route: {
    params: {
      productId: number;
    };
  };
};

const ProductDetailScreen = ({ route }: Props) => {
  const { productId } = route.params;
  const navigation = useNavigation();

  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedSize, setSelectedSize] = useState<Size | null>(null);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['50%'], []);

  const fetchSingleProduct = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await productServices.getSingleProduct(productId);
      setProduct(response);
    } catch (err) {
      console.error('Fetch product detail error:', err);
      setError('Không thể tải thông tin sản phẩm.');
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    fetchSingleProduct();
  }, [fetchSingleProduct]);

  const handleOpenSizeSheet = useCallback(() => {
    bottomSheetRef.current?.snapToIndex(0);
  }, []);

  const handleAddToCart = useCallback(() => {
    if (!product || !selectedSize) {
      return;
    }

    // Gọi cart service/store của ứng dụng tại đây.
    console.log('Add to cart:', {
      productId: product.id,
      title: product.title,
      size: selectedSize,
      quantity: 1,
    });

    bottomSheetRef.current?.close();
  }, [product, selectedSize]);

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.message}>Đang tải sản phẩm...</Text>
      </SafeAreaView>
    );
  }

  if (error || !product) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.error}>{error ?? 'Không tìm thấy sản phẩm.'}</Text>
      </SafeAreaView>
    );
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      {/* <View style={styles.container}> */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Header
          onBack={() => navigation.goBack()}
          title="Product Details"
          rightElement={<Ionicons name="share-social-outline" size={22} color={colors.white} />}
        />

        <ProductImageSlider images={product.images} />

        <View style={styles.productContent}>
          <ProductOptions selectedSize={selectedSize} onSelectSize={handleOpenSizeSheet} product={product} />

          <ProductInfo product={product} />

          <View style={styles.mainButton}>
            <AddToCartButton title={'ADD TO CART'} onPress={selectedSize ? handleAddToCart : handleOpenSizeSheet} />
          </View>

          <View style={styles.sectionIndicator} />
        </View>

        <View style={styles.divider} />

        <ProductInfoRow
          title="Shipping Info"
          onPress={() => {
            //  Mở thông tin vận chuyển.
          }}
        />

        <View style={styles.divider} />

        <ProductInfoRow
          title="Support"
          onPress={() => {
            // Mở trang hỗ trợ.
          }}
        />

        <View style={styles.divider} />

        <ProductListHeader
          name="You can also like this"
          rightElement={<Text style={styles.rightElement}>12 items</Text>}
        />
      </ScrollView>

      <ProductBottomSheet
        bottomSheetRef={bottomSheetRef}
        snapPoints={snapPoints}
        selectedSize={selectedSize}
        onSelectSize={setSelectedSize}
        onAddToCart={handleAddToCart}
      />
      {/* </View> */}
    </GestureHandlerRootView>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: 20,
  },
  message: {
    marginTop: 12,
    fontSize: 14,
    color: colors.gray,
  },
  error: {
    fontSize: 15,
    color: colors.white,
    textAlign: 'center',
  },
  retry: {
    marginTop: 16,
    color: colors.primary,
    fontFamily: commonStyle.fontFamily,
    fontSize: 16,
  },
  productContent: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  mainButton: {
    marginTop: 22,
  },
  sectionIndicator: {
    height: 5,
    width: '50%',
    backgroundColor: colors.white,
    marginVertical: 24,
    alignSelf: 'center',
    borderRadius: 12,
  },
  divider: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.gray,
  },
  rightElement: {
    color: colors.white,
    fontFamily: commonStyle.fontFamily,
    fontSize: 16,
  },
});
