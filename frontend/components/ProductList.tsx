"use client";

import { useEffect, useState } from "react";

import { deleteProduct } from "@/lib/api";
import { Product } from "@/types/product";
import api from "@/lib/api";
import Modal from "@/components/Modal";

interface ProductListProps {
  refreshTrigger: number;
}

export default function ProductList({
  refreshTrigger,
}: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<
    number | null
  >(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState<
    "loading" | "success" | "error"
  >("loading");
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const response = await api.get<Product[]>(
          "/products"
        );

        setProducts(response.data);
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
    if (
      !confirm(
        "Are you sure you want to delete this product?"
      )
    ) {
      return;
    }

    setDeletingId(id);
    setModalOpen(true);
    setModalStatus("loading");
    setModalMessage("Deleting product...");

    try {
      await deleteProduct(id);

      setProducts((prev) =>
        prev.filter((p) => p.id !== id)
      );

      setModalStatus("success");
      setModalMessage("Product deleted successfully!");

      setTimeout(() => {
        setModalOpen(false);
      }, 1500);
    } catch (err) {
      console.error(err);
      setModalStatus("error");
      setModalMessage("Failed to delete product.");

      setTimeout(() => {
        setModalOpen(false);
      }, 2000);
    } finally {
      setDeletingId(null);
    }
  }

  if (loading && products.length === 0) {
    return <p className="py-6 text-gray-600">Loading products...</p>;
  }

  if (error && products.length === 0) {
    return <p className="py-6 text-red-600">{error}</p>;
  }

  if (products.length === 0) {
    return (
      <p className="py-6 text-gray-600">
        No products yet.
      </p>
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
        <h2 className="mb-6 text-2xl font-bold text-black">
          Products
        </h2>

        <div className="space-y-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between rounded border border-gray-200 bg-white p-4"
            >
              <div className="flex-1">
                <p className="font-medium text-black">
                  {product.title}
                </p>

                <p className="text-sm text-gray-600">
                  {product.description}
                </p>
              </div>

              <button
                onClick={() => handleDelete(product.id)}
                disabled={deletingId === product.id}
                className="ml-4 rounded bg-red-600 px-4 py-2 text-white transition hover:bg-red-700 disabled:bg-gray-400"
              >
                {deletingId === product.id
                  ? "Deleting..."
                  : "Delete"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
