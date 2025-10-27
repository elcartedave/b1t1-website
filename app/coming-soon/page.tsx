"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function ComingSoonPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <section className="flex-1 flex items-center justify-center py-20 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            {/* Coffee Icon */}
            <div className="inline-flex items-center justify-center w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-[#8b7355]/10 mb-8">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-16 h-16 sm:w-20 sm:h-20 text-[#6d4c3d]"
              >
                <path
                  d="M18 8h-1V6c0-2.21-1.79-4-4-4H7C4.79 2 3 3.79 3 6v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-2h1c1.66 0 3-1.34 3-3s-1.34-3-3-3zm-1 6c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v8zm1-4h1c.55 0 1 .45 1 1s-.45 1-1 1h-1v-2z"
                  fill="currentColor"
                />
                <path d="M7 22h10v2H7z" fill="currentColor" />
              </svg>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4 font-[family-name:var(--font-playfair)]"
            >
              Coming Soon
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed max-w-lg mx-auto"
            >
              Our mobile app is brewing! Stay tuned for an amazing coffee
              experience right at your fingertips.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                onClick={() => router.push("/")}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white rounded-full px-8"
              >
                Back to Home
              </Button>
              <Button
                onClick={() => router.push("/stores")}
                size="lg"
                variant="outline"
                className="rounded-full px-8"
              >
                Find a Store
              </Button>
            </motion.div>
          </motion.div>

          {/* Decorative elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-12 flex justify-center gap-2"
          >
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <div
              className="w-2 h-2 rounded-full bg-primary animate-pulse"
              style={{ animationDelay: "0.2s" }}
            />
            <div
              className="w-2 h-2 rounded-full bg-primary animate-pulse"
              style={{ animationDelay: "0.4s" }}
            />
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
