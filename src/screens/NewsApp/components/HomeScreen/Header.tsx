import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { FontAwesomeFreeSolid } from '@react-native-vector-icons/fontawesome-free-solid';
import { colors } from '../../theme/colors';

export default function Header() {
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text style={styles.good}> Good morning </Text>
        <FontAwesomeFreeSolid name="hand-spock" color={colors.gray[50]} size={20} />
      </View>

      <Text style={styles.des}> Discover the latest news </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    backgroundColor: colors.primary.orange,
    gap: 10,
    padding: 10,
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  des: {
    color: colors.gray[50],
    fontSize: 25,
  },
  good: {
    color: colors.gray[50],
    fontSize: 20,
  },
});
