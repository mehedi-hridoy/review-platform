"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types/product";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await api.get<Product[]>("/products");
        setProducts(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <main className="min-h-screen px-6 py-12">
        <div className="mx-auto max-w-7xl">
          {/* Header skeleton */}
          <div className="mb-12 space-y-3">
            <div className="skeleton h-10 w-64" />
            <div className="skeleton h-5 w-96" />
          </div>
          {/* Cards skeleton */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="skeleton h-[340px] rounded-2xl" />
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6">
        <div className="text-center">
          <div
            className="mb-4 text-4xl"
            style={{ color: "var(--neutral-700)" }}
          >
            ⚠️
          </div>
          <p
            className="text-sm font-medium"
            style={{ color: "var(--danger)" }}
          >
            {error}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 py-12">
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="mb-12 animate-fade-in">
          <h1
            className="text-3xl font-bold tracking-[-0.025em] sm:text-4xl"
            style={{ color: "var(--neutral-50)" }}
          >
            Discover Products
          </h1>
          <p
            className="mt-2 text-base"
            style={{ color: "var(--neutral-500)" }}
          >
            Browse and review the latest products
          </p>

          {/* Search */}
          <div className="mt-6 max-w-md">
            <div className="relative">
              <svg
                className="absolute left-3.5 top-1/2 -translate-y-1/2"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--neutral-500)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="focus-ring w-full rounded-xl py-2.5 pl-10 pr-4 text-sm transition-colors duration-200"
                style={{
                  background: "var(--surface-1)",
                  border: "1px solid var(--border)",
                  color: "var(--neutral-100)",
                }}
              />
            </div>
          </div>
        </div>

        {/* Product count */}
        <div className="mb-6 flex items-center gap-2">
          <span
            className="text-[13px] font-medium"
            style={{ color: "var(--neutral-500)" }}
          >
            {filteredProducts.length}{" "}
            {filteredProducts.length === 1 ? "product" : "products"}
            {searchQuery && " found"}
          </span>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div
            className="animate-fade-in flex flex-col items-center justify-center rounded-2xl py-20"
            style={{
              background: "var(--surface-1)",
              border: "1px solid var(--border)",
            }}
          >
            <div
              className="mb-3 text-4xl"
              style={{ color: "var(--neutral-700)" }}
            >
              🔍
            </div>
            <p
              className="text-sm"
              style={{ color: "var(--neutral-500)" }}
            >
              {searchQuery
                ? "No products match your search."
                : "No products available yet."}
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 stagger-children">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}