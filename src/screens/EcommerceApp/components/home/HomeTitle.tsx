import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { colors } from '../../themes/color';
import { commonStyle } from '../../themes/commonStyle';

const HomeTitle = ({ name, title }: { name: string; title: string }) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{name}</Text>
        <Text
          style={{
            color: colors.white,
            fontFamily: commonStyle.fontFamily,
          }}
        >
          {title}
        </Text>
      </View>
      <Text style={styles.viewAll}>{'View all'}</Text>
    </View>
  );
};

export default HomeTitle;

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    color: colors.white,
    fontFamily: commonStyle.fontFamily,
    fontSize: 30,
    fontWeight: 'bold',
  },

  viewAll: {
    color: colors.white,
    fontFamily: commonStyle.fontFamily,
    fontSize: 16,
  },
});
