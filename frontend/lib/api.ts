import axios from "axios";

import { Product, ProductDetail } from "@/types/product";
import { ReviewCreate } from "@/types/review";
import { User } from "@/types/user";

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

export async function getUsers() {
  const response = await api.get<User[]>("/users");

  return response.data;
}

export async function createProduct(data: {
  title: string;
  description: string;
  image_url: string | null;
}) {
  const response = await api.post<Product>(
    "/products",
    data
  );

  return response.data;
}

export async function deleteProduct(id: number) {
  await api.delete(`/products/${id}`);
}

export default api;