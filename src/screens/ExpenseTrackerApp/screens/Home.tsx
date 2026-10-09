import { ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import Header from '../components/Home/Header';
import Balance from '../components/Home/Balance';
import CategoryList from '../components/Home/Categories/CategoryList';
import RecentTransactionList from '../components/Home/RecentTransaction/RecentTransactionList';

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header */}
        <Header />

        {/* Balance */}
        <Balance />

        {/* Spending by Category */}
        <CategoryList />

        {/* Recent Transactions */}
        <RecentTransactionList />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  //container
  container: {
    flex: 1,
    marginHorizontal: 10,
    color: colors.background,
  },
});
