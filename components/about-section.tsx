"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { NewsCarouselItem } from "@/app/models/NewsCarouselItem";
import { cn } from "@/lib/utils";

// Dummy data for the news carousel
const newsItems: NewsCarouselItem[] = [
  {
    id: "0",
    imageURL: "/carousel/1.JPG",
    postUrl: "/about",
    caption: `Discover Coffee Perfection—Quality & Value in Every Cup.`,
    subtitle: `Experience the rich flavors of expertly crafted brews without the premium price tag. From handpicked beans to our chilled frappes, we believe everyone deserves top tier taste at friendly prices.`,
  },
  {
    id: "1",
    imageURL: "/carousel/2.JPG",
    postUrl: "/about",
    caption: `More Flavor. More Value. Just Great Coffee & Tea.`,
    subtitle: `We blend quality ingredients and skilled technique to offer you drinks that surprise—not just in taste, but in price. Enjoy luxury without compromise.`,
  },
  {
    id: "2",
    imageURL: "/carousel/3.JPG",
    postUrl: "/about",
    caption: `Every Frappe, Tea, and Brew—Unrivaled Taste, Unbeatable Price.`,
    subtitle: `Sip confidently knowing you’re getting artisan-level beverages at irresistibly affordable prices. Why settle? Experience more for less.`,
  },
  {
    id: "3",
    imageURL: "/carousel/4.JPG",
    postUrl: "/about",
    caption: `Premium Coffeehouse Quality—Without the Premium Price.`,
    subtitle: `From specialty coffee to refreshing tea, our drinks deliver exceptional value. Quality shouldn’t come with a catch, and at B1T1, it never does.`,
  },
];

export function AboutSection() {
  const plugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: false })
  );
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [dotIndex, setDotIndex] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      const newIndex = api.selectedScrollSnap();
      const prevIndex = current;

      setCurrent(newIndex);

      // Update dot index based on forward/backward navigation
      setDotIndex((prev) => {
        // Detect if we moved forward or backward considering loop
        const itemCount = newsItems.length;
        const moved = newIndex - prevIndex;

        if (moved === 1 || moved === -(itemCount - 1)) {
          // Moved forward (or looped forward from last to first)
          return (prev + 1) % 8;
        } else if (moved === -1 || moved === itemCount - 1) {
          // Moved backward (or looped backward from first to last)
          return (prev - 1 + 8) % 8;
        }

        // Direct jump to a specific slide
        return newIndex % 8;
      });
    });
  }, [api, current]);

  return (
    <section
      id="about"
      className="py-4 sm:py-6 md:py-8 lg:py-10 bg-transparent"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full"
        >
          <Carousel
            plugins={[plugin.current]}
            className="w-full"
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent>
              {newsItems.map((item) => (
                <CarouselItem key={item.id}>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="grid grid-cols-1 md:grid-cols-2"
                  >
                    {/* Image - Square, half the container width */}
                    {Number(item.id) % 2 === 0 ? (
                      <>
                        <div className="relative w-full aspect-square overflow-hidden shadow-xl group">
                          <Image
                            src={item.imageURL}
                            alt={item.caption}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority
                          />
                        </div>

                        {/* Content - Square, half the container width with title and subtitle */}
                        <div className="w-full aspect-square flex flex-col bg-primary justify-center items-center p-6 md:p-8 lg:p-12 space-y-4 md:space-y-6">
                          <div className="space-y-3 md:space-y-4 text-center">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground font-[family-name:var(--font-inter)] leading-tight">
                              {item.caption}
                            </h2>

                            <p className="text-base sm:text-lg font-medium md:text-xl text-muted-foreground leading-relaxed">
                              {item.subtitle}
                            </p>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Content - Square, half the container width with title and subtitle */}
                        <div className="w-full aspect-square flex flex-col bg-primary justify-center items-center p-6 md:p-8 lg:p-12 space-y-4 md:space-y-6">
                          <div className="space-y-3 md:space-y-4 text-center">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground font-[family-name:var(--font-inter)] leading-tight">
                              {item.caption}
                            </h2>

                            <p className="text-base sm:text-lg font-medium md:text-xl text-muted-foreground leading-relaxed">
                              {item.subtitle}
                            </p>
                          </div>
                        </div>
                        <div className="relative w-full aspect-square overflow-hidden shadow-xl group">
                          <Image
                            src={item.imageURL}
                            alt={item.caption}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority
                          />
                        </div>
                      </>
                    )}
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex left-1 lg:-left-5" />
            <CarouselNext className="hidden md:flex right-1 lg:-right-5" />
          </Carousel>

          {/* Carousel Indicators */}
          <div className="flex justify-center gap-2 sm:gap-3 mt-6 sm:mt-8">
            {newsItems.map((_, index) => (
              <button
                key={index + 1}
                type="button"
                onClick={() => {
                  api?.scrollTo(index + 1);
                  setDotIndex(index + 1);
                }}
                className={cn(
                  "h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full transition-all duration-300",
                  dotIndex === index + 1
                    ? "bg-primary w-6 sm:w-8"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
