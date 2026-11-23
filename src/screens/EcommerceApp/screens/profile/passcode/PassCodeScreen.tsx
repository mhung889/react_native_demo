// import * as Keychain from 'react-native-keychain';
// import React, { useCallback, useEffect, useState } from 'react';
// import type { TextInputProps } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Alert, Platform, StyleSheet, Text, TouchableOpacity } from 'react-native';
// import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';

// import { colors } from '../../../themes/color';
// import { useFocusEffect } from '@react-navigation/native';
// import { NativeStackScreenProps } from '@react-navigation/native-stack';
// import { ProfileStackParamList } from '../../../navigation/types';
// import { SCREENS } from '../../../navigation/SCREENS';

// const CELL_COUNT = 6;
// const autoComplete = Platform.select<TextInputProps['autoComplete']>({
//   android: 'sms-otp',
//   default: 'one-time-code',
// });

// const KEYCHAIN_SERVICE = 'pass-code1';

// type PassCodeProps = NativeStackScreenProps<ProfileStackParamList, typeof SCREENS.PROFILE_PASSCODE>;

// const PassCodeScreen = ({ navigation }: PassCodeProps) => {
//   const [value, setValue] = useState('');
//   const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
//   const [props, getCellOnLayoutHandler] = useClearByFocusCell({
//     value,
//     setValue,
//   });

//   type PasscodeMode = 'loading' | 'create' | 'confirm' | 'verify';

//   const [mode, setMode] = useState<PasscodeMode>('loading');
//   const [firstPasscode, setFirstPasscode] = useState('');
//   const [savedPasscode, setSavedPasscode] = useState('');

//   useEffect(() => {
//     if (value.length !== CELL_COUNT || mode === 'loading') return;

//     const handlePassCode = async () => {
//       const enteredPasscode = value;

//       //VERIFY
//       if (mode === 'verify') {
//         if (enteredPasscode === savedPasscode) {
//           Alert.alert('Success', 'PassCode correct');
//         } else {
//           Alert.alert('Error', 'PassCode incorrect');
//         }
//         setValue('');
//       }
//       //CREATE
//       if (mode === 'create') {
//         setFirstPasscode(enteredPasscode);
//         setMode('confirm');
//         setValue('');
//         return;
//       }
//       //CONFIRM
//       if (mode === 'confirm') {
//         if (enteredPasscode !== firstPasscode) {
//           setValue('');
//           Alert.alert('Error', 'PassCode not match');
//           return;
//         }
//         try {
//           await Keychain.setGenericPassword('test-passcode', enteredPasscode, {
//             service: KEYCHAIN_SERVICE,
//           });
//           setSavedPasscode(enteredPasscode);
//           setMode('verify');
//           setValue('');
//           Alert.alert('Success', 'PassCode match');
//           return;
//         } catch {
//           Alert.alert('Error', 'Cannot save passcode');
//           setValue('');
//         }
//       }
//     };

//     handlePassCode();
//   }, [mode, savedPasscode, value, firstPasscode]);

//   useEffect(() => {
//     const loadingPassCode = async () => {
//       try {
//         const credentials = await Keychain.getGenericPassword({ service: KEYCHAIN_SERVICE });
//         if (credentials) {
//           setSavedPasscode(credentials.password);
//           setMode('verify');
//         } else {
//           setMode('create');
//         }
//       } catch (error) {
//         console.log('Errror', error);
//         Alert.alert('Error', 'Cannot loading PassCode ');
//       }
//     };
//     loadingPassCode();
//   }, []);

//   useFocusEffect(
//     useCallback(() => {
//       return () => {
//         setValue('');
//         navigation.goBack();
//       };
//     }, [navigation]),
//   );

//   return (
//     <SafeAreaView style={styles.root}>
//       <Text style={styles.title}>
//         {mode === 'loading'
//           ? 'Loading...'
//           : mode === 'create'
//           ? 'Create new Passcode'
//           : mode === 'confirm'
//           ? 'Confirm your Passcode'
//           : mode === 'verify'
//           ? 'Enter your Passcode'
//           : 'Passcode completed'}
//       </Text>

//       <CodeField
//         ref={ref}
//         {...props}
//         value={value}
//         onChangeText={setValue}
//         cellCount={CELL_COUNT}
//         rootStyle={styles.codeFieldRoot}
//         keyboardType="number-pad"
//         textContentType="oneTimeCode"
//         autoComplete={autoComplete}
//         testID="my-code-input"
//         renderCell={({ index, symbol, isFocused }) => (
//           <Text
//             key={index}
//             style={[styles.cell, isFocused && styles.focusCell]}
//             onLayout={getCellOnLayoutHandler(index)}
//           >
//             {symbol || (isFocused && <Cursor />)}
//           </Text>
//         )}
//       />

//       <TouchableOpacity style={styles.btnClear} onPress={() => setValue('')}>
//         <Text style={styles.clearText}>{'Clear All'}</Text>
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// };

// export default PassCodeScreen;

// const styles = StyleSheet.create({
//   root: { flex: 1, padding: 20, backgroundColor: colors.background },
//   title: {
//     textAlign: 'center',
//     fontSize: 36,
//     fontWeight: '600',
//     color: colors.white,
//   },
//   codeFieldRoot: {
//     marginTop: 20,
//   },
//   cell: {
//     width: 50,
//     height: 50,
//     lineHeight: 45,
//     fontSize: 30,
//     borderWidth: 2,
//     borderColor: '#fff',
//     textAlign: 'center',
//     color: '#fff', // text color
//     backgroundColor: colors.dark,
//   },
//   focusCell: {
//     borderColor: 'red',
//   },

//   btnClear: {
//     alignItems: 'center',
//     marginVertical: 30,
//   },
//   clearText: {
//     fontSize: 20,
//     color: colors.white,
//   },
// });

import * as Keychain from 'react-native-keychain';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, AppState, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { useFocusEffect } from '@react-navigation/native';

import { colors } from '../../../themes/color';

const CELL_COUNT = 6;

const KEYCHAIN_SERVICE = 'pass-code1';
const LOCKOUT_SERVICE = 'pass-code-lockout-222';

const LOCKOUT_3_ATTEMPTS = 30 * 1000; // 30 giây
const LOCKOUT_5_ATTEMPTS = 5 * 60 * 1000; // 5 phút

type PasscodeMode = 'loading' | 'create' | 'confirm' | 'verify' | 'error';

type LockoutData = {
  attempts: number;
  lockUntil: number | null;
};

const PassCodeScreen = () => {
  const [value, setValue] = useState('');
  const [mode, setMode] = useState<PasscodeMode>('loading');

  const [firstPasscode, setFirstPasscode] = useState('');
  const [savedPasscode, setSavedPasscode] = useState('');

  const [countFailedAttempts, setCountFailedAttempts] = useState(0);
  const [lockUntil, setLockUntil] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState(Date.now());

  const ref = useBlurOnFulfill({
    value,
    cellCount: CELL_COUNT,
  });

  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const isProcessing = useRef(false);

  // lockUntil: thời điểm kết thúc khoá
  const remainingSeconds = lockUntil ? Math.max(0, Math.ceil((lockUntil - currentTime) / 1000)) : 0;
  const isLocked = remainingSeconds > 0;

  const formatCountdown = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remaining = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remaining).padStart(2, '0')}`;
  };
  const saveLockoutData = async (attempts: number, lockedUntil: number | null) => {
    const data: LockoutData = {
      attempts,
      lockUntil: lockedUntil,
    };
    await Keychain.setGenericPassword('lockout', JSON.stringify(data), {
      service: LOCKOUT_SERVICE,
    });
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const [credentials, lockoutCredentials] = await Promise.all([
          Keychain.getGenericPassword({
            service: KEYCHAIN_SERVICE,
          }),
          Keychain.getGenericPassword({
            service: LOCKOUT_SERVICE,
          }),
        ]);
        let attempts = 0;
        let storedLockUntil: number | null = null;
        if (lockoutCredentials) {
          try {
            const data = JSON.parse(lockoutCredentials.password) as LockoutData;
            if (typeof data.attempts === 'number' && Number.isFinite(data.attempts)) {
              attempts = Math.max(0, Math.min(5, Math.floor(data.attempts)));
            }
            if (typeof data.lockUntil === 'number' && Number.isFinite(data.lockUntil)) {
              storedLockUntil = data.lockUntil;
            }
          } catch {
            attempts = 0;
            storedLockUntil = null;
          }
        }
        // đung để kiếm tra ví dụ khoá 30s từ 10:00:00 -> 10:00:30,
        // nêú 10:00:20 mình vào app thì nó kiểm tra storedLockUntil <= now không thoả mãn đièu kiện nên không cần saveLockoutData(attempts, null);
        // nếu 10:00:50 mình vào app nó sẽ kiểm tra storedLockUntil <= now hết hạn rồi thì phải lockUntil = null
        const now = Date.now();
        if (storedLockUntil !== null && storedLockUntil <= now) {
          storedLockUntil = null;
          if (attempts >= 5) {
            attempts = 0;
          }
          await saveLockoutData(attempts, null);
        }
        setCurrentTime(now);
        setCountFailedAttempts(attempts);
        setLockUntil(storedLockUntil);
        if (credentials) {
          setSavedPasscode(credentials.password);
          setMode('verify');
        } else {
          setMode('create');
        }
      } catch (error) {
        console.error('Cannot load Passcode:', error);
        setMode('error');
        Alert.alert('Error', 'Cannot load Passcode');
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (!lockUntil) return;
    const updateTime = () => {
      setCurrentTime(Date.now());
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    // Update countdown immediately when returning to foreground.
    const subscription = AppState.addEventListener('change', (state) => {
      if (state === 'inactive') {
        // inactive: van dem khi tat ung dung
        // active: chi dem khi vao ung dung
        updateTime();
      }
    });
    return () => {
      clearInterval(interval);
      subscription.remove();
    };
  }, [lockUntil]);

  useEffect(() => {
    if (!lockUntil || currentTime < lockUntil) return;
    const resetAfterLockout = async () => {
      const shouldResetAttempts = countFailedAttempts > 5;
      const nextAttempts = shouldResetAttempts ? 0 : countFailedAttempts;
      setLockUntil(null);
      if (shouldResetAttempts) {
        setCountFailedAttempts(0);
      }
      try {
        await saveLockoutData(nextAttempts, null);
      } catch (error) {
        console.error('Cannot update lockout data:', error);
      }
    };
    resetAfterLockout();
  }, [currentTime, lockUntil, countFailedAttempts]);

  useEffect(() => {
    if (value.length !== CELL_COUNT || mode === 'loading' || isLocked || isProcessing.current) {
      return;
    }
    isProcessing.current = true;
    const enteredPasscode = value;

    const handlePassCode = async () => {
      try {
        if (mode === 'verify') {
          // PIN chính xác
          if (enteredPasscode === savedPasscode) {
            setCountFailedAttempts(0);
            setLockUntil(null);
            await saveLockoutData(0, null);
            setValue('');
            Alert.alert('Success', 'Passcode is correct');
            return;
          }
          // PIN không chính xác
          const nextAttempts = countFailedAttempts + 1;
          let newLockUntil: number | null = null;
          if (nextAttempts === 3) {
            newLockUntil = Date.now() + LOCKOUT_3_ATTEMPTS;
          } else if (nextAttempts === 5) {
            newLockUntil = Date.now() + LOCKOUT_5_ATTEMPTS;
          }
          setValue('');
          setCountFailedAttempts(nextAttempts);
          setLockUntil(newLockUntil);
          await saveLockoutData(nextAttempts, newLockUntil);

          if (nextAttempts === 3) {
            Alert.alert('Too many attempts', 'You entered the wrong Passcode 3 times. Please wait 30 seconds.');
          } else if (nextAttempts >= 5) {
            Alert.alert('Account temporarily locked', 'You entered the wrong Passcode 5 times. Please wait 5 minutes.');
          }
          return;
        }
        if (mode === 'create') {
          setFirstPasscode(enteredPasscode);
          setMode('confirm');
          setValue('');
          return;
        }
        if (mode === 'confirm') {
          if (enteredPasscode !== firstPasscode) {
            setValue('');
            Alert.alert('Error', 'Passcodes do not match. Please try again.');
            return;
          }

          await Keychain.setGenericPassword('test-passcode', enteredPasscode, { service: KEYCHAIN_SERVICE });

          setSavedPasscode(enteredPasscode);
          setMode('verify');
          setValue('');

          Alert.alert('Success', 'Passcode created successfully');
          return;
        }
      } catch (error) {
        console.error('Passcode error:', error);
        setValue('');
        Alert.alert('Error', 'Something went wrong. Please try again.');
      } finally {
        // Chỉ cho phép xử lý lần nhập tiếp theo
        isProcessing.current = false;
      }
    };

    handlePassCode();
  }, [value, mode, savedPasscode, firstPasscode, countFailedAttempts, isLocked]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setValue('');
      };
    }, []),
  );

  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.title}>
        {mode === 'loading'
          ? 'Loading...'
          : mode === 'create'
          ? 'Create new Passcode'
          : mode === 'confirm'
          ? 'Confirm your Passcode'
          : isLocked
          ? 'Passcode temporarily locked'
          : 'Enter your Passcode'}
      </Text>
      {mode === 'verify' && isLocked && (
        <>
          <Text style={styles.countdown}>{formatCountdown(remainingSeconds)}</Text>
          <Text style={styles.lockDescription}>Please wait before trying again.</Text>
        </>
      )}
      {(mode === 'create' || mode === 'confirm' || mode === 'verify') && (
        <>
          <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            editable={!isLocked}
            testID="my-code-input"
            renderCell={({ index, symbol, isFocused }) => (
              <Text
                key={index}
                style={[styles.cell, isFocused && styles.focusCell, isLocked && styles.disabledCell]}
                onLayout={getCellOnLayoutHandler(index)}
              >
                {symbol || (isFocused && !isLocked && <Cursor />)}
              </Text>
            )}
          />
          {mode === 'verify' && !isLocked && (
            <Text style={styles.attemptText}>
              {countFailedAttempts > 0 ? `${countFailedAttempts}/5 failed attempts` : 'Enter your 6-digit Passcode'}
            </Text>
          )}
          <TouchableOpacity
            style={styles.btnClear}
            disabled={isLocked || value.length === 0}
            onPress={() => setValue('')}
          >
            <Text style={[styles.clearText, (isLocked || value.length === 0) && styles.disabledText]}>Clear All</Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
};

export default PassCodeScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
  },

  title: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: '600',
    color: colors.white,
  },

  codeFieldRoot: {
    marginTop: 30,
  },

  cell: {
    width: 50,
    height: 50,
    lineHeight: 45,
    fontSize: 30,
    borderWidth: 2,
    borderColor: '#fff',
    textAlign: 'center',
    color: '#fff',
    backgroundColor: colors.dark,
  },

  focusCell: {
    borderColor: 'red',
  },

  disabledCell: {
    opacity: 0.4,
  },

  countdown: {
    marginTop: 15,
    textAlign: 'center',
    fontSize: 42,
    fontWeight: '700',
    color: colors.white,
  },

  lockDescription: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 15,
    color: '#AAAAAA',
  },

  attemptText: {
    marginTop: 15,
    textAlign: 'center',
    fontSize: 14,
    color: '#AAAAAA',
  },

  btnClear: {
    alignItems: 'center',
    marginVertical: 30,
  },

  clearText: {
    fontSize: 18,
    color: colors.white,
  },

  disabledText: {
    opacity: 0.4,
  },

  btnBack: {
    alignItems: 'center',
    marginTop: 30,
  },
});
