"use client";

import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState<string>("/16.png");

  useEffect(() => {
    setImageUrl("/16.png");
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  // Background position moves by ~20% across the section scroll (reversed)
  const bgPosY = useTransform(scrollYProgress, [0, 1], ["50%", "100%"]);
  const categories = [
    {
      label: "COFFEE",
      color: "bg-[#c5a969]", // Primary warm gold
      image: "/51.png",
      highlight: "/16.png",
    },
    {
      label: "FRAPPE",
      color: "bg-[#d6de9b]", // Secondary sage green
      image: "/42.png",
      highlight: "/cat2.png",
    },
    {
      label: "TEA",
      color: "bg-[#8b7355]", // Chart-3 brown
      image: "/11.png",
      highlight: "/cat3.png",
    },
    {
      label: "PASTRIES",
      color: "bg-[#a8c686]", // Chart-4 green
      image: "/63.png",
      highlight: "/cat4.png",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-24  sm:pb-2 md:pb-4 lg:pb-8"
    >
      {/* Background now handled globally */}
      {/* Background decorative circle */}
      <div className="absolute right-[20%] top-1/2 -translate-y-1/2 w-[200px] h-[200px] md:w-[300px] md:h-[300px] lg:w-[350px] lg:h-[350px] rounded-full bg-primary/10 blur-3xl -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
          {/* Left Content - Tagline and CTA */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 max-w-lg text-center lg:text-left"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-3 md:mb-4 font-[family-name:var(--font-playfair)] leading-tight text-balance">
              Great Coffee. Great Value. Every Day.
            </h1>
            <p className="text-sm md:text-base text-muted-foreground mb-5 md:mb-6 max-w-lg leading-relaxed mx-auto lg:mx-0">
              Why settle? From the first sip to the last drop — premium-inspired
              brews, made accessible. Join us in redefining what takeaway coffee
              can be.
            </p>
            <div className="flex justify-center lg:justify-start">
              <Button
                onClick={() => {
                  router.push("/about");
                }}
                size="lg"
                className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-8"
              >
                About Us
              </Button>
            </div>
          </motion.div>

          {/* Right Content - Hero Image with Category Icons in Vertical Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 relative flex items-center justify-center max-w-lg"
          >
            <div className="relative flex items-center gap-6 md:gap-8 lg:gap-10">
              {/* Main drink image */}
              <motion.div
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, -2, 2, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative z-10 w-[200px] sm:w-[280px] md:w-[360px] lg:w-[400px] xl:w-[440px]"
              >
                <Image
                  priority
                  width={0}
                  height={0}
                  sizes="100vw"
                  src={imageUrl}
                  alt="Signature Chocolate Drink"
                  className="w-full drop-shadow-2xl"
                />
              </motion.div>

              {/* Category icons in straight vertical column on the right */}
              <div className="flex flex-col gap-4 md:gap-5">
                {categories.map((category, index) => (
                  <motion.div
                    key={category.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    whileHover={{
                      scale: 1.1,
                      x: -5,
                      transition: { duration: 0.2, ease: "easeOut" },
                    }}
                    className="cursor-pointer-group"
                  >
                    <div className="flex flex-col items-center gap-3">
                      {/* Circular icon with image */}
                      <div
                        className={`w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 lg:w-20 lg:h-20 rounded-full ${category.color} flex items-center justify-center shadow-lg transition-all duration-200 ease-out overflow-hidden`}
                        onMouseEnter={() => {
                          setImageUrl(category.highlight);
                        }}
                      >
                        <Image
                          priority
                          width={0}
                          height={0}
                          sizes="100vw"
                          src={category.image}
                          alt={category.label}
                          className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 object-cover rounded-full"
                        />
                      </div>
                      {/* Label below the icon - ensuring full visibility */}
                      <span className="text-foreground font-bold text-xs sm:text-sm md:text-base text-center tracking-wide whitespace-nowrap">
                        {category.label}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
