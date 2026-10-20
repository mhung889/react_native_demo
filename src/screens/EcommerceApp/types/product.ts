export type ReviewType = {
  rating: number;
  comment: string;
  date: Date;
  reviewerName?: string;
};

export type ProductType = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand?: string;
  reviews: ReviewType[];
  thumbnail: string;
  images: string[];
};
