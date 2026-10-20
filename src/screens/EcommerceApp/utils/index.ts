export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

export const getDiscountPrice = (price: number, discountPercentage: number) => {
  return price * (1 - Math.round(discountPercentage) / 100);
};
