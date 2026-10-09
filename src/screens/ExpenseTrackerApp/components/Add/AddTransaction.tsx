import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, Pressable, View } from 'react-native';
import { Category, Transaction, TransactionType } from '../../types/transaction';
import { colors } from '../../theme/colors';
import { Dropdown } from 'react-native-element-dropdown';
import { CATEGORIES_EXPENSE, CATEGORIES_INCOME } from '../../constants';
import RenderCategory from './RenderCategory';
import { getCategoriesByType } from '../../utils';
import { loadTransactions, saveTransactions } from '../../store/mmkvStore';

type AddTransactionProps = {
  type: TransactionType;
  onClose: () => void;
};

const AddTransaction = ({ type, onClose }: AddTransactionProps) => {
  const [amount, setAmount] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Category | ''>('');

  const isExpense = type === 'expense';

  const handleSubmit = () => {
    if (!amount || !title.trim() || !category) {
      return;
    }

    const categories = getCategoriesByType(type);

    const isValidCategory = categories.some((item: any) => item.value === category);

    if (!isValidCategory) {
      return;
    }

    const transaction: Transaction = {
      id: String(Math.random() + 1),
      type,
      amount: Number(amount),
      category,
      title,
      date: new Date().toISOString(),
    };

    console.log(transaction);

    const transactionList = loadTransactions();
    console.log(transactionList);

    setAmount('');
    setTitle('');
    onClose();
  };

  const renderCategoryItem = (item: any) => {
    return <RenderCategory item={item} />;
  };

  console.log(category);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isExpense ? 'Add Expense' : 'Add Income'}</Text>

      <Text style={styles.label}>Amount</Text>

      <View style={styles.amountContainer}>
        <Text style={styles.currency}>$</Text>

        <TextInput
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          placeholder="0"
          style={styles.amountInput}
        />
      </View>

      <Text style={styles.label}>Title</Text>

      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder={isExpense ? 'Lunch' : 'Salary'}
        style={styles.input}
      />

      <Text style={styles.label}>Category</Text>
      {type === 'expense' ? (
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={CATEGORIES_EXPENSE}
          labelField="label" // field trong tung item CATEGORIES_INCOME de hien thi
          valueField="value" // field trong tung item CATEGORIES_INCOME de set gia tri
          placeholder="Select Category"
          value={category}
          onChange={(item) => setCategory(item.value)}
          //render dropdown
          renderItem={renderCategoryItem}
        />
      ) : (
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={CATEGORIES_INCOME}
          labelField="label" // field trong tung item CATEGORIES_INCOME de hien thi
          valueField="value" // field trong tung item CATEGORIES_INCOME de set gia tri
          placeholder="Select Category"
          value={category}
          onChange={(item) => {
            setCategory(item.value);
          }}
          //render dropdown
          renderItem={renderCategoryItem}
        />
      )}

      <Pressable
        style={[styles.button, isExpense ? styles.expenseButton : styles.incomeButton]}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>{isExpense ? 'Add Expense' : 'Add Income'}</Text>
      </Pressable>
    </View>
  );
};

export default AddTransaction;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 24,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: colors.text,
  },

  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    height: 52,
    paddingHorizontal: 14,
    marginBottom: 18,
  },

  currency: {
    fontSize: 18,
    fontWeight: '600',
    marginRight: 8,
  },

  amountInput: {
    flex: 1,
    fontSize: 18,
  },

  input: {
    height: 52,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 16,
    marginBottom: 24,
  },

  button: {
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  expenseButton: {
    backgroundColor: colors.expense,
  },

  incomeButton: {
    backgroundColor: colors.income,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },

  containerDropDown: {
    padding: 16,
  },
  dropdown: {
    padding: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    // marginHorizontal: 12,
    marginBottom: 12,
  },
  placeholderStyle: {
    fontSize: 15,
    color: '#999',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#000',
  },
});
