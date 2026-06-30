"use client";

import { useEffect, useState } from "react";
import { deleteProduct } from "@/lib/api";
import { Product } from "@/types/product";
import api from "@/lib/api";
import Modal from "@/components/Modal";

interface ProductListProps {
  refreshTrigger: number;
}

export default function ProductList({ refreshTrigger }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState<
    "loading" | "success" | "error"
  >("loading");
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const response = await api.get<Product[]>("/products");
        setProducts(response.data ?? []);
        setError("");
      } catch (err) {
        console.error(err);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [refreshTrigger]);

  async function handleDelete(id: number) {
    if (!confirm("Are you sure you want to delete this product?")) return;

    setDeletingId(id);
    setModalOpen(true);
    setModalStatus("loading");
    setModalMessage("Deleting product...");

    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      setModalStatus("success");
      setModalMessage("Product deleted successfully!");
      setTimeout(() => setModalOpen(false), 1500);
    } catch (err) {
      console.error(err);
      setModalStatus("error");
      setModalMessage("Failed to delete product.");
      setTimeout(() => setModalOpen(false), 2000);
    } finally {
      setDeletingId(null);
    }
  }

  if (loading && products.length === 0) {
    return (
      <div className="mt-10 space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="skeleton h-16 w-full" />
        ))}
      </div>
    );
  }

  if (error && products.length === 0) {
    return (
      <p className="mt-10 text-sm" style={{ color: "var(--danger)" }}>
        {error}
      </p>
    );
  }

  if (products.length === 0) {
    return (
      <div
        className="mt-10 flex flex-col items-center justify-center rounded-2xl py-12"
        style={{
          background: "var(--surface-1)",
          border: "1px solid var(--border)",
        }}
      >
        <div
          className="mb-3 text-3xl"
          style={{ color: "var(--neutral-700)" }}
        >
          📦
        </div>
        <p
          className="text-sm"
          style={{ color: "var(--neutral-500)" }}
        >
          No products yet. Add one above.
        </p>
      </div>
    );
  }

  return (
    <>
      <Modal
        isOpen={modalOpen}
        title={
          modalStatus === "loading"
            ? "Processing"
            : modalStatus === "success"
              ? "Success!"
              : "Error"
        }
        message={modalMessage}
        status={modalStatus}
      />

      <div className="mt-10">
        <h2
          className="mb-4 text-lg font-semibold tracking-[-0.01em]"
          style={{ color: "var(--neutral-50)" }}
        >
          Products
          <span
            className="ml-2 text-sm font-normal"
            style={{ color: "var(--neutral-500)" }}
          >
            ({products.length})
          </span>
        </h2>

        <div className="space-y-2 stagger-children">
          {products.map((product) => (
            <div
              key={product.id}
              className="group flex items-center justify-between rounded-xl px-4 py-3.5 transition-all duration-200"
              style={{
                background: "var(--surface-1)",
                border: "1px solid var(--border)",
              }}
            >
              <div className="flex-1 min-w-0">
                <p
                  className="text-sm font-medium truncate"
                  style={{ color: "var(--neutral-100)" }}
                >
                  {product.title}
                </p>
                <p
                  className="mt-0.5 text-[13px] truncate"
                  style={{ color: "var(--neutral-500)" }}
                >
                  {product.description}
                </p>
              </div>

              <button
                onClick={() => handleDelete(product.id)}
                disabled={deletingId === product.id}
                className="focus-ring ml-4 shrink-0 rounded-lg px-3.5 py-2 text-[13px] font-medium transition-all duration-200 disabled:opacity-40"
                style={{
                  background: "rgba(239, 68, 68, 0.08)",
                  border: "1px solid rgba(239, 68, 68, 0.15)",
                  color: "var(--danger)",
                }}
              >
                {deletingId === product.id ? "Deleting..." : "Delete"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
