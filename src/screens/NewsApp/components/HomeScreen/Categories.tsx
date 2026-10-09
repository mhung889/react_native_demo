import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { CATEGORIES } from '../../constant/';
import { colors } from '../../theme/colors';

type CategoryProps = {
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  handleCategoryPress: (category: string) => void;
};

export default function Categories({ category, setCategory, handleCategoryPress }: CategoryProps) {
  // console.log(CATEGORIES);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.headerCate}>{'Categories'}</Text>
      </View>
      <View style={styles.item}>
        {/* {CATEGORIES.map((c) => (
          <Pressable key={c} onPress={() => setCategory(c)}>
            <Text
              style={[
                styles.label,
                { color: c === category ? colors.primary.orange : colors.black[50] },
              ]}
            >
              {`[${c}]`}
            </Text>
          </Pressable>
        ))} */}

        {CATEGORIES.map((c) => (
          <Pressable key={c} onPress={() => handleCategoryPress(c)}>
            <Text
              style={[
                styles.label,
                { color: c === category ? colors.primary.orange : colors.black[50] },
              ]}
            >
              {`[${c}]`}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  item: {
    flexDirection: 'row',
    gap: 5,
    marginVertical: 5,
    flexWrap: 'wrap',
  },
  headerCate: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  label: {
    // color: 'black',
    fontSize: 18,
  },
});
