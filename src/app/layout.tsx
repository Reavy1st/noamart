import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NoaMart by Gandi | Digital Store Terpercaya",
  description: "Solusi Aplikasi Premium Untuk Gaya Hidup Digital. Murah, Bergaransi, dan Berkualitas tinggi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="antialiased bg-[#FAFAFA] text-gray-900 font-sans">
        {children}
      </body>
    </html>
  );
}
