import { View, Text, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import React, { useState } from 'react';
import { colors } from '../theme/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NewType } from '../types/news';
import { transformDate } from '../utils';
import { FontAwesomeFreeSolid } from '@react-native-vector-icons/fontawesome-free-solid';
import { useNavigation } from '@react-navigation/native';
import { useBookMark } from '../context/BookmarkContext';

export default function Detail({
  route: {
    params: { newDetail, category },
  },
}: {
  route: { params: { newDetail: NewType; category: string } };
}) {
  // const newDetail: NewType = route.params.new;
  // console.log(newDetail);

  const navigation = useNavigation();

  const { addBookmark, checkNewsExist, removeBookMark } = useBookMark();

  const [isBookmarked, setIsBookmarked] = useState<boolean>(checkNewsExist(newDetail));

  const handleBookMark = () => {
    if (checkNewsExist(newDetail)) {
      removeBookMark(newDetail);
      setIsBookmarked(false);
    } else {
      addBookmark(newDetail, category);
      setIsBookmarked(true);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Pressable style={styles.goBack} onPress={() => navigation.goBack()}>
          <FontAwesomeFreeSolid name="circle-left" size={20} color={colors.gray[500]} />
          <Text> Go back </Text>
        </Pressable>

        <Pressable onPress={handleBookMark}>
          <FontAwesomeFreeSolid name="heart" color={isBookmarked ? 'red' : 'gray'} size={30} />
        </Pressable>
      </View>

      <ScrollView style={styles.card}>
        {/* Image */}
        <Image
          source={{
            uri: `${newDetail.image || newDetail.urlToImage}`,
          }}
          style={styles.image}
          resizeMode="cover"
        />

        <Text style={styles.title} numberOfLines={3}>
          {newDetail.title}
        </Text>
        <View style={styles.cateAuth}>
          <Text style={styles.category}>{category}</Text>
          <Text style={styles.author}> {newDetail.author} </Text>
        </View>

        <Text style={styles.date}>{`Date: ${transformDate(newDetail.publishedAt)}`}</Text>

        <View style={styles.content}>
          <Text style={styles.description}>{newDetail.description}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },

  goBack: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  card: {
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: '#fff',

    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,

    // Android
    elevation: 4,

    // iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },

  image: {
    width: '100%',
    height: 250,
  },

  content: {
    borderTopWidth: 1,
    marginVertical: 2,
    marginHorizontal: 5,
  },

  title: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 23,
    color: '#222',
    marginHorizontal: 5,
  },

  description: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 23,
    color: '#222',
  },

  category: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary.orange,
  },
  cateAuth: {
    marginHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    marginVertical: 5,
    fontSize: 15,
    fontWeight: '700',
    marginHorizontal: 5,
  },
  author: {
    fontSize: 15,
    top: 5,
    fontWeight: '500',
  },
});
