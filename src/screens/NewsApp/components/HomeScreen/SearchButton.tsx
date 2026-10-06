import { View, TextInput, StyleSheet } from 'react-native';
import React from 'react';
import { FontAwesomeFreeSolid } from '@react-native-vector-icons/fontawesome-free-solid';
import { colors } from '../../theme/colors';

type SearchProp = {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};

// https://newsapi.org/v2/everything?q=bitcoin&apiKey=e7a6e8095f04422c83990f92894ef6b6&searchIn=title&pageSize=6&page=1

export default function SearchButton({ searchTerm, setSearchTerm }: SearchProp) {
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
