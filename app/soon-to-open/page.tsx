"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { MapPin, Clock, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { Branch } from "../models/Branch";
import Image from "next/image";
import { Pagination } from "@/components/ui/pagination";

export default function SoonToOpenPage() {
  const [stores, setStores] = useState<Branch[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Set page title
  useEffect(() => {
    document.title = "Soon to Open - B1T1 Takeaway Coffee";
  }, []);

  useEffect(() => {
    setIsLoading(true);

    const q = query(
      collection(db, "branches1"),
      where("isSoonToOpenWithLoc", "==", true)
    );

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const soonToOpenBranches = querySnapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as Branch)
        );
        // Sort by address
        soonToOpenBranches.sort((a, b) => a.address.localeCompare(b.address));
        setStores(soonToOpenBranches);
        setIsLoading(false);
      },
      (error) => {
        console.error("Error fetching soon-to-open branches:", error);
        setIsLoading(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  // Calculate pagination
  const totalPages = Math.ceil(stores.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentStores = stores.slice(startIndex, endIndex);

  // Handle page change with scroll to top
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 font-[family-name:var(--font-playfair)]">
              Soon to Open
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Exciting new B1T1 Takeaway Coffee locations coming soon near you
            </p>
          </motion.div>

          {/* Results Count */}
          {!isLoading && stores.length > 0 && (
            <div className="mb-8 text-center">
              <p className="text-muted-foreground">
                Showing {startIndex + 1}-{Math.min(endIndex, stores.length)} of{" "}
                {stores.length} upcoming locations
              </p>
            </div>
          )}

          {/* Results */}
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="text-muted-foreground mt-2">
                Loading soon-to-open locations...
              </p>
            </div>
          ) : (
            <div className="relative">
              {stores.length > 0 ? (
                <>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {currentStores.map((store, index) => (
                      <motion.div
                        key={store.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={index < 6 ? { opacity: 1, y: 0 } : undefined}
                        whileInView={
                          index >= 6 ? { opacity: 1, y: 0 } : undefined
                        }
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        whileHover={{ y: -8 }}
                        className="bg-card rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer-group"
                      >
                        <div className="relative h-64 overflow-hidden">
                          <Image
                            src={"/default.png"}
                            alt={store.address}
                            width={0}
                            height={0}
                            sizes="100vw"
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = "/default.png";
                            }}
                          />
                          <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                            Coming Soon
                          </div>
                        </div>
                        <div className="p-8">
                          <h3 className="text-2xl font-bold text-foreground mb-4 font-[family-name:var(--font-playfair)]">
                            {store.address}
                          </h3>
                          <div className="space-y-3">
                            <div className="flex items-start gap-3">
                              <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                              <p className="text-muted-foreground">
                                {store.region}
                                {store.province && ` - ${store.province}`}
                                {store.municipality &&
                                  ` - ${store.municipality}`}
                              </p>
                            </div>
                            {store.openingDate && (
                              <div className="flex items-start gap-3">
                                <Calendar className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                                <p className="text-muted-foreground">
                                  Opening:{" "}
                                  {new Date(
                                    store.openingDate
                                  ).toLocaleDateString()}
                                </p>
                              </div>
                            )}
                            {store.memo && (
                              <div className="mt-4 p-3 bg-muted rounded-lg">
                                <p className="text-sm text-muted-foreground">
                                  {store.memo}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                      className="mt-8"
                    />
                  )}
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🏗️</div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    No upcoming locations yet
                  </h3>
                  <p className="text-muted-foreground">
                    Check back soon for new B1T1 Takeaway Coffee locations
                    opening near you!
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
