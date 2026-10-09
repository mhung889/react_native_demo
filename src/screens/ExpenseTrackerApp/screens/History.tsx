import { View, Text } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyle } from '../theme/commonStyle';

export default function History() {
  return (
    <SafeAreaView style={commonStyle.flex1}>
      <View>
        <Text>Transaction History</Text>
      </View>
    </SafeAreaView>
  );
}
