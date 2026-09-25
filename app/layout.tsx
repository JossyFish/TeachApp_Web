import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "./components/scripts/LanguageContext";
import { ThemeProvider } from "./components/scripts/ThemeContext";
import { TanstackProvider } from "./components/scripts/TanstackProvider";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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
    <html lang="ru" className={cn("font-sans", geist.variable)}>
          <body>
              <ThemeProvider>
                <LanguageProvider>
                    <TanstackProvider>
                      {children}
                    </TanstackProvider>
                </LanguageProvider>
              </ThemeProvider>
            </body>
    </html>
  );
}