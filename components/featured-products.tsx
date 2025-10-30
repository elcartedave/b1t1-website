"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function FeaturedProducts() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  // Background position moves by ~20% across the section scroll (reversed)
  const bgPosY = useTransform(scrollYProgress, [0, 1], ["50%", "100%"]);
  const [forceVisible, setForceVisible] = useState(false);

  const products = [
    {
      id: 1,
      name: "Latte",
      soloPrice: 78,
      b1t1Price: 145,
      image: "/32.png",
      color: "bg-[#D4A574]",
    },
    {
      id: 2,
      name: "Dirty Matcha",
      soloPrice: 105,
      b1t1Price: 195,
      image: "/37.png",
      color: "bg-[#C5A969]",
    },
    {
      id: 3,
      name: "Americano",
      soloPrice: 48,
      b1t1Price: 88,
      image: "/40.png",
      color: "bg-[#8B7355]",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-10 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background now handled globally */}

      <div className="relative z-10 container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={forceVisible ? { opacity: 1, y: 0 } : undefined}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-[family-name:var(--font-playfair)]">
            Featured Favorites
          </h2>
          <p className="text-muted-foreground text-lg">
            Handcrafted with love, served with a smile
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={forceVisible ? { opacity: 1, y: 0 } : undefined}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{
                once: true,
              }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -10 }}
              className="group cursor-pointer-group"
            >
              <div className="relative">
                {/* Circular background */}
                <div
                  className={`absolute inset-0 ${product.color} rounded-full opacity-20 blur-2xl scale-75 group-hover:scale-90 transition-transform duration-500`}
                />

                {/* Product card */}
                <div className="relative bg-card rounded-full aspect-square overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-300 flex items-center justify-center p-8">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Product info */}
              <div className="text-center mt-6">
                <h3 className="text-xl font-bold text-foreground mb-2 font-[family-name:var(--font-playfair)]">
                  {product.name}
                </h3>
                <p className="text-lg font-bold text-primary">
                  Solo: ₱{product.soloPrice} | B1T1: ₱{product.b1t1Price}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center"
        >
          <Link href="/menu">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8"
            >
              View Full Menu
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
