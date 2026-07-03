import type { Metadata } from "next";
import { Inter, Lexend } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/shared/context/ThemeContext";
import { AuthProvider } from "@/shared/context/AuthContext";
import { APP_NAME, APP_TAGLINE } from "@/core/config/constants";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const display = Lexend({ subsets: ["latin"], variable: "--font-display", weight: ["500", "600", "700"], display: "swap" });

export const metadata: Metadata = {
  title: `${APP_NAME} — ${APP_TAGLINE}`,
  description: APP_TAGLINE
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sans.variable} ${display.variable}`}>
        <ThemeProvider>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
