import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { colors } from '../../../theme/colors';

const RecentTransactionList = () => {
  return (
    <View style={styles.recentTransactionContainer}>
      <View style={styles.commonHeader}>
        <Text style={styles.commonText}>Recent Transactions</Text>
        <Text>See all</Text>
      </View>
      <View>
        {/* item 1 */}
        <View style={styles.recentItem}>
          <View style={styles.recentLeft}>
            <Image
              source={{
                uri: 'https://static.vecteezy.com/system/resources/thumbnails/046/032/696/small/japanese-food-3d-icon-png.png',
              }}
              style={styles.recentImage}
            />

            <View style={styles.recentInfo}>
              <Text style={styles.recentTitle}>Starbucks</Text>
            </View>
          </View>

          <Text style={styles.recentAmount}>-$8.79</Text>
        </View>
        {/* End item 1 */}

        {/* item 2 */}
        <View style={styles.recentItem}>
          <View style={styles.recentLeft}>
            <Image
              source={{
                uri: 'https://static.vecteezy.com/system/resources/thumbnails/046/032/696/small/japanese-food-3d-icon-png.png',
              }}
              style={styles.recentImage}
            />

            <View style={styles.recentInfo}>
              <Text style={styles.recentTitle}>Salary Deposit</Text>
            </View>
          </View>

          <Text style={styles.recentAmount}>-$8.79</Text>
        </View>
        {/* End item 2 */}
      </View>
    </View>
  );
};

export default RecentTransactionList;

const styles = StyleSheet.create({
  // recent Transaction
  recentTransactionContainer: {
    marginVertical: 10,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    paddingHorizontal: 14,
    marginBottom: 7,
  },
  recentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  recentImage: {
    width: 48,
    height: 48,
    borderRadius: 12,
    marginRight: 12,
  },
  recentInfo: {
    justifyContent: 'center',
  },
  recentTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },

  recentAmount: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.expense,
  },

  //common category and recent transaction
  commonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  commonText: {
    fontSize: 18,
    fontWeight: 'semibold',
  },
});
