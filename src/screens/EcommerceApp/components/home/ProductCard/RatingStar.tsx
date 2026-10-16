import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { colors } from '../../../themes/color';
import { ReviewType } from '../../../types/product';

const RATING = [1, 2, 3, 4, 5];

const RatingStar = ({ reviews }: { reviews: ReviewType[] }) => {
  const avegerStar =
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return (
    <View style={styles.container}>
      {RATING.map(star => (
        <Ionicons
          key={star}
          name={star <= avegerStar ? 'star' : 'star-outline'}
          color={star <= avegerStar ? colors.yellow : colors.gray}
          size={15}
        />
      ))}
    </View>
  );
};

export default RatingStar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 3,
  },
});
