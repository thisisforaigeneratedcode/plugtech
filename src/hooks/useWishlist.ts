import { useState, useEffect, useCallback, useMemo } from 'react';

const WISHLIST_STORAGE_KEY = 'plugtech-wishlist';

export const useWishlist = () => {
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load wishlist from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setWishlistIds(parsed);
        }
      }
    } catch (error) {
      console.error('Error loading wishlist:', error);
      localStorage.removeItem(WISHLIST_STORAGE_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save wishlist to localStorage
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistIds));
      } catch (error) {
        console.error('Error saving wishlist:', error);
      }
    }
  }, [wishlistIds, isLoading]);

  const addToWishlist = useCallback((productId: string) => {
    setWishlistIds(prev => {
      if (prev.includes(productId)) return prev;
      return [...prev, productId];
    });
  }, []);

  const removeFromWishlist = useCallback((productId: string) => {
    setWishlistIds(prev => prev.filter(id => id !== productId));
  }, []);

  const toggleWishlist = useCallback((productId: string) => {
    setWishlistIds(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      }
      return [...prev, productId];
    });
  }, []);

  const isInWishlist = useCallback(
    (productId: string) => wishlistIds.includes(productId),
    [wishlistIds]
  );

  const clearWishlist = useCallback(() => {
    setWishlistIds([]);
  }, []);

  const count = useMemo(() => wishlistIds.length, [wishlistIds]);

  return {
    wishlistIds,
    isLoading,
    count,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    clearWishlist,
  };
};
