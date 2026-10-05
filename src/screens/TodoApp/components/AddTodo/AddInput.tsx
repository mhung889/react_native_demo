import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { colors } from '../../theme/color';
import { useTodoContext } from '../../contexts/TodoContext';
import { TodoItemType } from '../../types';

export default function AddInput() {
  const [title, setTitle] = useState('');

  const { setTodos } = useTodoContext();

  const handleAddTodo = () => {
    setTodos((prev: TodoItemType[]) => {
      console.log(prev);
      const newTodo: TodoItemType = {
        id: String(Math.random() + 100),
        title,
        isCompleted: false,
        isImportant: false,
        isDeleted: false,
      };
      return [...prev, newTodo];
    });
    setTitle('');
  };

  console.log(title);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter todo..."
        value={title}
        onChangeText={setTitle}
        style={styles.addInput}
      />

      <Pressable style={styles.button}>
        <Text style={styles.textButton} onPress={handleAddTodo}>
          Add
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 10,
    gap: 10,
  },
  addInput: {
    flex: 1,
    borderWidth: 1,
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 8,
  },
  button: {
    justifyContent: 'center',
    backgroundColor: colors.primary.orange,
    // borderWidth: 1,
    borderRadius: 5,
  },
  textButton: {
    color: colors.white[50],
    padding: 1,
  },
});
