import { View, Text, Pressable, StyleSheet, Alert } from 'react-native';
import React from 'react';
import { TodoItemType } from '../../types';
import { FontAwesomeFreeSolid } from '@react-native-vector-icons/fontawesome-free-solid/static';
import { colors } from '../../theme/color';

type RenderItemProps = {
  item: TodoItemType;
  setTodos: React.Dispatch<React.SetStateAction<TodoItemType[]>>;
};

const RenderItem = ({ item, setTodos }: RenderItemProps) => {
  //handle
  const handleImportant = (id: string) => {
    setTodos((prev: TodoItemType[]) => {
      return prev.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isImportant: !todo.isImportant,
          };
        }
        return todo;
      });
    });
  };

  const handleDelete = (id: string) => {
    Alert.alert('Delete', 'You want to delete this task?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          setTodos((prev: TodoItemType[]) => {
            return prev.map((todo) => {
              if (todo.id === id) {
                return {
                  ...todo,
                  isDeleted: true,
                };
              }
              return todo;
            });
          });
        },
      },
    ]);
  };

  const handleCheckbox = (id: string) => {
    setTodos((prev: TodoItemType[]) => {
      return prev.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isCompleted: !todo.isCompleted,
          };
        }
        return todo;
      });
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Pressable style={styles.checkbox} onPress={() => handleCheckbox(item.id)}>
          {item.isCompleted && (
            <FontAwesomeFreeSolid name="check" size={20} color="green" style={[styles.check]} />
          )}
        </Pressable>
        <Text style={styles.title}> {item.title} </Text>
      </View>
      <View style={styles.item}>
        <Pressable onPress={() => handleImportant(item.id)}>
          <FontAwesomeFreeSolid
            name="star"
            size={30}
            color={item.isImportant ? colors.green[500] : colors.green[100]}
          />
        </Pressable>
        <FontAwesomeFreeSolid
          name="trash-can"
          size={30}
          color={colors.primary.orange}
          onPress={() => handleDelete(item.id)}
        />
      </View>
    </View>
  );
};

export default RenderItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    marginHorizontal: 10,
  },
  item: {
    flexDirection: 'row',
    gap: 10,
  },
  title: {
    fontSize: 20,
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
});
