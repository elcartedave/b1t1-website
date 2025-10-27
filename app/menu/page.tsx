"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());

  const categories = [
    { id: "all", label: "All" },
    { id: "espresso", label: "Espresso" },
    { id: "matcha", label: "Matcha" },
    { id: "chocolate", label: "Chocolate" },
    { id: "frappe", label: "Frappe" },
    { id: "fruit tea", label: "Fruit Tea" },
    { id: "donuts", label: "Mini Donuts" },
    { id: "waffles", label: "Belgian Waffle" },
  ];

  const menuItems = [
    {
      id: 1,
      name: "Americano",
      category: "espresso",
      price: "$5.50",
      image: "/products/ICED AMERICANO.png",
      description: "Espresso with hot water",
    },
    {
      id: 2,
      name: "Brown Sugar Latte",
      category: "espresso",
      price: "$6.00",
      image: "/products/ICED BROWN SUGAR.png",
      description: "Espresso with brown sugar syrup and steamed milk",
    },
    {
      id: 3,
      name: "Caramel Macchiato",
      category: "espresso",
      price: "$5.00",
      image: "/products/PRODUCT-PNG_0006_CARAMEL.png",
      description: "Espresso with caramel drizzle and steamed milk",
    },
    {
      id: 4,
      name: "Dark Mocha",
      category: "espresso",
      price: "$5.50",
      image: "/products/ICED DARK MOCHA.png",
      description: "Espresso with dark chocolate and steamed milk",
    },
    {
      id: 5,
      name: "Fererro Latte",
      category: "espresso",
      price: "$6.50",
      image: "/products/FERERRO LATTE.png",
      description: "Espresso with Ferrero chocolate and steamed milk",
    },
    {
      id: 6,
      name: "Latte",
      category: "espresso",
      price: "$6.00",
      image: "/products/ICED LATTE.png",
      description: "Espresso with steamed milk",
    },
    {
      id: 7,
      name: "Spanish Latte",
      category: "espresso",
      price: "$3.50",
      image: "/products/ICE SPANISH LATTE.png",
      description: "Espresso with Spanish chocolate and steamed milk",
    },
    {
      id: 8,
      name: "Ube Latte",
      category: "espresso",
      price: "$4.00",
      image: "/products/UBE LATTE.png",
      description: "Espresso with ube syrup and steamed milk",
    },
    {
      id: 27,
      name: "Vietnamese",
      category: "espresso",
      price: "$4.00",
      image: "/products/VIETNAMESE.png",
      description: "Espresso with Vietnamese coffee and steamed milk",
    },
    {
      id: 9,
      name: "Dirty Matcha",
      category: "matcha",
      price: "$5.00",
      image: "/products/DIRTY MATCHA.png",
      description: "Matcha with espresso and steamed milk",
    },
    {
      id: 10,
      name: "Matcha Latte",
      category: "matcha",
      price: "$5.00",
      image: "/products/MATCHA LATTE.png",
      description: "Matcha with steamed milk",
    },
    {
      id: 11,
      name: "Chocolate",
      category: "chocolate",
      price: "$5.00",
      image: "/products/CHOCOLATE.png",
      description: "Chocolate with steamed milk",
    },
    {
      id: 12,
      name: "White Chocolate",
      category: "chocolate",
      price: "$5.00",
      image: "/products/ICED WHITE CHOCOLATE.png",
      description: "White chocolate with hot water",
    },
    {
      id: 13,
      name: "Blueberry Frappe",
      category: "frappe",
      price: "$5.00",
      image: "/products/BLUEBERRY FRAPPE.png",
      description: "Blueberry with ice and milk",
    },
    {
      id: 14,
      name: "Chocolate Frappe",
      category: "frappe",
      price: "$5.00",
      image: "/products/CHOCOLATE CREAM FRAPPE.png",
      description: "Chocolate with ice and milk",
    },
    {
      id: 15,
      name: "Dark Mocha Frappe",
      category: "frappe",
      price: "$5.00",
      image: "/products/DARK MOCHA FRAPPE.png",
      description: "Dark mocha with ice and milk",
    },
    {
      id: 16,
      name: "Espresso Frappe",
      category: "frappe",
      price: "$5.00",
      image: "/products/ESPRESSO FRAPPE.png",
      description: "Espresso with ice and milk",
    },
    {
      id: 17,
      name: "Matcha Frappe",
      category: "frappe",
      price: "$5.00",
      image: "/products/MATCHA FRAPPE.png",
      description: "Matcha with ice and milk",
    },
    {
      id: 18,
      name: "Strawberry Frappe",
      category: "frappe",
      price: "$5.00",
      image: "/products/STRAWBERRY FRAPPE.png",
      description: "Strawberry with ice and milk",
    },
    {
      id: 19,
      name: "Blueberry Tea",
      category: "fruit tea",
      price: "$5.00",
      image: "/products/BLUEBERRY FRUIT TEA.png",
      description: "Blueberry with fruit tea",
    },
    {
      id: 20,
      name: "Green Apple Tea",
      category: "fruit tea",
      price: "$5.00",
      image: "/products/GREEN FRUIT TEA.png",
      description: "Green with fruit tea",
    },
    {
      id: 21,
      name: "Lychee Tea",
      category: "fruit tea",
      price: "$5.00",
      image: "/products/LYCHEE.png",
      description: "Lychee with fruit tea",
    },
    {
      id: 22,
      name: "Passion Fruit Tea",
      category: "fruit tea",
      price: "$5.00",
      image: "/products/PASSION FRUIT.png",
      description: "Passion fruit with fruit tea",
    },
    {
      id: 23,
      name: "Strawberry Tea",
      category: "fruit tea",
      price: "$5.00",
      image: "/products/strawberry.png",
      description: "Strawberry with fruit tea",
    },
    {
      id: 24,
      name: "Almond Choco Donut",
      category: "donuts",
      price: "$5.00",
      image: "/products/choco almonds.png",
      description: "Almond choco donuts",
    },
    {
      id: 25,
      name: "Milky Matcha Donut",
      category: "donuts",
      price: "$5.00",
      image: "/products/matcha.png",
      description: "Milky matcha donuts",
    },
    {
      id: 26,
      name: "Strawberry Donut",
      category: "donuts",
      price: "$5.00",
      image: "/products/strawberries.png",
      description: "Strawberry donuts",
    },
    {
      id: 28,
      name: "Plain",
      category: "waffles",
      price: "$5.00",
      image: "/products/BELGIAN WAFFLE.png",
      description: "Plain waffles",
    },
    {
      id: 29,
      name: "Caramel",
      category: "waffles",
      price: "$5.00",
      image: "/products/CARAMEL WAFFLE.png",
      description: "Caramel waffles",
    },
    {
      id: 30,
      name: "Chocolate",
      category: "waffles",
      price: "$5.00",
      image: "/products/CHOCOLATE WAFFLE.png",
      description: "Chocolate waffles",
    },
    {
      id: 31,
      name: "Biscoff Cream",
      category: "waffles",
      price: "$5.00",
      image: "/products/BISCOFF WAFFLE.png",
      description: "Biscoff cream waffles",
    },
    {
      id: 32,
      name: "Strawberry",
      category: "waffles",
      price: "$5.00",
      image: "/products/STRAWBERRY WAFFLE.png",
      description: "Strawberry waffles",
    },
    {
      id: 33,
      name: "Peanut Butter",
      category: "waffles",
      price: "$5.00",
      image: "/products/PEANUT BUTTER WAFFLE.png",
      description: "Peanut butter waffles",
    },
    {
      id: 34,
      name: "S'mores",
      category: "waffles",
      price: "$5.00",
      image: "/products/S'SMORE WAFFLE.png",
      description: "S'mores waffles",
    },
    {
      id: 35,
      name: "Cookies and Cream",
      category: "waffles",
      price: "$5.00",
      image: "/products/COOKIES AND CREAM WAFFLE.png",
      description: "Cookies and cream waffles",
    },
    {
      id: 36,
      name: "Matcha Cream",
      category: "waffles",
      price: "$5.00",
      image: "/products/MATCHA WAFFLE.png",
      description: "Matcha cream waffles",
    },
  ];

  const filteredItems =
    activeCategory === "all"
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 font-[family-name:var(--font-playfair)]">
              Our Menu
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Discover our handcrafted beverages and freshly baked treats
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  activeCategory === category.id
                    ? "bg-primary text-primary-foreground shadow-lg scale-105"
                    : "bg-card text-foreground hover:bg-primary/10"
                }`}
              >
                {category.label}
              </button>
            ))}
          </motion.div>

          {/* Menu Grid - Circular Onea-inspired design */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={
                  index < 3
                    ? { opacity: 1, scale: 1 }
                    : visibleItems.has(index)
                    ? { opacity: 1, scale: 1 }
                    : undefined
                }
                whileInView={index >= 3 ? { opacity: 1, scale: 1 } : undefined}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.075 }}
                whileHover={{ y: -8, scale: 1.05 }}
                className="group cursor-pointer-group"
              >
                <div className="relative">
                  {/* Circular background glow */}
                  <div className="absolute inset-0 bg-primary/10 rounded-full blur-2xl scale-75 group-hover:scale-90 transition-transform duration-500" />

                  {/* Circular product image */}
                  <div className="relative bg-card rounded-full aspect-square overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-300 p-8 flex items-center justify-center">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* Product info */}
                <div className="text-center mt-6">
                  <h3 className="text-xl font-bold text-foreground mb-2 font-[family-name:var(--font-playfair)]">
                    {item.name}
                  </h3>
                  <p className="text-2xl font-bold text-primary">
                    {item.price}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
