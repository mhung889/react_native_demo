import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { colors } from '../../theme/colors';

const Balance = () => {
  return (
    <View style={styles.balanceContainer}>
      <View style={styles.balance}>
        <Text style={styles.textBalance}> TOTAL BALANCE </Text>
        <Text style={styles.totalBalance}> $12312.123 </Text>
      </View>

      {/* income expense saved */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryItem}>
          <Text style={styles.label}>Income</Text>
          <Text style={[styles.amount, styles.income]}>+$8.123</Text>
        </View>

        <View style={styles.summaryItem}>
          <Text style={styles.label}>Expenses</Text>
          <Text style={[styles.amount, styles.expense]}>-$6.12</Text>
        </View>

        <View style={styles.summaryItem}>
          <Text style={styles.label}>Saved</Text>
          <Text style={[styles.amount, styles.saved]}>$2.12</Text>
        </View>
      </View>
    </View>
  );
};

export default Balance;

const styles = StyleSheet.create({
  // Balance And income expense saved
  balanceContainer: {
    // marginHorizontal: 'auto',
    // flex: 1,
  },
  balance: {
    marginVertical: 23,
    alignItems: 'center',
  },
  textBalance: {
    fontSize: 19,
    fontWeight: '200',
  },
  totalBalance: {
    fontSize: 32,
    fontWeight: 'bold',
    paddingTop: 10,
  },

  //income expense saved
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 30,
  },
  summaryItem: {
    gap: 7,
    alignItems: 'center',
  },
  label: {
    fontSize: 15,
    fontWeight: '300',
  },
  amount: {
    fontSize: 15,
    fontWeight: '500',
  },
  income: {
    color: colors.income,
  },
  expense: {
    color: colors.expense,
  },
  saved: {
    color: colors.saved,
  },
});
