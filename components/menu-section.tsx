import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export function MenuSection() {
  const menuItems = [
    {
      name: "Signature Latte",
      description: "Smooth espresso with velvety steamed milk",
      image: "/beautiful-latte-with-art-in-white-cup.jpg",
      category: "Hot Drinks",
    },
    {
      name: "Iced Americano",
      description: "Bold espresso over ice, perfectly refreshing",
      image: "/iced-americano-coffee-in-clear-glass.jpg",
      category: "Cold Drinks",
    },
    {
      name: "Caramel Macchiato",
      description: "Espresso with vanilla and caramel drizzle",
      image: "/caramel-macchiato.png",
      category: "Specialty",
    },
    {
      name: "Matcha Latte",
      description: "Premium Japanese matcha with steamed milk",
      image: "/green-matcha-latte-in-ceramic-cup.jpg",
      category: "Specialty",
    },
    {
      name: "Cold Brew",
      description: "Smooth, naturally sweet cold-steeped coffee",
      image: "/cold-brew-coffee.png",
      category: "Cold Drinks",
    },
    {
      name: "Croissant",
      description: "Buttery, flaky French pastry baked fresh daily",
      image: "/golden-buttery-croissant-on-plate.jpg",
      category: "Pastries",
    },
  ];

  return (
    <section id="menu" className="py-20 sm:py-32 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-2 bg-secondary/20 text-secondary-foreground rounded-full text-sm font-medium mb-4">
            Our Menu
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground font-[family-name:var(--font-playfair)] mb-6 leading-tight text-balance">
            Crafted to Perfection
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
            Explore our carefully curated selection of premium coffees,
            specialty drinks, and fresh pastries. Every item is crafted with the
            finest ingredients.
          </p>
        </div>

        {/* Menu Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {menuItems.map((item, index) => (
            <Card
              key={index}
              className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300"
            >
              <CardContent className="p-0">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-primary/90 text-primary-foreground text-xs font-medium rounded-full">
                      {item.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2 font-[family-name:var(--font-playfair)]">
                    {item.name}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
