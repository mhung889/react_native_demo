import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { colors } from '../../themes/color';
import { Link, useNavigation } from '@react-navigation/native';

type HeaderType = {
  name: string;
  screen: string;
};

const Header = ({ name, screen }: HeaderType) => {
  const navigation = useNavigation();

  return (
    <View>
      {/* <Link screen={screen} params={{}}>
        <Ionicons name="chevron-back-outline" color={colors.white} size={30} />
      </Link> */}

      <Pressable onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back-outline" color={colors.white} size={30} />
      </Pressable>

      <Text style={styles.textHeader}>{name}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  textHeader: {
    padding: 30,
    color: colors.white,
    fontSize: 39,
    top: 20,
    right: 20,
    fontWeight: 'bold',
  },
});
