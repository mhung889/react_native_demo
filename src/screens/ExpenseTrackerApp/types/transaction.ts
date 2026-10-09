// income: thu nhập, expense: chi phí
export type TransactionType = 'income' | 'expense';

export type Category =
  | 'food'
  | 'transport'
  | 'shopping'
  | 'entertaiment'
  | 'health'
  | 'other'
  | 'salary'
  | 'freelance';

export type Transaction = {
  id: string;
  type: TransactionType;
  amount: number;
  category: Category;
  title: string;
  note?: string;
  date: string;
  createdAt?: string;
};
