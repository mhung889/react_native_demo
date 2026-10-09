import { View, Text, Image, StyleSheet, Alert, Pressable } from 'react-native';
import React from 'react';
import { NewType } from '../../types/news';
import { transformDate } from '../../utils';
import { FontAwesomeFreeSolid } from '@react-native-vector-icons/fontawesome-free-solid';
import { useBookMark } from '../../context/BookmarkContext';
import { useNavigation } from '@react-navigation/native';
import { SCREENS } from '../../navigation/SCREENS';
import { RootStackParamList } from '../../navigation/type';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type BookMarkCardProps = {
  item: NewType;
  //   setBookMarks: React.Dispatch<React.SetStateAction<NewType[]>>;
};

type BookMarkNavigate = NativeStackNavigationProp<RootStackParamList>;

export default function BookMarkCard({ item }: BookMarkCardProps) {
  const { removeBookMark } = useBookMark();
  const navigation = useNavigation<BookMarkNavigate>();

  const handleDelteBookMark = () => {
    Alert.alert('Delete', `You want to delete this news from bookmarks ?`, [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => removeBookMark(item),
      },
    ]);
  };

  const handleNavigate = () => {
    navigation.navigate(SCREENS.NEWS_DETAIL, {
      newDetail: item,
      category: item.category,
    });
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={handleNavigate}>
        <Image source={{ uri: item.urlToImage }} style={styles.image} resizeMode="cover" />
      </Pressable>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>

        <View style={styles.action}>
          <Text style={styles.date}>{transformDate(item.publishedAt)}</Text>

          <FontAwesomeFreeSolid
            name="heart"
            size={20}
            color={'red'}
            onPress={handleDelteBookMark}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 12,
    marginBottom: 12,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 12,

    // Android
    elevation: 2,

    // iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },

  image: {
    width: 110,
    height: 100,
    borderRadius: 8,
  },

  content: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'space-between',
  },

  title: {
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 21,
    color: '#222',
  },

  date: {
    fontSize: 15,
    color: 'black',
  },
  action: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 1,
  },
});
