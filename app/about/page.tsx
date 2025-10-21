"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";

export default function AboutPage() {
  const values = [
    {
      title: "Quality First",
      description:
        "We source the finest beans from sustainable farms around the world.",
    },
    {
      title: "Made with Love",
      description: "Every cup is crafted with passion and attention to detail.",
    },
    {
      title: "Community Driven",
      description: "Building connections one coffee at a time.",
    },
    {
      title: "Award Winning",
      description: "Recognized for excellence in coffee craftsmanship.",
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
              B1T1 Takeaway Coffee was born from a simple idea: great coffee
              should be accessible to everyone, everywhere.
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
                Crafting Excellence Since Day One
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                What started as a small café has grown into a beloved community
                hub. We believe in the power of a perfectly brewed cup to
                brighten someone's day, spark conversations, and create lasting
                memories.
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                Our commitment to quality extends beyond our coffee. We partner
                with local suppliers, support sustainable farming practices, and
                invest in our community because we believe great coffee starts
                with great relationships.
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
