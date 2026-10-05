import { FlatList } from 'react-native';
import React from 'react';
import { TodoItemType } from '../../types';
import RenderItem from './RenderItem';
import { useTodoContext } from '../../contexts/TodoContext';

const TodoList = () => {
  const { todos, setTodos, search } = useTodoContext();

  const renderItem = ({ item }: { item: TodoItemType }) => {
    console.log(item);
    return <RenderItem item={item} setTodos={setTodos} />;
  };

  const filterTodos = todos.filter(
    (todo) => !todo.isDeleted && todo?.title.toLowerCase().includes(search.toLowerCase()),
  );

  console.log(filterTodos);

  return (
    <>
      <FlatList data={filterTodos} keyExtractor={(item) => item.id} renderItem={renderItem} />
    </>
  );
};

export default TodoList;
