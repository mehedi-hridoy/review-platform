"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import api from "@/lib/api";

import ProductCard from "@/components/ProductCard";

import { Product } from "@/types/product";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <h1 className="text-xl">Loading products...</h1>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <h1 className="text-red-500">{error}</h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-center justify-between">
          <h1 className="text-4xl font-bold">
            Review Platform
          </h1>

          <Link
            href="/admin"
            className="rounded bg-gray-800 px-3 py-1 text-sm text-white transition hover:bg-black"
          >
            Manage Products
          </Link>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </div>
    </main>
  );
}