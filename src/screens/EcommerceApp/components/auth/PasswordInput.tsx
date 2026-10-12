import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { colors } from '../../themes/color';

const PasswordInput = () => {
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={colors.ordinaryText}
        onChangeText={setPassword}
        secureTextEntry={!isPasswordVisible}
        value={password}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TouchableOpacity
        onPress={() => setIsPasswordVisible(!isPasswordVisible)}
        style={styles.eyeButton}
        activeOpacity={0.7}
        accessibilityRole="button"
      >
        <Ionicons
          name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
          size={22}
          color="#999"
        />
      </TouchableOpacity>
    </View>
  );
};

export default PasswordInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: colors.dark,
    height: 55,
  },
  input: {
    flex: 1,
    height: 50,
    color: colors.white,
    fontSize: 16,
  },
  eyeButton: {
    padding: 5,
  },
});
