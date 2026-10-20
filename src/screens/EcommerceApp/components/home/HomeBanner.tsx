import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../../themes/color';
import { commonStyle } from '../../themes/commonStyle';

const HomeBanner = () => {
  return (
    <View style={styles.bannerContainer}>
      <Image
        source={{
          uri: 'https://img.vuahanghieu.com/unsafe/0x0/left/top/smart/filters:quality(90)/https://admin.vuahanghieu.com/upload/news/content/2026/05/top-thuong-hieu-my-pham-viet-nam-noi-tieng-10-jpg-1778223792-08052026140312.jpg',
        }}
        style={styles.imageBanner}
        resizeMode="cover"
      />
      <View style={styles.textBanner}>
        <Text style={styles.titleBanner}>{'Comestic\nsale'}</Text>
        <Pressable style={styles.button}>
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
    height: 600,
    position: 'relative',
  },
  imageBanner: {
    width: '100%',
    height: '100%',
    // position: 'relative',
  },
  textBanner: {
    position: 'absolute',
    top: 400,
    left: 20,
  },
  titleBanner: {
    fontSize: 60,
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
    paddingHorizontal: 55,
    textAlign: 'center',
  },
});
