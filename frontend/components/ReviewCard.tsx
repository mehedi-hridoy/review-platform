import RatingStars from "./RatingStars";

import { Review } from "@/types/review";

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({
  review,
}: ReviewCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          {review.user}
        </h3>

        <RatingStars rating={review.rating} />
      </div>

      <p className="text-gray-600">
        {review.comment}
      </p>
    </div>
  );
}