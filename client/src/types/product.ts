export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  brand: string;
  image: string;
  images?: string[];
  description?: string;
  specs?: Record<string, string>;
  reviews?: { author: string; rating: number; comment: string }[];
}