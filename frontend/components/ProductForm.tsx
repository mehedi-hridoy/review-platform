"use client";

import { useState } from "react";
import { createProduct } from "@/lib/api";
import Modal from "@/components/Modal";

interface ProductFormProps {
  onSuccess: () => void;
}

export default function ProductForm({ onSuccess }: ProductFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState<
    "loading" | "success" | "error"
  >("loading");
  const [modalMessage, setModalMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setModalOpen(true);
    setModalStatus("loading");
    setModalMessage("Creating product...");

    try {
      await createProduct({
        title,
        description,
        image_url: imageUrl || null,
      });

      setTitle("");
      setDescription("");
      setImageUrl("");

      setModalStatus("success");
      setModalMessage("Product added successfully!");

      setTimeout(() => {
        setModalOpen(false);
        onSuccess();
      }, 1500);
    } catch (err) {
      console.error(err);
      setModalStatus("error");
      setModalMessage("Failed to create product.");
      setTimeout(() => setModalOpen(false), 2000);
    } finally {
      setLoading(false);
    }
  }

  const inputStyle = {
    background: "var(--surface-2)",
    border: "1px solid var(--border)",
    color: "var(--neutral-100)",
  };

  return (
    <>
      <Modal
        isOpen={modalOpen}
        title={
          modalStatus === "loading"
            ? "Adding Product"
            : modalStatus === "success"
              ? "Success!"
              : "Error"
        }
        message={modalMessage}
        status={modalStatus}
      />

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl p-6 space-y-5"
        style={{
          background: "var(--surface-1)",
          border: "1px solid var(--border)",
        }}
      >
        <div className="flex items-center gap-3 mb-1">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-lg text-sm"
            style={{
              background: "var(--accent-muted)",
              color: "var(--accent)",
            }}
          >
            +
          </div>
          <h2
            className="text-lg font-semibold tracking-[-0.01em]"
            style={{ color: "var(--neutral-50)" }}
          >
            Add Product
          </h2>
        </div>

        <div className="space-y-2">
          <label
            className="block text-[13px] font-medium"
            style={{ color: "var(--neutral-400)" }}
          >
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="focus-ring w-full rounded-lg px-4 py-3 text-sm transition-colors duration-200"
            style={inputStyle}
            placeholder="Product title"
            required
          />
        </div>

        <div className="space-y-2">
          <label
            className="block text-[13px] font-medium"
            style={{ color: "var(--neutral-400)" }}
          >
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="focus-ring w-full resize-none rounded-lg px-4 py-3 text-sm leading-relaxed transition-colors duration-200"
            style={inputStyle}
            placeholder="Product description"
            rows={3}
            required
          />
        </div>

        <div className="space-y-2">
          <label
            className="block text-[13px] font-medium"
            style={{ color: "var(--neutral-400)" }}
          >
            Image URL
            <span
              className="ml-1.5 font-normal"
              style={{ color: "var(--neutral-600)" }}
            >
              (optional)
            </span>
          </label>
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="focus-ring w-full rounded-lg px-4 py-3 text-sm transition-colors duration-200"
            style={inputStyle}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="focus-ring rounded-lg px-5 py-2.5 text-sm font-semibold transition-all duration-200 disabled:opacity-40"
          style={{
            background: loading ? "var(--neutral-800)" : "var(--accent)",
            color: loading ? "var(--neutral-400)" : "var(--neutral-950)",
          }}
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </>
  );
}
