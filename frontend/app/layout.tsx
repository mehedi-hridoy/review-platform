import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ReviewDibo — Product Reviews",
  description:
    "Discover and review products on ReviewDibo. Read honest reviews, submit your feedback, and find the best products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="noise min-h-screen flex flex-col font-sans">
        <Navbar />
        <div className="flex-1">{children}</div>
      </body>
    </html>
  );
}
