import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { colors } from '../themes/color';

const RATING = [1, 2, 3, 4, 5];

const RatingStar = ({ ratings }) => {
  const ratingExam: any[] = [3, 4, 5];

  const avegerStar =
    ratingExam.reduce((sum, star) => sum + star, 0) / ratingExam.length;

  console.log(avegerStar);

  return (
    <View style={styles.container}>
      {RATING.map(star => (
        <Ionicons
          key={star}
          name={star <= avegerStar ? 'star' : 'star-outline'}
          color={star <= avegerStar ? colors.yellow : colors.gray}
          size={20}
        />
      ))}
    </View>
  );
};

export default RatingStar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
  },
});
