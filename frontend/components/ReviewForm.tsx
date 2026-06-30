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

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);

    try {
      await createReview({
        product_id: productId,
        user_id: userId,
        rating,
        comment,
      });

      setComment("");
      setRating(5);

      onSuccess();
    } catch (error) {
      console.error(error);

      alert("Could not submit review.");
    } finally {
      setLoading(false);
    }
  }

  if (loadingUsers) {
    return (
      <div className="mt-10">
        Loading users...
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 space-y-5 rounded-xl bg-white p-6 shadow"
    >
      <h2 className="text-2xl font-bold text-black">
        Leave a Review
      </h2>

      <div>
        <label className="mb-2 block font-medium text-black">
          User
        </label>

        <select
          value={userId}
          onChange={(e) =>
            setUserId(Number(e.target.value))
          }
          className="w-full rounded border p-3 text-black"
        >
          {users.map((user) => (
            <option
              key={user.id}
              value={user.id}
            >
              {user.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block font-medium text-black">
          Rating
        </label>

        <select
          value={rating}
          onChange={(e) =>
            setRating(Number(e.target.value))
          }
          className="w-full rounded border p-3 text-black"
        >
          {[1, 2, 3, 4, 5].map((value) => (
            <option
              key={value}
              value={value}
            >
              {value}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block font-medium text-black">
          Comment
        </label>

        <textarea
          rows={4}
          value={comment}
          onChange={(e) =>
            setComment(e.target.value)
          }
          className="w-full rounded border p-3 text-black"
          required
        />
      </div>

      <button
        disabled={loading}
        className="rounded bg-black px-6 py-3 text-white transition hover:bg-gray-800 disabled:opacity-50"
      >
        {loading
          ? "Submitting..."
          : "Submit Review"}
      </button>
    </form>
  );
}