import Link from "next/link";
import RatingStars from "./RatingStars";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.id}`}
      id={`product-card-${product.id}`}
      className="group block overflow-hidden rounded-2xl transition-all duration-300"
      style={{
        background: "var(--surface-1)",
        border: "1px solid var(--border)",
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: "220px" }}>
        <img
          src={
            product.image_url ||
            "https://placehold.co/600x400/18181b/3f3f46?text=No+Image&font=inter"
          }
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-60"
          style={{
            background:
              "linear-gradient(to top, var(--surface-1) 0%, transparent 60%)",
            opacity: 0.8,
          }}
        />
      </div>

      {/* Content */}
      <div className="space-y-3 px-5 pb-5 pt-1">
        <h2
          className="text-lg font-semibold tracking-[-0.01em] transition-colors duration-200"
          style={{ color: "var(--neutral-50)" }}
        >
          {product.title}
        </h2>

        <RatingStars rating={product.average_rating} size="sm" />

        <div className="flex items-center justify-between">
          <span
            className="text-[13px] font-medium"
            style={{ color: "var(--neutral-500)" }}
          >
            {product.review_count}{" "}
            {product.review_count === 1 ? "Review" : "Reviews"}
          </span>

          <span
            className="flex items-center gap-1 text-[13px] font-medium transition-all duration-200 group-hover:gap-2"
            style={{ color: "var(--accent)" }}
          >
            View
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}