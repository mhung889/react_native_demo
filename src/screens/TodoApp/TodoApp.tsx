import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import TodoDetail from './screens/TodoDetail';
import { SCREENS } from './navigation/SCREENS';
import { ContextProvider } from './contexts/TodoContext';

const AuthStack = createNativeStackNavigator();
// const UnAuthStack = createNativeStackNavigator();

function RootStack() {
  return (
    <AuthStack.Navigator initialRouteName={SCREENS.HOME}>
      <AuthStack.Screen name={SCREENS.HOME} component={Home} options={{ headerShown: false }} />
      <AuthStack.Screen name={SCREENS.TODO_DETAIL} component={TodoDetail} />
    </AuthStack.Navigator>
  );
}

export default function TodoApp() {
  return (
    <NavigationContainer>
      <ContextProvider>
        <RootStack />
      </ContextProvider>
    </NavigationContainer>
  );
}
