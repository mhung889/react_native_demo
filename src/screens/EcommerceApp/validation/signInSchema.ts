import * as Yup from 'yup';

export const signInSchema = Yup.object({
  username: Yup.string()
    .trim()
    .required('username khong duoc bo trong')
    .max(100),
  password: Yup.string()
    .trim()
    .required('Vui long nhap password')
    .min(6, 'password co do dai toi thieu 6 ki tu'),
});
