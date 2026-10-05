import { Button, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { useTodoContext } from '../contexts/TodoContext';
import { TodoItemType } from '../types';
import { FontAwesomeFreeSolid } from '@react-native-vector-icons/fontawesome-free-solid';
import { colors } from '../theme/color';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/type';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const TodoDetail = ({
  route: {
    params: { todo_id },
  },
}: {
  route: { params: { todo_id: string } };
}) => {
  // console.log(todo_id);

  const { todos, setTodos } = useTodoContext();
  const navigation = useNavigation<NavigationProp>();

  const findTodo = todos.find((t) => t.id === todo_id);

  if (!findTodo) {
    return null;
  }

  const [todo, setTodo] = useState<TodoItemType>({
    id: findTodo.id,
    title: findTodo.title,
    isImportant: findTodo.isImportant,
    isCompleted: findTodo.isCompleted,
    isDeleted: findTodo.isDeleted,
  });

  const handleCheckbox = () => {
    setTodo((prev) => {
      return {
        ...prev,
        isCompleted: !prev.isCompleted,
      };
    });
  };

  const handleImportant = () => {
    setTodo((prev) => {
      return {
        ...prev,
        isImportant: !prev.isImportant,
      };
    });
  };

  const handleTitle = (text: string) => {
    console.log(text);
    setTodo((prev) => {
      return {
        ...prev,
        title: text,
      };
    });
  };

  const handleSave = () => {
    setTodos((prev) => {
      return prev.map((t) => {
        if (t.id === todo.id) {
          return todo;
        }
        return t;
      });
    });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text style={styles.text}> Title </Text>
        <TextInput value={todo.title} style={styles.textTitle} onChangeText={handleTitle} />
      </View>

      <View style={styles.item}>
        <Text style={styles.text}> Important </Text>
        <Pressable onPress={handleImportant}>
          <FontAwesomeFreeSolid
            name="star"
            size={30}
            color={todo.isImportant ? colors.green[500] : colors.green[100]}
          />
        </Pressable>
      </View>

      <View style={styles.item}>
        <Text style={styles.text}> Completed </Text>
        <Pressable style={styles.checkbox} onPress={handleCheckbox}>
          {todo.isCompleted && (
            <FontAwesomeFreeSolid name="check" size={20} color="green" style={[styles.check]} />
          )}
        </Pressable>
      </View>

      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

export default TodoDetail;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: '700',
  },
  textTitle: {
    fontSize: 15,
    flex: 1,
    borderWidth: 1,
    marginRight: 20,
    padding: 5,
    borderRadius: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    backgroundColor: colors.white[100],
    borderRadius: 2,
    borderColor: colors.black[50],
    borderWidth: 1,
  },
  check: {
    textAlign: 'center',
  },
  container: {
    flex: 1,
    gap: 10,
  },
});
