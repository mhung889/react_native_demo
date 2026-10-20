/*
  React-hook-form & yup
*/
import React, { useCallback } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { FontAwesomeFreeSolid } from '@react-native-vector-icons/fontawesome-free-solid';

import Header from '../../../components/auth/Header';
import Footer from '../../../components/auth/Footer';
import TextInputTitle from '../../../components/TextInputTitle';

import { colors } from '../../../themes/color';
import { SCREENS } from '../../../navigation/SCREENS';
import { useForm, Controller } from 'react-hook-form';
import { signInSchema } from '../../../validation/signInSchema';
import { useSignInLogic } from './SignIn.logic';
import { authService } from '../../../services/authService';
import { useAuthStore } from '../../../store/auth.store';

const SignIn = () => {
  const { navigation, signIn } = useSignInLogic();

  const {
    control,
    handleSubmit,
    // formState: { errors },
  } = useForm({
    resolver: yupResolver(signInSchema),
    mode: 'onBlur',
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = useCallback(
    async (data: { username: string; password: string }) => {
      try {
        const listUsers = (await authService.findAllUser()) || [];

        const existUserName = listUsers.some((user: any) => user.username === data.username.toLowerCase().trim());
        if (!existUserName) {
          Alert.alert('Error', 'user name khong ton tai');
          return;
        }
        await signIn(data);
      } catch {
        let message = useAuthStore.getState().error;
        Alert.alert('Error', message ?? 'Loi ...');
      }
    },
    [signIn],
  );

  const handleLogin = useCallback(() => {
    handleSubmit(onSubmit)();
  }, [handleSubmit, onSubmit]);

  return (
    <SafeAreaView style={styles.container}>
      <Header name="Login" />

      <View style={styles.formContainer}>
        <Controller
          control={control}
          name="username"
          render={({ field: { onChange, onBlur, value }, fieldState: { error, isTouched } }) => (
            <TextInputTitle
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholderText="username"
              //
              touched={isTouched}
              errors={error?.message}
            />
          )}
        />
        {/* <Text style={styles.inputError}>
          {errors.username ? errors.username.message : ''}
        </Text> */}

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value }, fieldState: { isTouched, error } }) => (
            <TextInputTitle
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              isShowRightElement={true}
              secureTextEntry={true}
              returnKeyType="done"
              autoCapitalize="none"
              placeholderText="password"
              autoComplete="current-password"
              //
              touched={isTouched}
              errors={error?.message}
            />
          )}
        />
        {/* <Text style={styles.inputError}>
          {errors.password ? errors.password.message : ''}
        </Text> */}
      </View>

      {/* Forgot password */}
      <Pressable
        style={styles.forgotPassword}
        onPress={() => {
          navigation.navigate(SCREENS.FORGOT_PASSWORD);
        }}
      >
        <Text style={styles.forgotPasswordText}>Forgot your password</Text>
        <FontAwesomeFreeSolid name="arrow-right-long" size={20} color={'red'} />
      </Pressable>
      {/* Submit */}
      <Pressable onPress={handleLogin}>
        <Text style={styles.buttonText}> {'LOGIN'} </Text>
      </Pressable>

      <Footer />
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 10,
  },

  formContainer: {
    marginTop: 50,
    gap: 6,
  },

  inputError: {
    color: colors.primary,
  },

  forgotPassword: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 10,
    alignItems: 'center',
  },

  forgotPasswordText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '600',
  },

  buttonText: {
    textAlign: 'center',
    backgroundColor: colors.primary,
    color: colors.ordinaryText,
    padding: 16,
    marginVertical: 30,
    marginHorizontal: 30,
    borderRadius: 30,
  },
});

/*
  Formik & yup
*/
// import { Formik } from 'formik';
// import React from 'react';
// import {
//   View,
//   Text,
//   Pressable,
//   StyleSheet,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { signInSchema } from '../../../validation/signInSchema';
// import Header from '../../../components/auth/Header';
// import { colors } from '../../../themes/color';
// import { FontAwesomeFreeSolid } from '@react-native-vector-icons/fontawesome-free-solid';
// import Footer from '../../../components/auth/Footer';
// import { SCREENS } from '../../../navigation/SCREENS';
// import { useSignInLogic } from './SignIn.logic';
// import TextInputTitle from '../../../components/TextInputTitle';
// import PasswordInputTitle from '../../../components/PasswordInputTitle';

// type SignInValues = {
//   username: string;
//   password: string;
// };

// const initialValues: SignInValues = {
//   username: '',
//   password: '',
// };

// export default function SignIn() {
//   const { onSubmit, navigation } = useSignInLogic();

//   return (
//     <SafeAreaView style={styles.container}>
//       <KeyboardAvoidingView
//         style={styles.flex}
//         behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//       >
//         <ScrollView
//           contentContainerStyle={styles.scrollContent}
//           keyboardShouldPersistTaps="handled"
//           showsVerticalScrollIndicator={false}
//         >
//           <Header name="Login" />

//           <Formik<SignInValues>
//             initialValues={initialValues}
//             validationSchema={signInSchema}
//             onSubmit={onSubmit}
//           >
//             {({
//               values,
//               errors,
//               touched,
//               handleChange,
//               handleBlur,
//               handleSubmit,
//               isSubmitting,
//             }) => (
//               <View style={styles.form}>
//                 <TextInputTitle
//                   onChangeText={handleChange('username')}
//                   onBlur={handleBlur('username')}
//                   value={values.username}
//                   errors={errors.username}
//                   touched={touched.username}
//                   field={'username'}
//                   placeholderText="user name"
//                 />

//                 {/* Password */}
//                 <PasswordInputTitle
//                   onChangeText={handleChange('password')}
//                   onBlur={handleBlur('password')}
//                   value={values.password}
//                   touched={touched.password}
//                   errors={errors.password}
//                   placeholderText="Password"
//                 />

//                 {/* Forgot password */}
//                 <Pressable
//                   style={styles.forgotPassword}
//                   onPress={() => {
//                     navigation.navigate(SCREENS.FORGOT_PASSWORD);
//                   }}
//                 >
//                   <Text style={styles.forgotPasswordText}>
//                     Forgot your password
//                   </Text>
//                   <FontAwesomeFreeSolid
//                     name="arrow-right-long"
//                     size={20}
//                     color={'red'}
//                   />
//                 </Pressable>

//                 {/* Submit */}
//                 <Pressable
//                   onPress={() => handleSubmit()}
//                   disabled={isSubmitting}
//                   style={({ pressed }) => [
//                     styles.submitButton,
//                     isSubmitting && styles.submitButtonDisabled,
//                     pressed && !isSubmitting && styles.submitButtonPressed,
//                   ]}
//                 >
//                   <Text style={styles.submitButtonText}>
//                     {isSubmitting ? 'LOGIN PENDING...' : 'LOGIN'}
//                   </Text>
//                 </Pressable>
//               </View>
//             )}
//           </Formik>
//           <Footer />
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   flex: {
//     flex: 1,
//   },

//   container: {
//     flex: 1,
//     backgroundColor: colors.background,
//   },

//   scrollContent: {
//     flexGrow: 1,
//     paddingHorizontal: 20,
//     paddingTop: 12,
//     paddingBottom: 32,
//   },

//   form: {
//     gap: 20,
//     marginTop: 70,
//   },

//   field: {
//     gap: 9,
//   },

//   label: {
//     color: colors.white,
//     fontSize: 14,
//     fontWeight: '600',
//   },

//   inputContainer: {
//     minHeight: 54,
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 12,
//     paddingHorizontal: 15,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: colors.gray,
//     backgroundColor: colors.dark,
//   },

//   inputError: {
//     borderColor: '#ef4444',
//   },

//   input: {
//     flex: 1,
//     minHeight: 52,
//     color: colors.white,
//     fontSize: 15,
//     paddingVertical: 10,
//   },

//   errorText: {
//     color: '#f87171',
//     fontSize: 12,
//     lineHeight: 17,
//   },

//   forgotPassword: {
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//     gap: 10,
//     alignItems: 'center',
//   },

//   forgotPasswordText: {
//     color: colors.white,
//     fontSize: 13,
//     fontWeight: '600',
//   },

//   submitButton: {
//     minHeight: 54,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 14,
//     backgroundColor: colors.primary,
//     marginTop: 26,
//   },

//   submitButtonDisabled: {
//     opacity: 0.6,
//   },

//   submitButtonPressed: {
//     opacity: 0.85,
//   },

//   submitButtonText: {
//     color: colors.white,
//     fontSize: 15,
//     fontWeight: '700',
//     letterSpacing: 0.7,
//   },

//   footerText: {
//     color: colors.gray,
//     fontSize: 12,
//     textAlign: 'center',
//     marginTop: 8,
//   },
// });
