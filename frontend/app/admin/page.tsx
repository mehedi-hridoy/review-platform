"use client";

import { useState } from "react";
import ProductForm from "@/components/ProductForm";
import ProductList from "@/components/ProductList";

export default function AdminPage() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  function handleProductAdded() {
    setRefreshTrigger((prev) => prev + 1);
  }

  return (
    <main className="min-h-screen px-6 py-12">
      <div className="mx-auto max-w-2xl">
        {/* Page header */}
        <div className="mb-10 animate-fade-in">
          <h1
            className="text-3xl font-bold tracking-[-0.025em]"
            style={{ color: "var(--neutral-50)" }}
          >
            Product Management
          </h1>
          <p
            className="mt-2 text-sm"
            style={{ color: "var(--neutral-500)" }}
          >
            Add, manage, and remove products from the platform.
          </p>
        </div>

        <div className="animate-fade-in">
          <ProductForm onSuccess={handleProductAdded} />
        </div>

        <ProductList refreshTrigger={refreshTrigger} />
      </div>
    </main>
  );
}
