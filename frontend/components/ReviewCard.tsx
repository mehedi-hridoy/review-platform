import RatingStars from "./RatingStars";
import { Review } from "@/types/review";

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  // Guard against missing user name
  const userName = review.user || "Anonymous";

  // Generate a consistent avatar color from the user's name
  const hue =
    userName
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0) % 360;

  return (
    <div
      className="animate-fade-in rounded-xl p-5 transition-all duration-200"
      style={{
        background: "var(--surface-1)",
        border: "1px solid var(--border)",
      }}
    >
      <div className="mb-3 flex items-start justify-between gap-4">
        {/* User info */}
        <div className="flex items-center gap-3">
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold"
            style={{
              background: `hsl(${hue}, 50%, 20%)`,
              color: `hsl(${hue}, 60%, 70%)`,
              border: `1px solid hsl(${hue}, 40%, 30%)`,
            }}
          >
            {userName.charAt(0).toUpperCase()}
          </div>

          <div>
            <h3
              className="text-sm font-semibold leading-tight"
              style={{ color: "var(--neutral-100)" }}
            >
              {userName}
            </h3>
          </div>
        </div>

        {/* Rating */}
        <RatingStars rating={review.rating} size="sm" showValue={false} />
      </div>

      <p
        className="text-[14px] leading-relaxed"
        style={{ color: "var(--neutral-400)" }}
      >
        {review.comment || "No comment provided."}
      </p>
    </div>
  );
}