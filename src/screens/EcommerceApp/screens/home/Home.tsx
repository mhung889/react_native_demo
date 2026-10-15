import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import { colors } from '../../themes/color';
import { commonStyle } from '../../themes/commonStyle';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import RatingStar from '../../components/RatingStar';

const Home = () => {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Banner */}

      <View style={styles.bannerContainer}>
        <Image
          source={{
            uri: 'https://cdn.dribbble.com/userupload/18818643/file/original-1fb8535a3f0488e4d5a2cf81cc88df61.png?resize=420x&vertical=center',
          }}
          style={styles.imageBanner}
          resizeMode="cover"
        />
        <View style={styles.textBanner}>
          <Text style={styles.titleBanner}>{'Fashion\nsale'}</Text>
          <Pressable style={styles.button}>
            <Text style={styles.textButton}> {'Check'} </Text>
          </Pressable>
        </View>
      </View>

      {/* New */}
      <View
        style={{
          marginHorizontal: 16,
          marginVertical: 20,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View>
            <Text
              style={{
                color: colors.white,
                fontFamily: commonStyle.fontFamily,
                fontSize: 30,
                fontWeight: 'bold',
              }}
            >
              {'New'}
            </Text>
            <Text
              style={{
                color: colors.white,
                fontFamily: commonStyle.fontFamily,
              }}
            >
              {"You've never seen it before"}
            </Text>
          </View>
          <Text
            style={{
              color: colors.white,
              fontFamily: commonStyle.fontFamily,
              fontSize: 16,
            }}
          >
            {'View all'}
          </Text>
        </View>

        {/* Item List */}
        <View style={{ flexDirection: 'row', gap: 30, flexWrap: 'wrap' }}>
          {/* Item 1 */}
          <View style={{ height: 260, width: 150 }}>
            <View style={{ position: 'relative' }}>
              <Image
                source={{
                  uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_SgWCcaGAszV8fo_8ChlkhEnJ7p7PlhslDV4jruW3gQ&s=10',
                }}
                style={{
                  width: 148,
                  height: 184,
                  borderRadius: 12,
                }}
              />
              <Text
                style={[
                  styles.positionItem,
                  {
                    top: '2%',
                    left: '3%',
                    color: colors.white,
                    backgroundColor: colors.primary,
                    padding: 3,
                    borderRadius: 20,
                    fontSize: 13,
                  },
                ]}
              >
                -20%
              </Text>
              <Ionicons
                name="heart-outline"
                size={20}
                color={colors.gray}
                style={[
                  styles.positionItem,
                  {
                    top: '65%',
                    right: '1%',
                    backgroundColor: colors.dark,
                    padding: 5,
                    borderRadius: 20,
                  },
                ]}
              />
            </View>

            <View>
              <RatingStar />
            </View>
          </View>

          {/* Item 1 */}
          <View>
            <View style={{ position: 'relative', height: 260, width: 150 }}>
              <Image
                source={{
                  uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_SgWCcaGAszV8fo_8ChlkhEnJ7p7PlhslDV4jruW3gQ&s=10',
                }}
                style={{
                  width: 148,
                  height: 184,
                  borderRadius: 12,
                }}
              />
              <Text
                style={[
                  styles.positionItem,
                  {
                    top: '2%',
                    left: '3%',
                    color: colors.white,
                    backgroundColor: colors.primary,
                    padding: 3,
                    borderRadius: 20,
                    fontSize: 13,
                  },
                ]}
              >
                -20%
              </Text>
              <Ionicons
                name="heart-outline"
                size={20}
                color={colors.gray}
                style={[
                  styles.positionItem,
                  {
                    top: '65%',
                    right: '1%',
                    backgroundColor: colors.dark,
                    padding: 5,
                    borderRadius: 20,
                  },
                ]}
              />
            </View>
          </View>

          {/* Item 1 */}
          <View>
            <View style={{ position: 'relative', height: 260, width: 150 }}>
              <Image
                source={{
                  uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_SgWCcaGAszV8fo_8ChlkhEnJ7p7PlhslDV4jruW3gQ&s=10',
                }}
                style={{
                  width: 148,
                  height: 184,
                  borderRadius: 12,
                }}
              />
              <Text
                style={[
                  styles.positionItem,
                  {
                    top: '2%',
                    left: '3%',
                    color: colors.white,
                    backgroundColor: colors.primary,
                    padding: 3,
                    borderRadius: 20,
                    fontSize: 13,
                  },
                ]}
              >
                -20%
              </Text>
              <Ionicons
                name="heart-outline"
                size={20}
                color={colors.gray}
                style={[
                  styles.positionItem,
                  {
                    top: '65%',
                    right: '1%',
                    backgroundColor: colors.dark,
                    padding: 5,
                    borderRadius: 20,
                  },
                ]}
              />
            </View>
          </View>
        </View>
      </View>

      {/*  */}
    </ScrollView>
  );
};

export default Home;

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
  },
  textButton: {
    color: colors.ordinaryText,
    fontFamily: commonStyle.fontFamily,
    fontSize: 18,
    paddingVertical: 8,
    paddingHorizontal: 55,
    textAlign: 'center',
  },

  //News
  positionItem: {
    position: 'absolute',
  },
});
