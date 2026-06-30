export interface Product {
  id: number;
  title: string;
  description: string;
  image_url: string | null;
  created_at: string;
  average_rating: number;
  review_count: number;
}