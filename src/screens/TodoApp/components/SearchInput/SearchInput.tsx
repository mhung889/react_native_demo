import { View, TextInput, StyleSheet } from 'react-native';
import React from 'react';
import { colors } from '../../theme/color';
import { useTodoContext } from '../../contexts/TodoContext';

export default function SearchInput() {
  const { setSearch, search } = useTodoContext();

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputText}
        placeholder="Enter Search"
        value={search}
        onChangeText={setSearch}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    marginHorizontal: 10,
    borderRadius: 8,
    backgroundColor: colors.gray[300],
    marginVertical: 8,
  },
  inputText: {
    padding: 6,
    color: colors.black[50],
  },
});
