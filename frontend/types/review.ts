export interface Review {
  user: string;
  rating: number;
  comment: string;
}

export interface ProductDetail {
  id: number;
  title: string;
  description: string;
  image_url: string | null;
  created_at: string;
  average_rating: number;
  review_count: number;
  reviews: Review[];
}