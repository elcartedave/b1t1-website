"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function AboutPage() {
  // Set page title
  useEffect(() => {
    document.title = "About Us - B1T1 TakeawayCoffee";
  }, []);
  const values = [
    {
      title: "Quality First",
      description:
        "We source only the finest beans from sustainable farms around the globe — and we keep high standards in brewing, service and freshness.",
    },
    {
      title: "Made with Love",
      description:
        "Every cup is crafted with care. From barista to hand-over, we aim to deliver warmth, passion and attention to detail in each serving.",
    },
    {
      title: "Community Driven",
      description:
        "We believe in building more than coffee shops. We build connections, support local suppliers, and create shared moments — one cup at a time.",
    },
    {
      title: "Smart Innovation",
      description:
        "Recognised for our forward-thinking approach to coffee and franchising, we combine excellence in craftsmanship with smart, value-driven innovation.",
    },
  ];

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-foreground mb-6 font-[family-name:var(--font-playfair)]">
              Our Story
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Born from a simple idea: great coffee should be accessible to
              everyone, everywhere.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center mb-20"
          >
            <div>
              <img
                src="/about1.jpg"
                alt="Coffee shop interior"
                className="rounded-2xl shadow-2xl w-full"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground font-[family-name:var(--font-playfair)]">
                Where Every Cup Begins With Freshness
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                What began as a bold vision in the Philippines has grown into a
                movement. At B1T1, we believe that every cup should deliver
                flavour, freshness and value — no compromise. From day one, we
                set out to disrupt the industry norm: offering premium-inspired
                brews at an unbeatable value, without sacrificing excellence.
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                We partner with trusted suppliers, invest in our communities,
                and believe in building relationships around every cup. Because
                at B1T1, it’s more than coffee — it’s connection, conversation
                and daily joy.
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                Join us in this journey: where every cup begins with freshness,
                and every sip reflects our commitment to quality, affordability,
                and shared moments.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-foreground mb-12 font-[family-name:var(--font-playfair)]">
              Our Values
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-card rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
