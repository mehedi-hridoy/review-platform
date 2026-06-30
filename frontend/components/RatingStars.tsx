interface RatingStarsProps {
  rating: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
}

export default function RatingStars({
  rating,
  size = "md",
  showValue = true,
}: RatingStarsProps) {
  // Guard against null/undefined/NaN rating values
  const safeRating = typeof rating === "number" && !Number.isNaN(rating) ? rating : 0;

  const fullStars = Math.floor(safeRating);
  const hasHalf = safeRating - fullStars >= 0.25 && safeRating - fullStars < 0.75;
  const remaining = Math.max(0, 5 - fullStars - (hasHalf ? 1 : 0));

  const starSize =
    size === "sm"
      ? "text-sm"
      : size === "md"
        ? "text-lg"
        : "text-2xl";

  const valueSize =
    size === "sm"
      ? "text-xs"
      : size === "md"
        ? "text-sm"
        : "text-base";

  return (
    <div className="flex items-center gap-1.5">
      <div className={`flex items-center gap-0.5 ${starSize}`}>
        {/* Full stars */}
        {Array.from({ length: fullStars }).map((_, i) => (
          <span
            key={`full-${i}`}
            style={{ color: "var(--star-filled)" }}
            className="drop-shadow-[0_0_3px_rgba(250,204,21,0.3)]"
          >
            ★
          </span>
        ))}

        {/* Half star */}
        {hasHalf && (
          <span
            key="half"
            className="relative inline-block"
          >
            <span style={{ color: "var(--star-empty)" }}>★</span>
            <span
              className="absolute inset-0 overflow-hidden"
              style={{ width: "50%", color: "var(--star-filled)" }}
            >
              ★
            </span>
          </span>
        )}

        {/* Empty stars */}
        {Array.from({ length: remaining }).map((_, i) => (
          <span
            key={`empty-${i}`}
            style={{ color: "var(--star-empty)" }}
          >
            ★
          </span>
        ))}
      </div>

      {showValue && (
        <span
          className={`font-semibold tabular-nums ${valueSize}`}
          style={{ color: "var(--neutral-300)" }}
        >
          {safeRating.toFixed(1)}
        </span>
      )}
    </div>
  );
}