"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function GlobalParallaxBackground() {
  const { scrollYProgress } = useScroll();
  // Move background up as user scrolls down (parallax effect) - increased range
  const y = useTransform(scrollYProgress, [0, 1], ["10%", "-40%"]);

  return (
    <motion.div
      aria-hidden
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{
        y,
        opacity: 0.15,
      }}
    >
      <div
        className="absolute inset-0 bg-[length:160vw_auto] md:bg-[length:130vw_auto] lg:bg-[length:100vw_auto]"
        style={{
          backgroundImage:
            "url('/products/pngwing.com - 2024-01-09T155752.066.png')",
          backgroundRepeat: "repeat-y",
          backgroundPosition: "center top",
          width: "100%",
          height: "150%",
        }}
      />
    </motion.div>
  );
}
