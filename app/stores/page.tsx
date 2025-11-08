"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { MapPin, Clock, Phone, Filter } from "lucide-react";
import { useBranches } from "../context/StoreContext";
import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  getRegions,
  getAllProvinces,
  getMunicipalitiesByProvince,
  getProvincesByRegion,
} from "@/lib/locations-data";
import { FilterSelect } from "@/components/ui/filter-select";
import { SearchableSelect } from "@/components/ui/searchable-select";
import { Pagination } from "@/components/ui/pagination";
import Image from "next/image";

export default function StoresPage() {
  // Set page title
  useEffect(() => {
    document.title = "Our Locations - B1T1 Takeaway Coffee";
  }, []);

  const searchParams = useSearchParams();
  const router = useRouter();
  const {
    filteredBranches: stores,
    isLoading,
    isFiltering,
    totalCount,
    currentPage,
    totalPages,
    filters,
    setFilters,
    setCurrentPage,
    isPreloadingImages,
    imagePreloadProgress,
    imagesReady,
  } = useBranches();

  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedMunicipality, setSelectedMunicipality] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const loadingStartRef = useRef<number | null>(null);

  // Initialize client-side state
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Combine loading flags and debounce hiding to prevent flicker
  const isBusy =
    isLoading || isFiltering || (isPreloadingImages && stores.length > 0);

  useEffect(() => {
    const MIN_VISIBLE_MS = 300;
    if (isBusy) {
      if (!showLoading) {
        setShowLoading(true);
        loadingStartRef.current = Date.now();
      }
      return;
    }

    // If not busy, keep loader for at least MIN_VISIBLE_MS total
    const startedAt = loadingStartRef.current ?? Date.now();
    const elapsed = Date.now() - startedAt;
    const remaining = Math.max(0, MIN_VISIBLE_MS - elapsed);
    const t = setTimeout(() => {
      setShowLoading(false);
      loadingStartRef.current = null;
    }, remaining);
    return () => clearTimeout(t);
  }, [isBusy, showLoading]);

  // Update URL parameters when filters change
  useEffect(() => {
    if (!isClient) return;

    const params = new URLSearchParams();
    if (filters.region && filters.region !== "all")
      params.set("region", filters.region);
    if (filters.province && filters.province !== "all")
      params.set("province", filters.province);
    if (filters.municipality && filters.municipality !== "all")
      params.set("municipality", filters.municipality);
    if (currentPage > 1) params.set("page", currentPage.toString());

    const newUrl = params.toString() ? `?${params.toString()}` : "/stores";
    router.replace(newUrl);
  }, [filters, currentPage, router, isClient]);

  // Initialize filters from URL parameters
  useEffect(() => {
    if (!isClient) return;

    const region = searchParams.get("region") || "";
    const province = searchParams.get("province") || "";
    const municipality = searchParams.get("municipality") || "";
    const page = parseInt(searchParams.get("page") || "1");

    setSelectedRegion(region);
    setSelectedProvince(province);
    setSelectedMunicipality(municipality);
    setFilters({ region, province, municipality });
    setCurrentPage(page);
  }, [searchParams, setFilters, setCurrentPage, isClient]);

  const handleRegionChange = (region: string) => {
    const cleanRegion = region === "all" ? "" : region;
    setSelectedRegion(region);

    // Auto-select Metro Manila when NCR is selected
    if (region === "NCR") {
      setSelectedProvince("Metro Manila");
      setSelectedMunicipality("all"); // Reset municipality when region changes
      setFilters({
        region: cleanRegion,
        province: "Metro Manila",
        municipality: "",
      });
    } else {
      setSelectedProvince("all"); // Reset province when region changes
      setSelectedMunicipality("all"); // Reset municipality when region changes
      setFilters({ region: cleanRegion, province: "", municipality: "" });
    }
    setCurrentPage(1);
  };

  const handleProvinceChange = (province: string) => {
    const cleanProvince = province === "all" ? "" : province;
    setSelectedProvince(province);
    setSelectedMunicipality("all"); // Reset municipality when province changes
    setFilters({
      region: selectedRegion === "all" ? "" : selectedRegion,
      province: cleanProvince,
      municipality: "",
    });
    setCurrentPage(1);
  };

  const handleMunicipalityChange = (municipality: string) => {
    const cleanMunicipality = municipality === "all" ? "" : municipality;
    setSelectedMunicipality(municipality);
    setFilters({
      region: selectedRegion === "all" ? "" : selectedRegion,
      province: selectedProvince === "all" ? "" : selectedProvince,
      municipality: cleanMunicipality,
    });
    setCurrentPage(1);
  };

  const regionOptions = getRegions().map((region) => ({
    value: region,
    label: region,
  }));

  const provinceOptions =
    selectedRegion && selectedRegion !== "all"
      ? getProvincesByRegion(selectedRegion).map((province) => ({
          value: province,
          label: province,
        }))
      : getAllProvinces().map((province) => ({
          value: province,
          label: province,
        }));

  const municipalityOptions = selectedProvince
    ? getMunicipalitiesByProvince(selectedProvince).map((municipality) => ({
        value: municipality,
        label: municipality,
      }))
    : [];

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
              Our Locations
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Find your nearest B1T1 Takeaway Coffee and visit us today
            </p>
          </motion.div>

          {/* Filters Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <div className="bg-card rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-bold text-foreground">
                  Filter Locations
                </h2>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <SearchableSelect
                  value={selectedRegion}
                  onValueChange={handleRegionChange}
                  placeholder="Select Region"
                  options={regionOptions}
                />
                <SearchableSelect
                  value={selectedProvince}
                  onValueChange={handleProvinceChange}
                  placeholder={
                    selectedRegion === "NCR"
                      ? "Metro Manila (Auto-selected)"
                      : "Select Province"
                  }
                  options={provinceOptions}
                  disabled={
                    !selectedRegion ||
                    selectedRegion === "all" ||
                    selectedRegion === "NCR"
                  }
                />
                <SearchableSelect
                  value={selectedMunicipality}
                  onValueChange={handleMunicipalityChange}
                  placeholder="Select Municipality"
                  options={municipalityOptions}
                  disabled={!selectedProvince || selectedProvince === "all"}
                />
              </div>
              {totalCount > 0 && (
                <p className="text-sm text-muted-foreground mt-4">
                  Showing {stores.length} of {totalCount} locations
                </p>
              )}
            </div>
          </motion.div>

          {/* Removed standalone loading block; we'll show an overlay to keep layout stable */}

          {/* Results */}
          {isClient &&
            (showLoading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <p className="text-muted-foreground mt-2">
                  Loading locations...
                </p>
              </div>
            ) : (
              <div className="relative">
                {stores.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {stores.map((store, index) => {
                      // Debug log to check imageUrl
                      if (index === 0) {
                        console.log("First store data:", store);
                        console.log("ImageUrl:", store.imageUrl);
                      }
                      return (
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
                              priority
                              src={
                                store.imageURL ||
                                store.imageUrl ||
                                "/default.png"
                              }
                              alt={store.address}
                              width={0}
                              height={0}
                              sizes="100vw"
                              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                console.error(
                                  "Image failed to load:",
                                  store.imageUrl || store.imageURL
                                );
                                target.src = "/default.png";
                              }}
                              onLoad={() => {
                                console.log(
                                  "Image loaded successfully:",
                                  store.imageUrl || store.imageURL
                                );
                              }}
                            />
                          </div>
                          <div className="p-8">
                            <h3 className="text-2xl font-bold text-foreground mb-4 font-[family-name:var(--font-playfair)]">
                              {store.address}
                            </h3>
                            <div className="space-y-3">
                              <div className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                                <p className="text-muted-foreground">
                                  {store.region} - {store.province} -{" "}
                                  {store.municipality}
                                </p>
                              </div>
                              <div className="flex items-start gap-3">
                                <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                                <p className="text-muted-foreground">
                                  {store.is24hours
                                    ? "24 hours"
                                    : store.timeslot
                                    ? store.timeslot
                                    : "Regular Hours"}
                                </p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      No locations found
                    </h3>
                    <p className="text-muted-foreground">
                      Try adjusting your filters to find more locations.
                    </p>
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    className="mt-8"
                  />
                )}
              </div>
            ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
