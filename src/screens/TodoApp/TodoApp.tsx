import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import TodoDetail from './screens/TodoDetail';

const AuthStack = createNativeStackNavigator();
// const UnAuthStack = createNativeStackNavigator();

function RootStack() {
  return (
    <AuthStack.Navigator initialRouteName="Home">
      <AuthStack.Screen name="Home" component={Home} />
      <AuthStack.Screen name="TodoDetail" component={TodoDetail} />
    </AuthStack.Navigator>
  );
}

export default function TodoApp() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}
