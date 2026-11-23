import React from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { colors } from '../../theme/colors';
import { Fonts } from '../../theme/fonts';
import { SlideDataType, SLIDES_DATA } from '../../constant';

const OnboardingScreen = () => {
  const _renderItem = ({ item }: { item: SlideDataType }) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.imageContainer}>
          <Image source={item.image} style={styles.image} />
        </View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>

        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>{'Get started'}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const _renderPagination = (activeIndex: number) => {
    return (
      <View style={styles.panigationContainer}>
        {SLIDES_DATA.map((_, index) => {
          const isActive = index === activeIndex;
          return (
            <View
              key={index}
              style={[
                styles.paginationItem,
                { width: isActive ? 32 : 12, backgroundColor: isActive ? colors['Red-400'] : colors['Neutral-100'] },
              ]}
            />
          );
        })}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppIntroSlider data={SLIDES_DATA} renderItem={_renderItem} renderPagination={_renderPagination} />
    </SafeAreaView>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  itemContainer: {
    flex: 1,
    marginHorizontal: 35,
  },

  imageContainer: { width: 305, height: 305, marginBottom: 80, marginTop: 102 },
  image: {
    width: '100%',
    height: '100%',
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
    color: colors['Neutral-800'],
    textAlign: 'center',
    fontFamily: Fonts.Light,
    paddingBottom: 12,
  },

  description: {
    fontSize: 15,
    fontWeight: '400',
    fontFamily: Fonts.Light,
    lineHeight: 24,
    textAlign: 'center',
    color: colors['Neutral-100'],
  },

  btn: { backgroundColor: colors['Red-400'], borderRadius: 16, marginTop: 109 },
  btnText: {
    fontSize: 15,
    fontWeight: '500',
    fontFamily: Fonts.Light,
    paddingVertical: 12,
    textAlign: 'center',
    color: colors['Neutral-00'],
  },

  panigationContainer: {
    position: 'absolute',
    bottom: 155,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  paginationItem: {
    height: 5,
    borderRadius: 2.5,
    marginHorizontal: 1,
  },
});
