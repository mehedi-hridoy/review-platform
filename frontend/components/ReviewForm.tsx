"use client";

import { useEffect, useState } from "react";
import { createReview, getUsers } from "@/lib/api";
import { User } from "@/types/user";

interface ReviewFormProps {
  productId: number;
  onSuccess: () => void;
}

export default function ReviewForm({
  productId,
  onSuccess,
}: ReviewFormProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [userId, setUserId] = useState<number>(0);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [hoverRating, setHoverRating] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      try {
        const data = await getUsers();
        setUsers(data);
        if (data.length > 0) {
          setUserId(data[0].id);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingUsers(false);
      }
    }
    fetchUsers();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      await createReview({
        product_id: productId,
        user_id: userId,
        rating,
        comment,
      });

      setComment("");
      setRating(5);
      setSuccessMessage("Review submitted successfully!");

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);

      onSuccess();
    } catch (error) {
      console.error(error);
      setErrorMessage("Could not submit review. Please try again.");
      setTimeout(() => setErrorMessage(""), 4000);
    } finally {
      setLoading(false);
    }
  }

  if (loadingUsers) {
    return (
      <div className="mt-10 space-y-4">
        <div className="skeleton h-6 w-40" />
        <div className="skeleton h-12 w-full" />
        <div className="skeleton h-12 w-full" />
        <div className="skeleton h-24 w-full" />
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="animate-fade-in mt-10 space-y-6 rounded-2xl p-6"
      style={{
        background: "var(--surface-1)",
        border: "1px solid var(--border)",
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="flex h-8 w-8 items-center justify-center rounded-lg"
          style={{
            background: "var(--accent-muted)",
            color: "var(--accent)",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20h9" />
            <path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z" />
          </svg>
        </div>
        <h2
          className="text-lg font-semibold tracking-[-0.01em]"
          style={{ color: "var(--neutral-50)" }}
        >
          Write a Review
        </h2>
      </div>

      {/* Success message */}
      {successMessage && (
        <div
          className="animate-fade-in flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium"
          style={{
            background: "rgba(34, 197, 94, 0.1)",
            border: "1px solid rgba(34, 197, 94, 0.2)",
            color: "var(--success)",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
          {successMessage}
        </div>
      )}

      {/* Error message */}
      {errorMessage && (
        <div
          className="animate-fade-in flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium"
          style={{
            background: "rgba(239, 68, 68, 0.1)",
            border: "1px solid rgba(239, 68, 68, 0.2)",
            color: "var(--danger)",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
          {errorMessage}
        </div>
      )}

      {/* User select */}
      <div className="space-y-2">
        <label
          className="block text-[13px] font-medium"
          style={{ color: "var(--neutral-400)" }}
        >
          Reviewing as
        </label>
        <select
          value={userId}
          onChange={(e) => setUserId(Number(e.target.value))}
          className="focus-ring w-full cursor-pointer appearance-none rounded-lg px-4 py-3 text-sm transition-colors duration-200"
          style={{
            background: "var(--surface-2)",
            border: "1px solid var(--border)",
            color: "var(--neutral-100)",
          }}
        >
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      {/* Star rating picker */}
      <div className="space-y-2">
        <label
          className="block text-[13px] font-medium"
          style={{ color: "var(--neutral-400)" }}
        >
          Rating
        </label>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              type="button"
              key={value}
              className="cursor-pointer rounded-md p-1 text-2xl transition-all duration-150"
              style={{
                color:
                  value <= (hoverRating || rating)
                    ? "var(--star-filled)"
                    : "var(--star-empty)",
                transform:
                  value <= hoverRating ? "scale(1.15)" : "scale(1)",
                filter:
                  value <= (hoverRating || rating)
                    ? "drop-shadow(0 0 4px rgba(250, 204, 21, 0.4))"
                    : "none",
              }}
              onMouseEnter={() => setHoverRating(value)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(value)}
              aria-label={`Rate ${value} star${value > 1 ? "s" : ""}`}
            >
              ★
            </button>
          ))}
          <span
            className="ml-2 text-sm font-medium tabular-nums"
            style={{ color: "var(--neutral-400)" }}
          >
            {hoverRating || rating}/5
          </span>
        </div>
      </div>

      {/* Comment */}
      <div className="space-y-2">
        <label
          className="block text-[13px] font-medium"
          style={{ color: "var(--neutral-400)" }}
        >
          Your review
        </label>
        <textarea
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="focus-ring w-full resize-none rounded-lg px-4 py-3 text-sm leading-relaxed transition-colors duration-200"
          style={{
            background: "var(--surface-2)",
            border: "1px solid var(--border)",
            color: "var(--neutral-100)",
          }}
          placeholder="Share your thoughts about this product..."
          required
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="focus-ring inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all duration-200 disabled:opacity-40"
        style={{
          background: loading ? "var(--neutral-800)" : "var(--accent)",
          color: loading ? "var(--neutral-400)" : "var(--neutral-950)",
        }}
      >
        {loading ? (
          <>
            <div
              className="h-4 w-4 rounded-full border-2 border-current"
              style={{
                borderTopColor: "transparent",
                animation: "spin 0.6s linear infinite",
              }}
            />
            Submitting...
          </>
        ) : (
          "Submit Review"
        )}
      </button>
    </form>
  );
}