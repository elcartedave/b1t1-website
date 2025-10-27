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
    id: "1",
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/twfi-dashboard-d0ecf.firebasestorage.app/o/b1t1-website%2F557143620_779471568387073_1113887869590586336_n.jpg?alt=media&token=efbe2e4f-54fb-4b9c-a1d6-cdb959779ed3",
    postUrl: "/about",
    caption: `Late nights fuel great ideas and great coffee.`,
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
    <section id="about" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full"
        >
          <div className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-primary/10 text-foreground rounded-full text-xs sm:text-sm font-medium mb-6 sm:mb-8">
            Latest Updates
          </div>

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
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8"
                  >
                    {/* Image - Takes 2 columns on lg screens, 1 column on md, full width on mobile */}
                    <div className="md:col-span-1 lg:col-span-2 relative h-[250px] sm:h-[350px] md:h-[400px] lg:h-[500px] xl:h-[550px] rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden shadow-xl group">
                      <Image
                        src={item.imageURL}
                        alt={item.caption}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 66vw"
                        priority
                      />
                    </div>

                    {/* Content - Takes 1 column, adjusts based on screen */}
                    <div className="md:col-span-1 lg:col-span-1 flex flex-col justify-between md:justify-center lg:justify-between py-4 md:py-6 lg:py-8 space-y-4 md:space-y-6">
                      <div className="flex-1 flex flex-col justify-center overflow-hidden">
                        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-semibold text-foreground font-[family-name:var(--font-inter)] leading-relaxed text-justify md:text-left line-clamp-6 md:line-clamp-5 lg:line-clamp-6">
                          {item.caption}
                        </h2>
                      </div>

                      <Link
                        href={item.postUrl}
                        className="block text-center md:text-left lg:text-center"
                      >
                        <Button
                          size="lg"
                          className="bg-primary hover:bg-primary/90 text-white px-6 py-4 sm:px-8 sm:py-6 text-sm sm:text-base w-full sm:w-auto"
                        >
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex left-1 lg:-left-5" />
            <CarouselNext className="hidden md:flex right-1 lg:-right-5" />
          </Carousel>

          {/* Carousel Indicators */}
          <div className="flex justify-center gap-2 sm:gap-3 mt-6 sm:mt-8">
            {Array.from({ length: Math.min(8, newsItems.length) }).map(
              (_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    api?.scrollTo(index);
                    setDotIndex(index);
                  }}
                  className={cn(
                    "h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full transition-all duration-300",
                    dotIndex === index
                      ? "bg-primary w-6 sm:w-8"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                />
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
