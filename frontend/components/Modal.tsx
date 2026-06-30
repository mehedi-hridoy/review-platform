"use client";

interface ModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  status?: "loading" | "success" | "error";
  onClose?: () => void;
}

export default function Modal({
  isOpen,
  title,
  message,
  status = "loading",
  onClose,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        background: "rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(4px)",
        animation: "overlayIn 0.2s ease both",
      }}
      onClick={onClose}
    >
      <div
        className="animate-fade-in-scale w-full max-w-sm rounded-2xl p-8"
        style={{
          background: "var(--surface-2)",
          border: "1px solid var(--border)",
          boxShadow: "0 24px 48px rgba(0, 0, 0, 0.4)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center text-center">
          {status === "loading" && (
            <div
              className="mb-5 h-12 w-12 rounded-full border-[3px]"
              style={{
                borderColor: "var(--neutral-700)",
                borderTopColor: "var(--accent)",
                animation: "spin 0.7s linear infinite",
              }}
            />
          )}

          {status === "success" && (
            <div
              className="mb-5 flex h-12 w-12 items-center justify-center rounded-full text-2xl"
              style={{
                background: "rgba(34, 197, 94, 0.12)",
                border: "1px solid rgba(34, 197, 94, 0.25)",
                color: "var(--success)",
              }}
            >
              ✓
            </div>
          )}

          {status === "error" && (
            <div
              className="mb-5 flex h-12 w-12 items-center justify-center rounded-full text-2xl"
              style={{
                background: "rgba(239, 68, 68, 0.12)",
                border: "1px solid rgba(239, 68, 68, 0.25)",
                color: "var(--danger)",
              }}
            >
              ✕
            </div>
          )}

          <h2
            className="mb-1.5 text-base font-semibold"
            style={{ color: "var(--neutral-50)" }}
          >
            {title}
          </h2>

          <p
            className="text-sm leading-relaxed"
            style={{ color: "var(--neutral-400)" }}
          >
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}
