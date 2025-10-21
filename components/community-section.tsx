import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export function CommunitySection() {
  const initiatives = [
    {
      title: "Sustainability First",
      description:
        "We use 100% compostable cups and partner with eco-friendly suppliers to minimize our environmental impact.",
      image: "/sustainable-coffee-farming-with-green-plants.jpg",
    },
    {
      title: "Community Events",
      description:
        "Join us for coffee tastings, latte art workshops, and community gatherings that bring people together.",
      image: "/people-enjoying-coffee-together-at-community-event.jpg",
    },
    {
      title: "Supporting Farmers",
      description:
        "We work directly with coffee farmers, ensuring fair wages and sustainable farming practices worldwide.",
      image: "/coffee-farmer-harvesting-coffee-beans.jpg",
    },
  ]

  return (
    <section className="py-20 sm:py-32 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-2 bg-secondary/20 text-secondary-foreground rounded-full text-sm font-medium mb-4">
            Our Community
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground font-[family-name:var(--font-playfair)] mb-6 leading-tight text-balance">
            More Than Just Coffee
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
            At B1T1, we believe in giving back. From sustainability initiatives to community events, we're committed to
            making a positive impact.
          </p>
        </div>

        {/* Initiatives Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {initiatives.map((initiative, index) => (
            <Card
              key={index}
              className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300"
            >
              <CardContent className="p-0">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={initiative.image || "/placeholder.svg"}
                    alt={initiative.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-3 font-[family-name:var(--font-playfair)]">
                    {initiative.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{initiative.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
