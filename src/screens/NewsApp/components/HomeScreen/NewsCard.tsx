import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import { colors } from '../../theme/colors';
import { NewType } from '../../types/news';
import { transformDate } from '../../utils';
import { useNavigation } from '@react-navigation/native';
import { SCREENS } from '../../navigation/SCREENS';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/type';

type NewCardProps = {
  item: NewType;
  category: string;
};

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export default function NewsCard({ item, category }: NewCardProps) {
  // console.log(item);
  // console.log(category);

  const navigation = useNavigation<NavigationProps>();

  return (
    <View style={styles.card}>
      {/* Image */}
      <Image
        source={{
          uri: `${item.image || item.urlToImage}`,
        }}
        style={styles.image}
        resizeMode="cover"
      />

      {/* Content */}
      <View style={styles.content}>
        <Text
          style={styles.title}
          numberOfLines={3}
          onPress={() =>
            navigation.navigate(SCREENS.NEWS_DETAIL, {
              newDetail: item,
              category: category,
            })
          }
        >
          {item.title}
        </Text>
        <Text style={styles.category}>
          {category.substring(0, 1).toUpperCase().concat(category.substring(1))}
        </Text>

        <Text style={styles.date}>{`Date: ${transformDate(item.publishedAt)}`}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    height: 180,
  },

  content: {
    padding: 14,
  },

  title: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 23,
    color: '#222',
  },

  category: {
    marginTop: 10,
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary.orange,
  },

  date: {
    fontSize: 13,
    marginTop: 10,
    fontWeight: '600',
  },
  action: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconHeart: {
    top: 3,
  },
});
