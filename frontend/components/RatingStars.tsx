interface RatingStarsProps {
  rating: number;
}

export default function RatingStars({
  rating,
}: RatingStarsProps) {
  const fullStars = Math.round(rating);

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <span
          key={index}
          className={`text-xl ${
            index < fullStars
              ? "text-yellow-400"
              : "text-gray-300"
          }`}
        >
          ★
        </span>
      ))}

      <span className="ml-2 text-sm text-gray-600">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}