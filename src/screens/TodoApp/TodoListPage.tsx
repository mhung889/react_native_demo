import {
  View,
  Text,
  FlatList,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import uuid from 'react-native-uuid';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList, TodoItem } from './TodoApp';

type TodoListNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'TodoList'
>;

const DATA_TODO = [
  {
    id: 1,
    title: 'Buy groceries',
    isImportant: true,
    isCompleted: false,
  },

  {
    id: 2,
    title: 'Walk the dog',
    isImportant: false,
    isCompleted: false,
  },

  {
    id: 3,
    title: 'Read a book',
    isImportant: false,
    isCompleted: false,
  },

  {
    id: 4,
    title: 'todo 4',
    isImportant: false,
    isCompleted: false,
  },

  {
    id: 5,
    title: 'todo 5',
    isImportant: false,
    isCompleted: false,
  },
];

export default function TodoListPage() {
  const navigation = useNavigation<TodoListNavigationProp>();

  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState<TodoItem[]>(DATA_TODO);
  //   const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const renderTodoItem = ({ item }: { item: TodoItem }) => {
    // console.log(item);
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 10,
          borderBottomWidth: 1,
          borderBottomColor: '#ccc',
          gap: 10,
        }}
      >
        <Pressable
          onPress={() => handleToggleTodo(item.id)}
          style={{
            width: 21,
            height: 21,
            borderWidth: 2,
            borderColor: item.isCompleted ? '#22c55e' : '#999',
            borderRadius: 4,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: item.isCompleted ? '#22c55e' : 'transparent',
          }}
        >
          {item.isCompleted && (
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
              }}
            >
              ✓
            </Text>
          )}
        </Pressable>
        <Text
          style={{ fontSize: 19 }}
          onPress={() => navigation.navigate('TodoDetail', { item: item })}
        >
          {item.title}
        </Text>
        <Pressable
          onPress={() => handleToggleImportant(item.id)}
          style={{ marginLeft: 'auto' }}
        >
          <Text
            style={{
              color: item.isImportant ? 'gold' : 'gray',
              fontSize: 23,
            }}
          >
            ☆
          </Text>
        </Pressable>
        <Pressable onPress={() => handleDeleteTodo(item.id)}>
          <Text style={{ color: 'red', fontSize: 20 }}>Delete</Text>
        </Pressable>
      </View>
    );
  };

  const handleDeleteTodo = (id: string | number) => {
    Alert.alert('Delete', 'Are you sure you want to delete this todo?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          const updatedTodos = todos.filter(todo => todo.id !== id);
          setTodos(updatedTodos);
        },
      },
    ]);
  };

  const handleToggleImportant = (id: string | number) => {
    const newTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, isImportant: !todo.isImportant };
      }
      return todo;
    });

    setTodos(newTodos);
  };

  const handleToggleTodo = (id: string | number) => {
    const newTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const handleAddTodo = () => {
    if (title.trim() === '') {
      return;
    }

    // console.log(typeof uuid.v4());

    const newTodo = {
      id: uuid.v4(),
      title: title,
      isImportant: false,
      isCompleted: false,
    };
    setTodos([...todos, newTodo]);
    setTitle('');
  };

  console.log('todos', todos);

  return (
    <View style={{ flex: 1, padding: 10 }}>
      {/* Search or filter */}
      <View>
        <Text>Search or filter</Text>
      </View>
      {/* Todo list */}

      <FlatList
        data={todos}
        renderItem={renderTodoItem}
        keyExtractor={item => item.id.toString()}
        style={{
          flex: 1,
          marginTop: 10,
        }}
        contentContainerStyle={{
          paddingBottom: 10,
        }}
      />
      {/* Add new todo */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          padding: 10,
          marginTop: 10,
        }}
      >
        <TextInput
          placeholder="Add new todo"
          style={{
            flex: 1,
            padding: 10,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 5,
          }}
          value={title}
          onChange={e => {
            console.log(e.nativeEvent);
            setTitle(e.nativeEvent.text);
          }}
        />
        <Pressable onPress={handleAddTodo}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              backgroundColor: 'red',
              padding: 10,
              borderRadius: 5,
            }}
          >
            Add
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
