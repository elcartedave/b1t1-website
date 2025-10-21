"use client";

import { motion } from "framer-motion";

export function CategoryIcons() {
  const categories = [
    { label: "COFFEE", color: "bg-[#C5A969]" },
    { label: "DRINKS", color: "bg-[#D6DE9B]" },
    { label: "TEA", color: "bg-[#C5A969]" },
    { label: "BAKERY", color: "bg-[#D6DE9B]" },
  ];

  return (
    <section className="py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center lg:justify-end gap-3 md:gap-4 lg:gap-6"
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="flex flex-col items-center gap-2 cursor-pointer-group"
            >
              <div
                className={`w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full ${category.color} flex items-center justify-center shadow-lg`}
              >
                <span className="text-white font-bold text-xs md:text-sm lg:text-base text-center px-2">
                  {category.label}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
