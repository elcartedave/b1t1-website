import { Button } from "@/components/ui/button"
import { Apple, Smartphone, Gift, MapPin, Star, CreditCard } from "lucide-react"
import Image from "next/image"

export function AppShowcaseSection() {
  const features = [
    {
      icon: Gift,
      title: "Rewards Program",
      description: "Earn points with every purchase and unlock exclusive perks",
    },
    {
      icon: MapPin,
      title: "Store Locator",
      description: "Find your nearest B1T1 café with real-time availability",
    },
    {
      icon: Star,
      title: "Order Tracking",
      description: "Track your order in real-time from preparation to pickup",
    },
    {
      icon: CreditCard,
      title: "Easy Payment",
      description: "Save your payment methods for quick and secure checkout",
    },
  ]

  return (
    <section id="app" className="py-20 sm:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Download Our App
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground font-[family-name:var(--font-playfair)] mb-6 leading-tight text-balance">
            Your Coffee Experience, Elevated
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
            Download the B1T1 app and unlock a world of convenience, rewards, and exclusive offers. Your perfect coffee
            is just a tap away.
          </p>
        </div>

        {/* App Preview & Features */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-12">
          {/* Phone Mockup */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-[280px] sm:w-[320px] h-[560px] sm:h-[640px]">
              <Image
                src="/modern-coffee-app-interface-on-smartphone-showing-.jpg"
                alt="B1T1 App Interface"
                fill
                className="object-contain drop-shadow-2xl"
              />
            </div>
          </div>

          {/* Features Grid */}
          <div className="space-y-6">
            {features.map((feature, index) => (
              <div key={index} className="flex gap-4 p-6 bg-card rounded-xl hover:shadow-lg transition-shadow">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Download Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 w-full sm:w-auto">
            <Apple className="mr-2 h-5 w-5" />
            Download on App Store
          </Button>
          <Button size="lg" variant="outline" className="border-2 border-foreground w-full sm:w-auto bg-transparent">
            <Smartphone className="mr-2 h-5 w-5" />
            Get it on Google Play
          </Button>
        </div>
      </div>
    </section>
  )
}
