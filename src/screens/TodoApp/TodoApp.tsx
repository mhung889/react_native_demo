import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TodoListPage from './TodoListPage';
import TodoDetail from './TodoDetail';

export type TodoItem = {
  id: string | number;
  title: string;
  isImportant: boolean;
  isCompleted: boolean;
};

export type RootStackParamList = {
  TodoList: undefined;
  TodoDetail: {
    item: TodoItem;
  };
};

const TodoStack = createNativeStackNavigator<RootStackParamList>();

function RootStack() {
  return (
    <TodoStack.Navigator initialRouteName="TodoList">
      <TodoStack.Screen
        name="TodoList"
        component={TodoListPage}
        options={{
          title: 'Todo List',
          headerStyle: { backgroundColor: '#f4511e' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
      <TodoStack.Screen
        name="TodoDetail"
        component={TodoDetail}
        options={{
          title: 'Todo Detail',
          headerStyle: { backgroundColor: '#f4511e' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
    </TodoStack.Navigator>
  );
}

export default function TodoApp() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}
