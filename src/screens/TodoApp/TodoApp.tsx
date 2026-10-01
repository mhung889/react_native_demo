import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TodoListPage from './TodoListPage';

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator initialRouteName="TodoList">
      <Stack.Screen
        name="TodoList"
        component={TodoListPage}
        options={{
          title: 'Todo List',
          headerStyle: { backgroundColor: '#f4511e' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
    </Stack.Navigator>
  );
}

export default function TodoApp() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}
