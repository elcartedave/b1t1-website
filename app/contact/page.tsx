"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-foreground mb-6 font-[family-name:var(--font-playfair)]">
              Get In Touch
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Have questions? We'd love to hear from you
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-card rounded-3xl p-6 md:p-8 lg:p-10 shadow-lg"
            >
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6 font-[family-name:var(--font-playfair)]">
                Send us a message
              </h2>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Name
                  </label>
                  <Input id="name" placeholder="Your name" className="w-full" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <Input id="email" type="email" placeholder="your@email.com" className="w-full" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <Textarea id="message" placeholder="Your message..." rows={5} className="w-full" />
                </div>
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Send Message</Button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6 lg:space-y-8"
            >
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6 font-[family-name:var(--font-playfair)]">
                  Contact Information
                </h2>
                <div className="space-y-6">
                  <div className="bg-card rounded-2xl p-6 shadow-lg">
                    <h3 className="font-semibold text-foreground mb-2 text-sm uppercase tracking-wide">Email</h3>
                    <p className="text-muted-foreground">hello@b1t1coffee.com</p>
                  </div>
                  <div className="bg-card rounded-2xl p-6 shadow-lg">
                    <h3 className="font-semibold text-foreground mb-2 text-sm uppercase tracking-wide">Phone</h3>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                  <div className="bg-card rounded-2xl p-6 shadow-lg">
                    <h3 className="font-semibold text-foreground mb-2 text-sm uppercase tracking-wide">Headquarters</h3>
                    <p className="text-muted-foreground">
                      123 Main Street
                      <br />
                      City Center, State 12345
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-secondary/20 rounded-3xl p-6 md:p-8">
                <h3 className="text-lg md:text-xl font-bold text-foreground mb-4 font-[family-name:var(--font-playfair)]">
                  Business Hours
                </h3>
                <div className="space-y-2 text-muted-foreground text-sm md:text-base">
                  <p>Monday - Friday: 7:00 AM - 8:00 PM</p>
                  <p>Saturday - Sunday: 8:00 AM - 9:00 PM</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
