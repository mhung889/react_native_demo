import { StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import { colors } from '../../themes/color';

const FormInput = ({
  text,
  onChange,
  value,
  onBlur,
}: {
  text: any;
  onChange: any;
  value: any;
}) => {
  // console.log(inputProps); // inputProps tuong duong voi {value, onChange, onBlur}
  return (
   
  );
};

export default FormInput;

const styles = StyleSheet.create({
  item: {
    backgroundColor: colors.dark,
    padding: 12,
    height: 55,
    paddingHorizontal: 15,
  },
  labelInput: {
    color: colors.gray,
    fontSize: 10,
  },
  textInput: {
    color: colors.ordinaryText,
    fontSize: 16,
  },
});
