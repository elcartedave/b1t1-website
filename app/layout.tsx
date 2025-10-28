"use client";
import type React from "react";
import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import "./globals.css";
import { StoreProvider } from "./context/StoreContext";
import GlobalParallaxBackground from "@/components/global-parallax-background";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <StoreProvider>
          <GlobalParallaxBackground />
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
          <Analytics />
        </StoreProvider>
      </body>
    </html>
  );
}
