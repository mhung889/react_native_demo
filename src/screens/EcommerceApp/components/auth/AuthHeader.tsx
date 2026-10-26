import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../../themes/color';

type HeaderType = {
  name: string;
  screen?: string;
};

const AuthHeader = ({ name }: HeaderType) => {
  const navigation = useNavigation();

  return (
    <View>
      <Pressable onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back-outline" color={colors.white} size={30} />
      </Pressable>

      <Text style={styles.textHeader}>{name}</Text>
    </View>
  );
};

export default AuthHeader;

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
