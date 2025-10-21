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

// export const metadata: Metadata = {
//   title: "B1T1 Takeaway Coffee | Premium Coffee Experience",
//   description:
//     "Experience premium coffee culture with B1T1. Download our app for exclusive rewards, find your nearest café, and join our community.",
//   keywords: "B1T1, coffee, takeaway coffee, café, coffee app, premium coffee",
//   openGraph: {
//     title: "B1T1 Takeaway Coffee",
//     description: "Experience premium coffee culture with B1T1",
//     type: "website",
//   },
//   generator: "v0.app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
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
