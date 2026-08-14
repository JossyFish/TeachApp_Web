import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Teach App",
  description: "Teach Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}