export interface Review {
  user: string;
  rating: number;
  comment: string;
}

export interface ReviewCreate {
  product_id: number;
  user_id: number;
  rating: number;
  comment: string;
}