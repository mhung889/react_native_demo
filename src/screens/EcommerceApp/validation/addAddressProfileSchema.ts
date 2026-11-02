import * as Yup from 'yup';

export const addAddressProfileSchema = Yup.object({
  fullName: Yup.string()
    .trim()
    .required('FullName is required')
    .matches(/^[\p{L}]+(?:\s+[\p{L}]+)+$/u, 'Full name must contain at least 2 words'),
  phoneNumber: Yup.string()
    .trim()
    .required('Phone is required')
    .matches(/^0\d{9}$/, 'Phone number must start with 0 and contain exactly 10 digits'),

  street: Yup.string().trim().required('Street address is required'),

  isDefault: Yup.boolean().default(false),
});
