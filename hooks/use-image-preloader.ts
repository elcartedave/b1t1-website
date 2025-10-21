import { useState, useEffect, useCallback, useMemo } from "react";

interface ImagePreloadState {
  isLoading: boolean;
  loadedImages: Set<string>;
  failedImages: Set<string>;
  progress: number;
}

export function useImagePreloader(imageUrls: string[]) {
  const [state, setState] = useState<ImagePreloadState>({
    isLoading: false,
    loadedImages: new Set(),
    failedImages: new Set(),
    progress: 0,
  });

  // Create a stable reference for imageUrls to prevent unnecessary re-renders
  const stableImageUrls = useMemo(() => imageUrls, [imageUrls.join(",")]);

  const preloadImages = useCallback(async () => {
    if (!stableImageUrls.length) {
      setState((prev) => ({ ...prev, isLoading: false, progress: 100 }));
      return;
    }

    setState((prev) => ({
      ...prev,
      isLoading: true,
      loadedImages: new Set(),
      failedImages: new Set(),
      progress: 0,
    }));

    let completedCount = 0;
    const totalCount = stableImageUrls.length;
    const loadedImages = new Set<string>();
    const failedImages = new Set<string>();

    const promises = stableImageUrls.map((url) => {
      return new Promise<void>((resolve) => {
        const img = new Image();

        img.onload = () => {
          loadedImages.add(url);
          completedCount++;

          // Update progress less frequently to reduce re-renders
          if (
            completedCount % Math.max(1, Math.floor(totalCount / 10)) === 0 ||
            completedCount === totalCount
          ) {
            setState((prev) => ({
              ...prev,
              loadedImages: new Set(loadedImages),
              failedImages: new Set(failedImages),
              progress: Math.round((completedCount / totalCount) * 100),
            }));
          }
          resolve();
        };

        img.onerror = () => {
          failedImages.add(url);
          completedCount++;

          // Update progress less frequently to reduce re-renders
          if (
            completedCount % Math.max(1, Math.floor(totalCount / 10)) === 0 ||
            completedCount === totalCount
          ) {
            setState((prev) => ({
              ...prev,
              loadedImages: new Set(loadedImages),
              failedImages: new Set(failedImages),
              progress: Math.round((completedCount / totalCount) * 100),
            }));
          }
          resolve();
        };

        img.src = url;
      });
    });

    await Promise.all(promises);

    setState((prev) => ({
      ...prev,
      isLoading: false,
      loadedImages: new Set(loadedImages),
      failedImages: new Set(failedImages),
      progress: 100,
    }));
  }, [stableImageUrls]);

  useEffect(() => {
    if (stableImageUrls.length > 0) {
      preloadImages();
    } else {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        progress: 100,
        loadedImages: new Set(),
        failedImages: new Set(),
      }));
    }
  }, [stableImageUrls, preloadImages]);

  const reset = useCallback(() => {
    setState({
      isLoading: false,
      loadedImages: new Set(),
      failedImages: new Set(),
      progress: 0,
    });
  }, []);

  return {
    ...state,
    isComplete:
      state.loadedImages.size + state.failedImages.size ===
      stableImageUrls.length,
    reset,
    preloadImages,
  };
}
