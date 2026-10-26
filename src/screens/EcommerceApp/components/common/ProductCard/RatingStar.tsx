import React from 'react';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

import { colors } from '../../../themes/color';
import { ReviewType } from '../../../types/product';

const RATING = [1, 2, 3, 4, 5];

type RatingStarType = {
  styleContainer?: StyleProp<ViewStyle>;
  reviews: ReviewType[];
};

const RatingStar = ({ reviews, styleContainer }: RatingStarType) => {
  const safeReviews = Array.isArray(reviews) ? reviews : [];

  const averageStar =
    safeReviews.length > 0
      ? safeReviews.reduce((sum, review) => sum + (review.rating ?? 0), 0) / safeReviews.length
      : 0;

  return (
    <View style={[styles.container, styleContainer]}>
      {RATING.map((star) => (
        <Ionicons
          key={star}
          name={star <= averageStar ? 'star' : 'star-outline'}
          color={star <= averageStar ? colors.yellow : colors.gray}
          size={15}
        />
      ))}
      <Text style={styles.text}> {`(${reviews.length})`}</Text>
    </View>
  );
};

export default RatingStar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 3,
  },
  text: {
    color: colors.gray,
  },
});
