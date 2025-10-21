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
  {
    id: "2",
    imageURL:
      "https://scontent.fmnl17-6.fna.fbcdn.net/v/t39.30808-6/545006248_758920663775497_3716938669018172471_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeElK37EwYyfM0ZHB4mYnKMs8B_S0a57BL3wH9LRrnsEvQKGxhlP52wsVy5QOWXsAV4pl5j158OpMteeyb3ykdlh&_nc_ohc=sZpvkevJsK0Q7kNvwFxvmK1&_nc_oc=AdmF7LFKcVEagDwa-rZU1J2tO85SXQHkpvP0nBLVXdiNUDWbDIqcgd3QUyVx1mRbqm8&_nc_zt=23&_nc_ht=scontent.fmnl17-6.fna&_nc_gid=ozVmwa5ebqpHTSeNUVeqxQ&oh=00_AfdOquaB9ACNmewF5blhT4cQPuQCn8iLCn1XTkUeaZ4jAw&oe=68FB0DC7",
    postUrl: "/menu",
    caption:
      "Serving our fellow Filipinos world-class coffee without the world-class price tag. 💛",
  },
  {
    id: "3",
    imageURL:
      "https://scontent.fmnl17-5.fna.fbcdn.net/v/t39.30808-6/527777453_730920843242146_3187157984776735011_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEkIdc683soUv6HxsO_jukRpbA40EW4ki6lsDjQRbiSLupUlmr6L8AIqRK_yhlln8MQFu2dC2qLbmUCin_727bk&_nc_ohc=tmds_-Qcj8oQ7kNvwHUiUAo&_nc_oc=AdlQ25U6cNu8jZJVXMCDsrF_OMiFYOubikTjtxq18CIk0XkT6sjqLfEGSITgBw3fqSs&_nc_zt=23&_nc_ht=scontent.fmnl17-5.fna&_nc_gid=H9ARzLOeDHEi9o01b7nFzw&oh=00_AfcHLRIJhrf4pJef1i9f0n4fUsoOaK26CLKIrzi8v5S2ew&oe=68FAEEFE",
    postUrl: "/stores",
    caption: "Success is brewed, not born. Let’s grind. ☕⚙️",
  },
  {
    id: "4",
    imageURL:
      "https://scontent.fmnl17-5.fna.fbcdn.net/v/t39.30808-6/518087236_712693271731570_2326253122098930484_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHg80xC8z4jIhM8Up8C384E3yecyBpLgDDfJ5zIGkuAMPqLQHN3Aolmyj8vjW94srl7sbKmK8XQvd34UNVmJxt9&_nc_ohc=eq5_fcjDQ5AQ7kNvwEeDkVa&_nc_oc=AdlaykrrO6Gqo8gssCIp66WTrXe-T97Tk00PhGjG0FVxh45JkqyuKGRneGqkhPRAsE8&_nc_zt=23&_nc_ht=scontent.fmnl17-5.fna&_nc_gid=0lZE1zZHY1mYjSion8fYZg&oh=00_AfdnwvrX_f7P1asaRQu9rEeUdle_nzqK-PDYRxeW8XDLQQ&oe=68FAFC82",
    postUrl: "/stores",
    caption: `Rise and shine with every cup! ☀️ Start your day right.
Good mornings begin at B1T1 Takeaway Coffee. 💛`,
  },
  {
    id: "5",
    imageURL:
      "https://scontent.fmnl17-4.fna.fbcdn.net/v/t39.30808-6/496008334_664755843191980_1800623430280346588_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFKblvP2mJzENGFb0RRUJhP8Cc4Glrc49TwJzgaWtzj1Cbug-v7KelVA9jPK5TrQ25UloOtkjbM_jShmSaNOTnV&_nc_ohc=2P9AAxlbkRkQ7kNvwFAv8st&_nc_oc=AdlL5bcxDRHS7yEJO2W1fYe4KNBHAdcwR1VfTOxR_0nuSjNvcTa9gZTv70od-axnPek&_nc_zt=23&_nc_ht=scontent.fmnl17-4.fna&_nc_gid=tRTEOk_P5XF7cI3qUy-qkw&oh=00_AffaGuWABAhrmIDWWOAkvrAeYtV29wn3t4BczN1HiyFf6g&oe=68FB0069",
    postUrl: "/stores",
    caption: `From this hand to the world stage. B1T1 isn’t just coffee — it’s a movement.
`,
  },
  {
    id: "6",
    imageURL:
      "https://scontent.fmnl17-2.fna.fbcdn.net/v/t39.30808-6/486814139_627509183583313_7576295365937146701_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=107&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHs1EzlROVUcVmtxQ7A1V7jYb_zRNBrYKVhv_NE0GtgpV31vxFJQ_XnR1v7vO7M0DlV1CjanJVbhcBXyEJHqccb&_nc_ohc=BVK9qY_dVLMQ7kNvwGuPf1H&_nc_oc=AdkvU5WI95ROpm3DowcP139Q7xz8n5tJNDTssdUog_Ei6N4eZWzr0HuFKVu3k4uwcC4&_nc_zt=23&_nc_ht=scontent.fmnl17-2.fna&_nc_gid=A7Yb9YIA22PcPFGaY7_oSg&oh=00_Afflh9qrdeR5R-t1MZbE2TOU7GLM20iXLkoW_OfNi3VTwQ&oe=68FAFE62",
    postUrl: "/stores",
    caption: `To our amazing customers — thank you for choosing us to be part of your journey. With every cup of premium yet affordable coffee, you fuel your dreams and support ours. Quality doesn’t have to be expensive — and your support proves it every day. 💛
`,
  },
  {
    id: "7",
    imageURL:
      "https://scontent.fmnl17-2.fna.fbcdn.net/v/t39.30808-6/480554145_600657552935143_3855695419282804071_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEG8o8BABeKABht1FA2WquHgfDMNDqIkImB8Mw0OoiQiXuBuwaiTcRDeZvf8qN7DdpIeP2pOyXpw2-8TzXzQ87B&_nc_ohc=3SuP-0K2nGwQ7kNvwHBaPJh&_nc_oc=AdnDMqZX7yqQ2-WP4Mk3QfnM3DfUNKxnCkLB6yMHzEwXXEDnLaI0-o6XTSJbqLLbmX4&_nc_zt=23&_nc_ht=scontent.fmnl17-2.fna&_nc_gid=dkhnPfFEOi8svTS9eZ4psg&oh=00_AfcPGjOHzUEoKfxmM7prOHFay-XevkgdSRjkChQ9ShykTQ&oe=68FAE562",
    postUrl: "/stores",
    caption: `Hot coffee perfect for rainy nights! Order your favorite B1T1 coffee via GrabFood or Foodpanda. We’re here to keep you warm.
`,
  },
  {
    id: "8",
    imageURL:
      "https://scontent.fmnl17-5.fna.fbcdn.net/v/t39.30808-6/480496979_599882796345952_1714652454133013660_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeHuXq19gH1kL-0TaH1DQWEdanWcRwFbEHlqdZxHAVsQecCmr47xVbbi7onyBq8wLgXns8A3poQzpk8IE3ON-whj&_nc_ohc=1rlP18KUiK0Q7kNvwFADnKS&_nc_oc=Adns35cj6CdjBHSevAx2VtAAlFr6BlQw07WsYc_0qunpU9gVxAiSjmd13fpYV2_6nLo&_nc_zt=23&_nc_ht=scontent.fmnl17-5.fna&_nc_gid=fjw6BheiTILCrjYIcEyhGw&oh=00_Afe7eEvPjnjZfXKaS2kavv4Vf8ot6Z-Vo56aM1K3LWXsJw&oe=68FAF795",
    postUrl: "/stores",
    caption: `Looking for a taste of Spain? Our Spanish Latte at B1T1 Takeaway Coffee is a creamy dream of espresso and condensed milk. ☕️
`,
  },
  {
    id: "9",
    imageURL:
      "https://scontent.fmnl17-3.fna.fbcdn.net/v/t39.30808-6/480253247_598359996498232_8317121753213200632_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeHTISHXszL7f6eozePqWFJKuKrLLfSMpge4qsst9IymB0_eTHlXE5pMflj6tksgBnsLrQawLCByPbWu7c_7iXdU&_nc_ohc=lsyC35FSYUMQ7kNvwEmdapT&_nc_oc=AdmhVOKetwwWGcl5a-LyS37blT8iFItCMLSXH5ph6KCVDLQ7xJ568cEABA45fRYK3UE&_nc_zt=23&_nc_ht=scontent.fmnl17-3.fna&_nc_gid=EscZ865ksv0IVpugHzHkjQ&oh=00_AfeozOQl4rjFxIeQkkfkWT0hzzrkshSt0YC1PBpeFcWZ2w&oe=68FB12BF",
    postUrl: "/stores",
    caption: `Take a stroll along the shore with our Strawberry Frappe in hand! 🌊

A delightful blend of fruity flavor and beachside vibes. Let the waves serenade you as you sip away!🥤🍓
`,
  },
  {
    id: "10",
    imageURL:
      "https://scontent.fmnl17-2.fna.fbcdn.net/v/t39.30808-6/476848458_593028380364727_7881344132000017088_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFDoYe7-dLwf5q_i_iicXanNZl881F5mEI1mXzzUXmYQhG44R_cWY859NDGyXDs0unm_jgC5oG0HIDtqSc-7jll&_nc_ohc=iVZ-uTATNxgQ7kNvwGB-Dhx&_nc_oc=AdlFvyuKQbda5Tqbl1G68dbEq7IBLAdti30aZYGDRFz7fsey-bmWlMdKzdNdHV5rWAk&_nc_zt=23&_nc_ht=scontent.fmnl17-2.fna&_nc_gid=oF66DKC4NFeGtbWyb1vqdw&oh=00_Afdwvf0cKhyKEkxFPq4QexizuK334cVR5EFuG5D6JSDF8w&oe=68FB0A78",
    postUrl: "/stores",
    caption: `Warm up your winter wonderland with the comforting embrace of our hot latte at B1T1 Takeaway Coffee. 🎄☕️
`,
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
