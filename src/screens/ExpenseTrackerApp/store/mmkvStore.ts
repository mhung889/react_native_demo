import { createMMKV } from 'react-native-mmkv';

export const store = createMMKV();

const STORAGE_KEY = '@expense_tracker_transactions';

export function loadTransactions() {
  const data = store.getString(STORAGE_KEY);

  if (!data) {
    return [];
  }
  return JSON.parse(data);
}

export function saveTransactions(data: unknown) {
  store.set(STORAGE_KEY, JSON.stringify(data));
}
