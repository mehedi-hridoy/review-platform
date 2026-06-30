"use client";

interface ModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  status?: "loading" | "success" | "error";
}

export default function Modal({
  isOpen,
  title,
  message,
  status = "loading",
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="rounded-lg bg-white p-8 shadow-lg">
        <div className="flex flex-col items-center text-center">
          {status === "loading" && (
            <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-black" />
          )}

          {status === "success" && (
            <div className="mb-4 text-4xl">✓</div>
          )}

          {status === "error" && (
            <div className="mb-4 text-4xl">✕</div>
          )}

          <h2 className="mb-2 text-lg font-bold text-black">
            {title}
          </h2>

          <p className="text-sm text-gray-600">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}
