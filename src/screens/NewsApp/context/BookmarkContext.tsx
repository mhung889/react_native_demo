import { NewType } from '../types/news';
import { storage, BOOKMARK_KEY } from '../store/storage';
import React, { createContext, useContext, useState } from 'react';

type TodoContextType = {
  // getBookmarks: () => NewType[];
  addBookmark: (news: NewType, category: string) => void;
  removeBookMark: (news: NewType) => void;
  checkNewsExist: (news: NewType) => boolean;
  bookMarks: NewType[];
  setBookMarks: React.Dispatch<React.SetStateAction<NewType[]>>;
};

const BookMarkContext = createContext<TodoContextType | undefined>(undefined);

export function BookMarkProvider({ children }: { children: React.ReactNode }) {
  const [bookMarks, setBookMarks] = useState<NewType[]>(() => {
    const data = storage.getString(BOOKMARK_KEY);

    if (!data) {
      return [];
    }

    try {
      return JSON.parse(data);
    } catch {
      return [];
    }
  });

  const addBookmark = (news: NewType, category: string) => {
    const exists = bookMarks.some((item) => item.url === news.url);

    if (exists) {
      return;
    }

    const newSaved = { ...news, category };

    const newBookmarks = [...bookMarks, newSaved];
    setBookMarks(newBookmarks);

    storage.set(BOOKMARK_KEY, JSON.stringify(newBookmarks));
  };

  const removeBookMark = (news: NewType) => {
    const newBookmarks = bookMarks.filter((b) => b.url !== news.url);
    setBookMarks(newBookmarks);
    storage.set(BOOKMARK_KEY, JSON.stringify(newBookmarks));
  };

  const checkNewsExist = (news: NewType) => {
    const exist = bookMarks.find((bookmark) => bookmark.url === news.url);
    if (exist) {
      return true;
    }
    return false;
  };

  const value: TodoContextType = {
    addBookmark,
    removeBookMark,
    checkNewsExist,
    bookMarks,
    setBookMarks,
  };

  return <BookMarkContext.Provider value={value}>{children}</BookMarkContext.Provider>;
}

export const useBookMark = () => {
  const context = useContext(BookMarkContext);

  if (!context) {
    throw new Error('useBookMark must be used within BookMarkProvider');
  }

  return context;
};
