import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { StatsSection } from "@/components/stats-section";
import { FeaturedProducts } from "@/components/featured-products";
import { AboutSection } from "@/components/about-section";
import { Footer } from "@/components/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "B1T1 Takeaway Coffee - Buy 1 Take 1 Coffee with Great Value",
  description:
    "With over 100 operating stores and 150+ more soon to open, experience premium coffee at unbeatable prices. B1T1 Takeaway Coffee offers quality beverages and freshly baked treats.",
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <FeaturedProducts />
      <AboutSection />
      <Footer />
    </main>
  );
}
