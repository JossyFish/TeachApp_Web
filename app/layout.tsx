import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "./components/scripts/LanguageContext";
import { ThemeProvider } from "./components/scripts/ThemeContext";

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
          <body>
              <ThemeProvider>
                <LanguageProvider>
                    {children}
                </LanguageProvider>
              </ThemeProvider>
            </body>
    </html>
  );
}