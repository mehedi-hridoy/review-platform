"use client";

import { useState } from "react";

import { createProduct } from "@/lib/api";

interface ProductFormProps {
  onSuccess: () => void;
}

export default function ProductForm({
  onSuccess,
}: ProductFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await createProduct({
        title,
        description,
        image_url: imageUrl || null,
      });

      setTitle("");
      setDescription("");
      setImageUrl("");

      onSuccess();
    } catch (err) {
      console.error(err);
      setError("Failed to create product.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
    >
      <h2 className="mb-6 text-2xl font-bold text-black">
        Add Product
      </h2>

      {error && (
        <p className="mb-4 text-red-600">{error}</p>
      )}

      <div className="mb-4">
        <label className="mb-2 block font-medium text-black">
          Title
        </label>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded border border-gray-300 p-3 text-black"
          placeholder="Product title"
          required
        />
      </div>

      <div className="mb-4">
        <label className="mb-2 block font-medium text-black">
          Description
        </label>

        <textarea
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          className="w-full rounded border border-gray-300 p-3 text-black"
          placeholder="Product description"
          rows={3}
          required
        />
      </div>

      <div className="mb-6">
        <label className="mb-2 block font-medium text-black">
          Image URL
        </label>

        <input
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full rounded border border-gray-300 p-3 text-black"
          placeholder="https://example.com/image.jpg (optional)"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="rounded bg-black px-6 py-2 text-white transition hover:bg-gray-800 disabled:bg-gray-400"
      >
        {loading ? "Adding..." : "Add Product"}
      </button>
    </form>
  );
}
