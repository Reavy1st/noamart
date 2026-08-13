import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NoaMart by Gandi | Premium Digital Store",
  description: "Solusi Aplikasi Premium Dengan Desain iOS Modern.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="antialiased bg-background text-gray-900 font-sans selection:bg-primary/20">
        {children}
      </body>
    </html>
  );
}
