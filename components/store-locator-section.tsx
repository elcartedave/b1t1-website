import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Clock, Phone } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function StoreLocatorSection() {
  const stores = [
    {
      name: "B1T1 Downtown",
      address: "123 Main Street, City Center",
      hours: "Mon-Fri: 7AM-8PM, Sat-Sun: 8AM-9PM",
      phone: "+1 (555) 123-4567",
    },
    {
      name: "B1T1 Riverside",
      address: "456 River Road, Riverside District",
      hours: "Mon-Fri: 6:30AM-7:30PM, Sat-Sun: 7:30AM-8:30PM",
      phone: "+1 (555) 234-5678",
    },
    {
      name: "B1T1 University",
      address: "789 Campus Drive, University Area",
      hours: "Mon-Fri: 6AM-10PM, Sat-Sun: 7AM-10PM",
      phone: "+1 (555) 345-6789",
    },
  ]

  return (
    <section id="stores" className="py-20 sm:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Find Us
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground font-[family-name:var(--font-playfair)] mb-6 leading-tight text-balance">
            Visit Our Cafés
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed text-pretty mb-8">
            Find your nearest B1T1 café and experience our warm, welcoming atmosphere. We're here to serve you the
            perfect cup.
          </p>

          {/* Search Bar */}
          <div className="flex gap-2 max-w-md mx-auto">
            <Input type="text" placeholder="Enter your location..." className="flex-1" />
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <MapPin className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>
        </div>

        {/* Store Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {stores.map((store, index) => (
            <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-xl font-semibold text-foreground font-[family-name:var(--font-playfair)]">
                  {store.name}
                </h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex gap-3">
                    <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>{store.address}</span>
                  </div>
                  <div className="flex gap-3">
                    <Clock className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>{store.hours}</span>
                  </div>
                  <div className="flex gap-3">
                    <Phone className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>{store.phone}</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full bg-transparent">
                  Get Directions
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Franchise CTA */}
        <div className="bg-primary/5 rounded-2xl p-8 sm:p-12 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground font-[family-name:var(--font-playfair)] mb-4">
            Interested in Opening a B1T1 Franchise?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed">
            Join our growing family of café owners and bring the B1T1 experience to your community. We provide
            comprehensive support every step of the way.
          </p>
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            Learn More About Franchising
          </Button>
        </div>
      </div>
    </section>
  )
}
