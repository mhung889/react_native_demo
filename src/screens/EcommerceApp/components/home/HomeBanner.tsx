import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { colors } from '../../themes/color';
import { ProductType } from '../../types/product';
import { SCREENS } from '../../navigation/SCREENS';
import { commonStyle } from '../../themes/commonStyle';
import { HomeStackParamList } from '../../navigation/types';

type HomeBannerNavigationProp = NativeStackNavigationProp<HomeStackParamList>;

const HomeBanner = ({ product }: { product: ProductType }) => {
  const navigation = useNavigation<HomeBannerNavigationProp>();

  const handleNavigate = () => {
    navigation.navigate(SCREENS.PRODUCT_DETAIL, {
      productId: product.id,
    });
  };

  return (
    <View style={styles.bannerContainer}>
      <Image
        source={{
          uri: `${
            product.thumbnail ||
            'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSr5mAe0ur0KpQ2kM8_0PFUZ13s8SAmW7coxRAQWRptBZGmZbU-fDkj-5Hs5YJZlK3anLRXI3ffxGKAcSqWu1Da4CyeKqegQ0-fUKVXFSQ'
          }`,
        }}
        style={styles.imageBanner}
        resizeMode="cover"
      />
      <View style={styles.textBanner}>
        <Text style={styles.titleBanner}>{'Comestic\nsale'}</Text>
        <Pressable style={styles.button} onPress={handleNavigate}>
          <Text style={styles.textButton}> {'Check'} </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default HomeBanner;

const styles = StyleSheet.create({
  //Banner
  bannerContainer: {
    height: 550,
    position: 'relative',
  },
  imageBanner: {
    width: '100%',
    height: '100%',
    // position: 'relative',
  },
  textBanner: {
    position: 'absolute',
    top: 370,
    left: 20,
  },
  titleBanner: {
    fontSize: 55,
    color: colors.white,
    fontWeight: 'bold',
    fontFamily: commonStyle.fontFamily,
  },
  button: {
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignSelf: 'center',
    marginRight: 20,
  },
  textButton: {
    color: colors.ordinaryText,
    fontFamily: commonStyle.fontFamily,
    fontSize: 18,
    paddingVertical: 8,
    paddingHorizontal: 45,
    textAlign: 'center',
  },
});
