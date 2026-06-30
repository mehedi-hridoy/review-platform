"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import RatingStars from "@/components/RatingStars";
import ReviewCard from "@/components/ReviewCard";
import ReviewForm from "@/components/ReviewForm";

import { getProduct } from "@/lib/api";
import { ProductDetail } from "@/types/product";

export default function ProductDetailsPage() {
  const params = useParams();

  const productId = Number(params.id);

  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchProduct() {
    try {
      setLoading(true);

      const data = await getProduct(productId);

      setProduct(data);
      setError("");
    } catch (error) {
      console.error(error);
      setError("Failed to load product.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!productId || Number.isNaN(productId)) return;

    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <h1 className="text-xl">Loading...</h1>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <h1 className="text-red-500">
          {error || "Product not found."}
        </h1>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl p-10">
      <Link
        href="/"
        className="mb-8 inline-block text-blue-600 hover:underline"
      >
        ← Back
      </Link>

      <img
        src={
          product.image_url ??
          "https://placehold.co/800x500?text=No+Image"
        }
        alt={product.title}
        className="mb-8 h-96 w-full rounded-xl object-cover"
      />

      <h1 className="mb-4 text-4xl font-bold">
        {product.title}
      </h1>

      <RatingStars
        rating={product.average_rating}
      />

      <p className="mt-6 text-lg text-gray-600">
        {product.description}
      </p>

      <h2 className="mt-12 mb-6 text-2xl font-bold">
        Reviews
      </h2>

      {product.reviews.length === 0 ? (
        <p className="text-gray-500">
          No reviews yet.
        </p>
      ) : (
        <div className="space-y-4">
          {product.reviews.map((review, index) => (
            <ReviewCard
              key={index}
              review={review}
            />
          ))}
        </div>
      )}

      <ReviewForm
        productId={product.id}
        onSuccess={fetchProduct}
      />
    </main>
  );
}