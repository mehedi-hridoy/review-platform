"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import RatingStars from "@/components/RatingStars";
import ReviewCard from "@/components/ReviewCard";
import { getProduct } from "@/lib/api";
import { ProductDetail } from "@/types/product";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ProductDetailsPage({
  params,
}: PageProps) {
  const [product, setProduct] =
    useState<ProductDetail | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    async function loadProduct() {
      try {
        const { id } = await params;

        const data = await getProduct(
          Number(id)
        );

        setProduct(data);
      } catch (error) {
        console.error(error);
        setError(
          "Failed to load product."
        );
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [params]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        Loading...
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <h1>{error}</h1>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl p-10">
      <Link
        href="/"
        className="mb-8 inline-block text-blue-600"
      >
        ← Back
      </Link>

      <img
        src={
          product.image_url ??
          "https://placehold.co/800x500"
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

      <div className="space-y-4">
        {product.reviews.map(
          (review, index) => (
            <ReviewCard
              key={index}
              review={review}
            />
          )
        )}
      </div>
    </main>
  );
}