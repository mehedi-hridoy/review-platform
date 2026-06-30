"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const isHome = pathname === "/";
  const isAdmin = pathname === "/admin";

  return (
    <header
      className="sticky top-0 z-40 w-full border-b"
      style={{
        background: "rgba(9, 9, 11, 0.8)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderColor: "var(--border)",
      }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 transition-opacity hover:opacity-80"
        >
          <div
            className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold"
            style={{
              background: "var(--accent-muted)",
              color: "var(--accent)",
              border: "1px solid var(--accent-border)",
            }}
          >
            R
          </div>
          <span className="text-[15px] font-semibold tracking-[-0.01em]" style={{ color: "var(--neutral-50)" }}>
            ReviewDibo
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-1">
          <Link
            href="/"
            className="rounded-lg px-3.5 py-2 text-[13px] font-medium transition-all duration-200"
            style={{
              color: isHome ? "var(--neutral-50)" : "var(--neutral-400)",
              background: isHome ? "var(--accent-muted)" : "transparent",
            }}
          >
            Products
          </Link>

          <Link
            href="/admin"
            className="rounded-lg px-3.5 py-2 text-[13px] font-medium transition-all duration-200"
            style={{
              color: isAdmin ? "var(--neutral-50)" : "var(--neutral-400)",
              background: isAdmin ? "var(--accent-muted)" : "transparent",
            }}
          >
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
