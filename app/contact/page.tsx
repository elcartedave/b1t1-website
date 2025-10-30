"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { toast } from "@/hooks/use-toast";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNumber: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await addDoc(collection(db, "inquiries"), {
        name: formData.name,
        email: formData.email,
        contactNumber: formData.contactNumber,
        message: formData.message,
        timestamp: Timestamp.now(),
        status: "pending",
      });

      // Show success confirmation
      setShowSuccess(true);
      toast({
        title: "Message sent successfully! ✅",
        description: "We'll get back to you soon.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        message: "",
        contactNumber: "",
      });

      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Error sending message:", error);
      // Show error confirmation
      setShowError(true);
      toast({
        title: "Failed to send message ❌",
        description: "Please try again later.",
        variant: "destructive",
      });

      // Auto-hide error message after 5 seconds
      setTimeout(() => {
        setShowError(false);
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

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

              {/* Success Message */}
              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4"
                >
                  <div className="flex items-start gap-3">
                    <svg
                      className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div className="flex-1">
                      <h3 className="font-semibold text-green-800 dark:text-green-300 mb-1">
                        Message sent successfully!
                      </h3>
                      <p className="text-sm text-green-700 dark:text-green-400">
                        Thank you for contacting us. We'll get back to you
                        within 24-48 hours.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Error Message */}
              {showError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4"
                >
                  <div className="flex items-start gap-3">
                    <svg
                      className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div className="flex-1">
                      <h3 className="font-semibold text-red-800 dark:text-red-300 mb-1">
                        Failed to send message
                      </h3>
                      <p className="text-sm text-red-700 dark:text-red-400">
                        Please try again later. If the problem persists, contact
                        us directly at franchise@b1t1takeawaycoffee.com
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Name
                  </label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    className="w-full"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    className="w-full"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="contactNumber"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Contact Number
                  </label>
                  <Input
                    id="contactNumber"
                    type="tel"
                    placeholder="09123456789"
                    className="w-full"
                    value={formData.contactNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contactNumber: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Your message..."
                    rows={5}
                    className="w-full"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
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
                    <h3 className="font-semibold text-foreground mb-2 text-sm uppercase tracking-wide">
                      Email
                    </h3>
                    <p className="text-muted-foreground">
                      franchise@b1t1takeawaycoffee.com
                    </p>
                  </div>
                  {/* <div className="bg-card rounded-2xl p-6 shadow-lg">
                    <h3 className="font-semibold text-foreground mb-2 text-sm uppercase tracking-wide">
                      Whatsapp
                    </h3>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                  </div> */}
                  <div className="bg-card rounded-2xl p-6 shadow-lg">
                    <h3 className="font-semibold text-foreground mb-2 text-sm uppercase tracking-wide">
                      Headquarters
                    </h3>
                    <p className="text-muted-foreground">
                      Park Triangle Corporate Plaza
                      <br />
                      32nd St. corner 11th Ave. Bonifacio Global City, Taguig
                      City, Metro Manila, Philippines
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
