import React, { useCallback, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '../../theme/colors';
import { IconCheckMark } from '../../assets/svg';
import { SCREENS } from '../../navigation/SCREENS';
import { AuthScreensProps } from './GetStartedScreen';
import ButtonHeader from '../../components/common/ButtonHeader';
import HeaderAuth from '../../components/auth/header/HeaderAuth';

const PasswordRecoveryScreen = ({ navigation }: AuthScreensProps) => {
  const [email, setEmail] = useState('');

  const handleNavigateSignIn = useCallback(() => {
    if (!email) {
      return;
    }
    navigation.push(SCREENS.VERIFY_IDENTITY);
  }, [navigation, email]);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderAuth title="Password Recovery" description="Enter your email to recover your password" />
      <View style={styles.main}>
        <View style={styles.inputContainer}>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            placeholderTextColor={colors['Neutral-100']}
            style={styles.input}
          />
          <IconCheckMark width={24} height={24} style={styles.iconCheckMark} />
        </View>

        <ButtonHeader title="Sign In" handleNavigate={handleNavigateSignIn} />
      </View>
    </SafeAreaView>
  );
};

export default PasswordRecoveryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  main: {
    marginHorizontal: 35,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 24,
    marginBottom: 4,
  },

  input: {
    flex: 1,
    paddingVertical: 12,
    paddingLeft: 16,
    color: colors['Neutral-800'],
    lineHeight: 20,
    fontSize: 15,
  },

  iconCheckMark: {
    marginRight: 16,
  },
});
