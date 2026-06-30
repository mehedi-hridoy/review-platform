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
      <main className="min-h-screen px-6 py-10">
        <div className="mx-auto max-w-4xl">
          <div className="skeleton mb-8 h-5 w-20" />
          <div className="skeleton mb-8 h-[400px] w-full rounded-2xl" />
          <div className="skeleton mb-4 h-10 w-72" />
          <div className="skeleton mb-2 h-5 w-40" />
          <div className="skeleton mt-6 h-20 w-full" />
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6">
        <div className="text-center">
          <div className="mb-4 text-4xl" style={{ color: "var(--neutral-700)" }}>
            ⚠️
          </div>
          <p className="mb-4 text-sm font-medium" style={{ color: "var(--danger)" }}>
            {error || "Product not found."}
          </p>
          <Link
            href="/"
            className="text-sm font-medium transition-colors duration-200"
            style={{ color: "var(--accent)" }}
          >
            ← Back to products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-4xl">
        {/* Back link */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium transition-all duration-200 hover:gap-2.5"
          style={{ color: "var(--neutral-400)" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
          Back to products
        </Link>

        {/* Hero image */}
        <div
          className="animate-fade-in mb-8 overflow-hidden rounded-2xl"
          style={{ border: "1px solid var(--border)" }}
        >
          <img
            src={
              product.image_url ??
              "https://placehold.co/800x500/18181b/3f3f46?text=No+Image&font=inter"
            }
            alt={product.title}
            className="h-[400px] w-full object-cover"
          />
        </div>

        {/* Product info */}
        <div className="animate-fade-in mb-10">
          <h1
            className="mb-3 text-3xl font-bold tracking-[-0.025em] sm:text-4xl"
            style={{ color: "var(--neutral-50)" }}
          >
            {product.title}
          </h1>

          <div className="mb-4 flex items-center gap-3">
            <RatingStars rating={product.average_rating} size="lg" />
            <span
              className="text-sm"
              style={{ color: "var(--neutral-500)" }}
            >
              ·
            </span>
            <span
              className="text-sm"
              style={{ color: "var(--neutral-500)" }}
            >
              {product.review_count}{" "}
              {product.review_count === 1 ? "review" : "reviews"}
            </span>
          </div>

          <p
            className="max-w-2xl text-base leading-relaxed"
            style={{ color: "var(--neutral-400)" }}
          >
            {product.description}
          </p>
        </div>

        {/* Divider */}
        <div
          className="mb-10"
          style={{ borderTop: "1px solid var(--border)" }}
        />

        {/* Reviews section */}
        <div className="animate-fade-in">
          <h2
            className="mb-6 text-xl font-semibold tracking-[-0.01em]"
            style={{ color: "var(--neutral-50)" }}
          >
            Reviews
            <span
              className="ml-2 text-sm font-normal"
              style={{ color: "var(--neutral-500)" }}
            >
              ({product.reviews.length})
            </span>
          </h2>

          {product.reviews.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center rounded-2xl py-12"
              style={{
                background: "var(--surface-1)",
                border: "1px solid var(--border)",
              }}
            >
              <div
                className="mb-3 text-3xl"
                style={{ color: "var(--neutral-700)" }}
              >
                💬
              </div>
              <p
                className="text-sm"
                style={{ color: "var(--neutral-500)" }}
              >
                No reviews yet. Be the first!
              </p>
            </div>
          ) : (
            <div className="space-y-3 stagger-children">
              {product.reviews.map((review, index) => (
                <ReviewCard key={index} review={review} />
              ))}
            </div>
          )}
        </div>

        {/* Review form */}
        <ReviewForm productId={product.id} onSuccess={fetchProduct} />
      </div>
    </main>
  );
}