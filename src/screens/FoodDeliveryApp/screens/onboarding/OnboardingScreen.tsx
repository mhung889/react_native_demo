import React from 'react';
import { useNavigation } from '@react-navigation/native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View } from 'react-native';

import { colors } from '../../theme/colors';
import { Fonts } from '../../theme/fonts';
import { SCREENS } from '../../navigation/SCREENS';
import { SlideDataType, SLIDES_DATA } from '../../constant';
import { RootStackParamList } from '../../navigation/types';
import ButtonHeader from '../../components/common/ButtonHeader';

type OnboardingNavigation = NativeStackNavigationProp<RootStackParamList>;

const OnboardingScreen = () => {
  const navigation = useNavigation<OnboardingNavigation>();

  const handleNavigateGetStarted = () => {
    navigation.push(SCREENS.AUTH_STACK, {
      screen: SCREENS.GET_STARTED,
    });
  };

  const _renderItem = ({ item }: { item: SlideDataType }) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.imageContainer}>
          <Image source={item.image} style={styles.image} />
        </View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>

        <View style={styles.btn}>
          <ButtonHeader handleNavigate={handleNavigateGetStarted} title="Get started" />
        </View>
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

  btn: {
    marginTop: 109,
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
