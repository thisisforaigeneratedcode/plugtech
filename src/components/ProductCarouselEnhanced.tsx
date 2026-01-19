import { useRef, useState, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '@/types/product';
import ProductCardEnhanced from './ProductCardEnhanced';
import { cn } from '@/lib/utils';

interface ProductCarouselEnhancedProps {
  products: Product[];
  onAddToCart?: (product: Product) => void;
  autoScroll?: boolean;
  loading?: boolean;
}

const ProductCarouselEnhanced = ({ 
  products, 
  onAddToCart,
  autoScroll = false,
  loading = false 
}: ProductCarouselEnhancedProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const checkScroll = useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  }, []);

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [checkScroll, products]);

  // Auto-scroll effect
  useEffect(() => {
    if (!autoScroll || isHovered || !scrollRef.current) return;
    
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft >= scrollWidth - clientWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [autoScroll, isHovered]);

  const scroll = useCallback((direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const cardWidth = 280;
      const scrollAmount = cardWidth * 2;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
      setTimeout(checkScroll, 300);
    }
  }, [checkScroll]);

  if (loading) {
    return (
      <div className="flex gap-4 overflow-hidden">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex-shrink-0 w-[260px] md:w-[280px]">
            <div className="bg-card rounded-2xl border border-border overflow-hidden animate-pulse">
              <div className="aspect-[4/3] bg-muted" />
              <div className="p-4 space-y-3">
                <div className="h-3 bg-muted rounded w-1/3" />
                <div className="h-4 bg-muted rounded w-full" />
                <div className="h-4 bg-muted rounded w-2/3" />
                <div className="h-3 bg-muted rounded w-1/2" />
                <div className="flex gap-2">
                  <div className="h-5 bg-muted rounded w-12" />
                  <div className="h-5 bg-muted rounded w-12" />
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-border">
                  <div className="h-6 bg-muted rounded w-24" />
                  <div className="h-10 w-10 bg-muted rounded-full" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No products available
      </div>
    );
  }

  return (
    <div 
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Navigation Buttons */}
      <button
        onClick={() => scroll('left')}
        disabled={!canScrollLeft}
        className={cn(
          "absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10",
          "w-10 h-10 md:w-12 md:h-12 rounded-full bg-card border border-border shadow-lg",
          "flex items-center justify-center transition-all duration-200",
          "opacity-0 group-hover:opacity-100 group-hover:translate-x-0",
          canScrollLeft 
            ? "hover:bg-primary hover:text-primary-foreground hover:border-primary" 
            : "cursor-not-allowed opacity-50"
        )}
        aria-label="Scroll left"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={() => scroll('right')}
        disabled={!canScrollRight}
        className={cn(
          "absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10",
          "w-10 h-10 md:w-12 md:h-12 rounded-full bg-card border border-border shadow-lg",
          "flex items-center justify-center transition-all duration-200",
          "opacity-0 group-hover:opacity-100 group-hover:translate-x-0",
          canScrollRight 
            ? "hover:bg-primary hover:text-primary-foreground hover:border-primary" 
            : "cursor-not-allowed opacity-50"
        )}
        aria-label="Scroll right"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Products Container */}
      <div 
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex gap-4 overflow-x-auto scroll-smooth-x pb-4 -mx-4 px-4"
      >
        {products.map((product) => (
          <div key={product.id} className="flex-shrink-0 w-[260px] md:w-[280px]">
            <ProductCardEnhanced
              product={product}
              onAddToCart={onAddToCart}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCarouselEnhanced;
