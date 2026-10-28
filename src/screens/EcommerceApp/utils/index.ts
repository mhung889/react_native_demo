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
