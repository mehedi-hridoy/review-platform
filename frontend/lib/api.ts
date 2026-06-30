import axios from "axios";

import { Product, ProductDetail } from "@/types/product";
import { ReviewCreate } from "@/types/review";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function getProducts() {
  const response = await api.get<Product[]>("/products");
  return response.data;
}

export async function getProduct(id: number) {
  const response = await api.get<ProductDetail>(
    `/products/${id}`
  );

  return response.data;
}



export async function createReview(
  review: ReviewCreate
) {
  const response = await api.post(
    "/reviews",
    review
  );

  return response.data;
}

export default api;