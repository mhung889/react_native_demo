import React, { createContext, ReactNode, useContext, useState } from 'react';

import { TODO_DATA } from '../constants';
import { TodoItemType } from '../types';

export type TodoContextType = {
  todos: TodoItemType[];
  setTodos: React.Dispatch<React.SetStateAction<TodoItemType[]>>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function ContextProvider({ children }: { children: ReactNode }) {
  const [todos, setTodos] = useState<TodoItemType[]>(TODO_DATA);

  const [search, setSearch] = useState<string>('');

  const value: TodoContextType = {
    todos,
    setTodos,
    search,
    setSearch,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

export function useTodoContext() {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error('useTodoContext must be used within ContextProvider');
  }

  return context;
}
