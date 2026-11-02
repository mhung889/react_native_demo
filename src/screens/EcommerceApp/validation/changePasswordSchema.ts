import * as Yup from 'yup';

export const changePasswordSchema = Yup.object({
  oldPassword: Yup.string().trim().required('Old Password is required'),
  newPassword: Yup.string()
    .trim()
    .required('New Password is required')
    .min(6, 'New Password must be at least 6 characters'),
  repeatPassword: Yup.string()
    .trim()
    .required('Please confirm your new password')
    .oneOf([Yup.ref('newPassword')], 'Password do not match'),
});
