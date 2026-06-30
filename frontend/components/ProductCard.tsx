import Link from "next/link";

import RatingStars from "./RatingStars";

import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({
  product,
}: ProductCardProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-lg">
      <img
        src={
          product.image_url ||
          "https://placehold.co/600x400?text=No+Image"
        }
        alt={product.title}
        className="h-52 w-full object-cover"
      />

      <div className="space-y-4 p-5">
        <h2 className="text-xl font-bold text-gray-900">
          {product.title}
        </h2>

        <RatingStars rating={product.average_rating} />

        <p className="text-sm text-gray-500">
          {product.review_count} Reviews
        </p>

        <Link
          href={`/products/${product.id}`}
          className="inline-block rounded-lg bg-black px-4 py-2 text-white transition hover:bg-gray-800"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}