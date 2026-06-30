"use client";

import { useState } from "react";

import Link from "next/link";

import ProductForm from "@/components/ProductForm";
import ProductList from "@/components/ProductList";

export default function AdminPage() {
  const [refreshTrigger, setRefreshTrigger] =
    useState(0);

  function handleProductAdded() {
    setRefreshTrigger((prev) => prev + 1);
  }

  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/"
          className="mb-8 inline-block text-blue-600 hover:text-blue-800"
        >
          ← Back to Home
        </Link>

        <h1 className="mb-10 text-4xl font-bold">
          Product Management
        </h1>

        <ProductForm onSuccess={handleProductAdded} />

        <ProductList refreshTrigger={refreshTrigger} />
      </div>
    </main>
  );
}
