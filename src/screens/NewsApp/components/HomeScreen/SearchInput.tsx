import { View, TextInput, StyleSheet } from 'react-native';
import React from 'react';
import { FontAwesomeFreeSolid } from '@react-native-vector-icons/fontawesome-free-solid';
import { colors } from '../../theme/colors';

type SearchProp = {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};

export default function SearchInput({ searchTerm, setSearchTerm }: SearchProp) {
  console.log(searchTerm);

  return (
    <View style={styles.container}>
      <FontAwesomeFreeSolid name="magnifying-glass" size={26} color={colors.primary.orange} />
      <TextInput
        style={styles.inputText}
        placeholder="Search News..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    padding: 7,
    marginVertical: 10,
    marginHorizontal: 20,
    borderWidth: 1,
    borderRadius: 8,
  },
  inputText: {
    color: 'black',
  },
});
