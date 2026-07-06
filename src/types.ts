export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  wholesalePrice: number; // in KSh (Kenya Shillings) or equivalent
  retailPrice: number;
  moq: number; // Minimum Order Quantity
  stock: number;
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  isSpecialOffer?: boolean;
  discountPercentage?: number;
  features?: string[];
  reviews?: ProductReview[];
}

export interface ProductReview {
  id: string;
  reviewerName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Category {
  id: string;
  name: string;
  iconName: string; // Lucide icon name or image path
  image: string;
  count: number;
  description: string;
}

export interface Brand {
  id: string;
  name: string;
  logoUrl?: string;
  description?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  businessName: string;
  location: string;
  comment: string;
  rating: number;
  image: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'ordering' | 'delivery' | 'payment';
}

export interface RetailerUser {
  id: string;
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  businessType: string;
  location: string;
  isApproved: boolean;
}

export interface WholesaleInquiry {
  id: string;
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  businessType: string;
  estimatedMonthlyBudget: string;
  message: string;
  submittedAt: string;
}
