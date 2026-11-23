import OnboardingImage1 from '../assets/Onboarding1.png';
import OnboardingImage2 from '../assets/Onboarding2.png';
import OnboardingImage3 from '../assets/Onboarding3.png';

export type SlideDataType = {
  key: number;
  title: string;
  description: string;
  image: number;
};

export const SLIDES_DATA = [
  {
    key: 1,
    title: 'Diverse & sparkling food.',
    description: 'We use the best local ingredients to create fresh and delicious food and drinks.',
    image: OnboardingImage1,
  },
  {
    key: 2,
    title: 'Free shipping on all orders',
    description: 'Free shipping on the primary order whilst the usage of CaPay fee method.',
    image: OnboardingImage2,
  },
  {
    key: 3,
    title: '+24K Restaurants',
    description: 'Easily find your favorite food and have it delivered in record time.',
    image: OnboardingImage3,
  },
];
