import * as Yup from 'yup';

// Luhn algorithm
const isValidLuhn = (cardNumber: string): boolean => {
  let sum = 0;
  let shouldDouble = false;
  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = Number(cardNumber[i]);
    if (shouldDouble) {
      digit *= 2;

      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
};

export const addNewCardSchema = Yup.object({
  nameCard: Yup.string().trim().required('Name Card is required'),

  cardNumber: Yup.string()
    .transform((value) => value?.replace(/[\s-]/g, ''))
    .required('Card number is required')
    .test('visa-card', 'Please enter a valid Visa card number', (value) => {
      if (!value) return true;

      const isValidFormat = /^4(?:\d{15})$/.test(value);

      return isValidFormat && isValidLuhn(value);
    }),

  expireDate: Yup.string()
    .trim()
    .required('Expiration date is required')
    .matches(/^(0[1-9]|1[0-2])\/(\d{2}|\d{4})$/, 'Expiration date must be MM/YY or MM/YYYY')
    .test('not-expired', 'Your card has expired', (value) => {
      if (!value || !/^(0[1-9]|1[0-2])\/(\d{2}|\d{4})$/.test(value)) {
        return true;
      }

      const [month, year] = value.split('/');
      const currentDate = new Date();

      const expirationMonth = Number(month);
      const rawYear = Number(year);
      const expirationYear = year.length === 2 ? 2000 + rawYear : rawYear;

      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth() + 1;

      return expirationYear > currentYear || (expirationYear === currentYear && expirationMonth >= currentMonth);
    }),

  cvv: Yup.string()
    .required('CVV is required')
    .matches(/^\d{3}$/, 'CVV must contain exactly 3 digits'),
});
