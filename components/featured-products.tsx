"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  hotImage: string;
  color: string;
}

interface ProductCardProps {
  product: Product;
  index: number;
  forceVisible: boolean;
}

function ProductCard({ product, index, forceVisible }: ProductCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
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
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div className="relative pt-32">
        {/* Image Container - Overlapping with Flip Animation */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 z-10 w-64 h-64"
          style={{ perspective: "1000px" }}
        >
          <motion.div
            className="relative w-full h-full"
            style={{
              transformStyle: "preserve-3d",
            }}
            animate={{
              rotateY: isFlipped ? 180 : 0,
            }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
          >
            {/* Front Face - Cold Image */}
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "rotateY(0deg)",
              }}
            >
              <div className="relative w-full h-full">
                <Image
                  src={product.image}
                  alt={`${product.name} - Cold`}
                  fill
                  className="object-contain drop-shadow-xl"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </div>

            {/* Back Face - Hot Image */}
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              <div className="relative w-full h-full">
                <Image
                  src={product.hotImage}
                  alt={`${product.name} - Hot`}
                  fill
                  className="object-contain drop-shadow-xl"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Content Card */}
        <div className="bg-[#C59D62] rounded-4xl shadow-sm hover:shadow-lg transition-shadow duration-300 pt-30 pb-6 px-6 border border-border">
          <h2 className="text-xl md:text-2xl font-bold text-background text-center mb-4 font-[family-name:var(--font-playfair)]">
            {product.name}
          </h2>

          <div className="">
            <p className="text-background text-xs md:text-sm text-center leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

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
      name: "Ube Latte",
      description:
        "A vibrant Filipino classic reimagined—velvety espresso blended with real ube (purple yam) and creamy milk. Enjoy notes of earthiness, vanilla, and sweetness in each sip.",
      image: "/products/35.png",
      hotImage: "/products/54.png",
      color: "bg-[#D4A574]",
    },
    {
      id: 2,
      name: "Dirty Matcha",
      description:
        "A unique fusion of bold espresso and premium Japanese matcha, finished with silky steamed milk. Experience the perfect harmony of earthy matcha notes and rich coffee flavor in one exceptional drink.",
      image: "/37.png",
      hotImage: "/products/50.png",
      color: "bg-[#C5A969]",
    },
    {
      id: 3,
      name: "Americano",
      description:
        "Bold and smooth espresso shot perfectly diluted with hot water for a clean, refreshing taste. Ideal for those who appreciate the pure essence of coffee without the cream, delivering robust flavor in every cup.",
      image: "/40.png",
      hotImage: "/products/47.png",
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
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              forceVisible={forceVisible}
            />
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
