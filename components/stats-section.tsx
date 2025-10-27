"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useBranches } from "@/app/context/StoreContext";
import { db } from "@/lib/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";

export function StatsSection() {
  const { operatingBranches } = useBranches();
  const [soonToOpenCount, setSoonToOpenCount] = useState(0);

  // Total menu items count (based on the menu page structure)
  const totalProducts = 36; // Update this if menu items change

  useEffect(() => {
    // Fetch soon-to-open stores count
    const q = query(
      collection(db, "branches1"),
      where("isSoonToOpenWithLoc", "==", true)
    );

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        setSoonToOpenCount(querySnapshot.docs.length);
      },
      (error) => {
        console.error("Error fetching soon-to-open count:", error);
      }
    );

    return () => unsubscribe();
  }, []);

  const stats = [
    {
      value: operatingBranches.length,
      suffix: "+",
      label: "Operating Stores",
    },
    {
      value: soonToOpenCount,
      suffix: "+",
      label: "Soon to Open",
    },
    {
      value: totalProducts,
      suffix: "+",
      label: "Menu",
    },
  ];

  return (
    <section className="relative pt-8 pb-8 sm:pt-6 sm:pb-8 md:pt-8 md:pb-10 lg:pt-10 lg:pb-12 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="flex flex-col items-center">
          {/* Chip Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-4 py-2 sm:px-5 sm:py-2.5 bg-primary/10 text-foreground rounded-full text-sm sm:text-base font-semibold">
              At a Glance
            </div>
          </motion.div>
          {/* Subtitle text with enhanced visibility */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center text-[#6d4c3d] text-sm sm:text-base md:text-lg mt-4 sm:mt-5 md:mt-6 mb-6 sm:mb-8 md:mb-10 lg:mb-12 leading-relaxed max-w-2xl mx-auto font-medium"
          >
            From our humble beginnings to becoming a beloved coffee destination
            across the Philippines.
          </motion.p>
          {/* Statistics Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full mb-6 sm:mb-8 md:mb-10"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="text-center px-2"
                >
                  {/* Number with enhanced visibility */}
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.15 + 0.2 }}
                    className="mb-2"
                  >
                    <h3
                      className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[#3d2817] font-[family-name:var(--font-playfair)]"
                      style={{
                        textShadow:
                          "0 6px 16px rgba(61, 40, 23, 0.25), 0 3px 6px rgba(61, 40, 23, 0.15)",
                      }}
                    >
                      {stat.value}
                      <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#6d4c3d]">
                        {stat.suffix}
                      </span>
                    </h3>
                  </motion.div>

                  {/* Label with enhanced visibility */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.15 + 0.4 }}
                    className="text-sm sm:text-base md:text-lg font-bold text-[#6d4c3d] tracking-wider uppercase"
                  >
                    {stat.label}
                  </motion.p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image Section Below Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl px-4 sm:px-0"
          >
            <div className="relative">
              <img
                src="/products/Layer 1.png"
                alt="B1T1 Coffee Experience"
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
