import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import RootNavigator from './RootNavigator';
import { commonStyle } from './themes/commonStyle';

const EcommerceApp = () => {
  return (
    <GestureHandlerRootView style={commonStyle.flex1}>
      <SafeAreaProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default EcommerceApp;
