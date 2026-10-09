import { CATEGORIES_EXPENSE, CATEGORIES_INCOME } from '../constants';
import { TransactionType } from '../types/transaction';

export function getCategoriesByType(type: TransactionType) {
  return type === 'income' ? CATEGORIES_INCOME : CATEGORIES_EXPENSE;
}
