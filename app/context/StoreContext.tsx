import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  onSnapshot,
  where,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { Branch } from "../models/Branch";
import { useImagePreloader } from "@/hooks/use-image-preloader";

interface BranchContextType {
  branches: Branch[];
  operatingBranches: Branch[];
  filteredBranches: Branch[];
  isLoading: boolean;
  isFiltering: boolean;
  totalCount: number;
  currentPage: number;
  totalPages: number;
  filters: {
    region: string;
    province: string;
    municipality: string;
  };
  setFilters: (filters: {
    region: string;
    province: string;
    municipality: string;
  }) => void;
  setCurrentPage: (page: number) => void;
  refreshBranches: () => void;
  // Image preloading state
  isPreloadingImages: boolean;
  imagePreloadProgress: number;
  imagesReady: boolean;
}

const BranchContext = createContext<BranchContextType | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [operatingBranches, setOperatingBranches] = useState<Branch[]>([]);
  const [filteredBranches, setFilteredBranches] = useState<Branch[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [filters, setFilters] = useState({
    region: "",
    province: "",
    municipality: "",
  });

  const [isFiltering, setIsFiltering] = useState(false);
  const ITEMS_PER_PAGE = 9;

  // Extract image URLs from filtered branches for preloading
  const imageUrls = useMemo(() => {
    const urls = new Set<string>();
    filteredBranches.forEach((branch) => {
      const url = branch.imageURL || branch.imageUrl || "/default.png";
      urls.add(url);
    });
    return Array.from(urls);
  }, [filteredBranches]);

  // Use image preloader hook
  const {
    isLoading: isPreloadingImages,
    progress: imagePreloadProgress,
    isComplete: imagesReady,
  } = useImagePreloader(imageUrls);

  // Function to refresh branches with current filters and pagination
  const refreshBranches = useCallback(
    (isFilterChange = false) => {
      if (isFilterChange) {
        setIsFiltering(true);
      } else {
        setIsLoading(true);
      }

      // Simple query for all operating branches to avoid index issues
      const q = query(
        collection(db, "branches1"),
        where("isOperating", "==", true)
      );

      const unsubscribe = onSnapshot(
        q,
        (querySnapshot) => {
          let allBranches = querySnapshot.docs.map(
            (doc) => ({ id: doc.id, ...doc.data() } as Branch)
          );

          // Apply client-side filtering more efficiently
          if (filters.region?.trim()) {
            allBranches = allBranches.filter(
              (branch) => branch.region === filters.region
            );
          }

          if (filters.province?.trim()) {
            allBranches = allBranches.filter(
              (branch) => branch.province === filters.province
            );
          }

          if (filters.municipality?.trim()) {
            allBranches = allBranches.filter(
              (branch) => branch.municipality === filters.municipality
            );
          }

          // Sort by address
          allBranches.sort((a, b) => a.address.localeCompare(b.address));

          setTotalCount(allBranches.length);
          setTotalPages(Math.ceil(allBranches.length / ITEMS_PER_PAGE));

          // Calculate pagination
          const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
          const endIndex = startIndex + ITEMS_PER_PAGE;
          const paginatedBranches = allBranches.slice(startIndex, endIndex);

          setFilteredBranches(paginatedBranches);

          if (isFilterChange) {
            setIsFiltering(false);
          } else {
            setIsLoading(false);
          }
        },
        (error) => {
          console.error("Error fetching filtered branches:", error);
          if (isFilterChange) {
            setIsFiltering(false);
          } else {
            setIsLoading(false);
          }
        }
      );

      return () => {
        unsubscribe();
      };
    },
    [filters, currentPage, ITEMS_PER_PAGE]
  );

  // Initial load and when filters/page change
  useEffect(() => {
    const unsubscribe = refreshBranches();
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [currentPage, refreshBranches]);

  // Separate effect for filter changes with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const unsubscribe = refreshBranches(true); // isFilterChange = true
      return () => {
        if (unsubscribe) unsubscribe();
      };
    }, 50); // Reduced debounce time for faster response

    return () => clearTimeout(timeoutId);
  }, [filters, refreshBranches]);

  useEffect(() => {
    setIsLoading(true);

    const q = query(
      collection(db, "branches1"),
      where("isOperating", "==", true)
    );
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const operatingBranchesList = querySnapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as Branch)
        );
        setOperatingBranches(operatingBranchesList);
        setIsLoading(false);
      },
      (error) => {
        console.error("Error fetching operating branches:", error);
        setIsLoading(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <BranchContext.Provider
      value={{
        branches,
        operatingBranches,
        filteredBranches,
        isLoading,
        isFiltering,
        totalCount,
        currentPage,
        totalPages,
        filters,
        setFilters,
        setCurrentPage,
        refreshBranches,
        isPreloadingImages,
        imagePreloadProgress,
        imagesReady,
      }}
    >
      {children}
    </BranchContext.Provider>
  );
}

export const useBranches = (): BranchContextType => {
  const context = useContext(BranchContext);
  if (!context) {
    throw new Error("useBranches must be used within a BranchProvider");
  }
  return context;
};
