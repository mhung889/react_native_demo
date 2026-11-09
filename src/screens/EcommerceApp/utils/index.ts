export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};

export const getDiscountPrice = (price: number, discountPercentage: number) => {
  return price * (1 - Math.round(discountPercentage) / 100);
};

export const capitalizeFirstLetter = (text: string): string => {
  return text.charAt(0).toUpperCase().concat(text.slice(1));
};

export const getPriceBySize = (basePrice: number, size: string) => {
  switch (size) {
    case 'M':
      return basePrice + 30;
    case 'L':
      return basePrice + 50;
    default:
      return basePrice;
  }
};

export const formatCardNumber = (value: string): string => {
  // Chỉ giữ lại chữ số
  const digits = value.replace(/\D/g, '').slice(0, 16);

  // Thêm khoảng trắng sau mỗi 4 chữ số
  return digits.replace(/(\d{4})(?=\d)/g, '$1 ');
};

// 4242 4242 4242 4242 => **** **** **** 4242
export const transformCardNumber = (value: string) => {
  const digits = value.replace(/\D/g, ''); // loai bo khoang trang
  const masked = '*'.repeat(Math.max(0, digits.length - 4));
  const result = masked + digits.slice(-4);
  return result.replace(/(.{4})/g, '$1 ').trim();
};
