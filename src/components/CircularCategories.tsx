import { Link } from 'react-router-dom';
import { Laptop, Monitor, Gamepad2, HardDrive, Headphones, MonitorSmartphone, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface Category {
  name: string;
  slug: string;
  count: number;
  icon: React.ElementType;
  gradient: string;
  bgColor: string;
}

const CATEGORIES: Category[] = [
  { 
    name: 'Laptops', 
    slug: 'laptops',
    icon: Laptop, 
    count: 0,
    gradient: 'from-orange-400 to-orange-500',
    bgColor: 'bg-orange-50',
  },
  { 
    name: 'Desktops', 
    slug: 'desktops',
    icon: HardDrive, 
    count: 0,
    gradient: 'from-blue-400 to-blue-500',
    bgColor: 'bg-blue-50',
  },
  { 
    name: 'Gaming', 
    slug: 'gaming',
    icon: Gamepad2, 
    count: 0,
    gradient: 'from-purple-400 to-purple-500',
    bgColor: 'bg-purple-50',
  },
  { 
    name: 'Monitors', 
    slug: 'monitors',
    icon: Monitor, 
    count: 0,
    gradient: 'from-emerald-400 to-emerald-500',
    bgColor: 'bg-emerald-50',
  },
  { 
    name: 'All in One', 
    slug: 'all-in-one',
    icon: MonitorSmartphone, 
    count: 0,
    gradient: 'from-pink-400 to-pink-500',
    bgColor: 'bg-pink-50',
  },
  { 
    name: 'Accessories', 
    slug: 'accessories',
    icon: Headphones, 
    count: 0,
    gradient: 'from-amber-400 to-amber-500',
    bgColor: 'bg-amber-50',
  },
];

interface CircularCategoriesProps {
  categoryCounts: Record<string, number>;
}

const CircularCategories = ({ categoryCounts }: CircularCategoriesProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
              Explore Categories
            </h2>
            <p className="text-muted-foreground text-sm md:text-base">
              Find exactly what you need
            </p>
          </div>
          
          {/* Navigation Arrows - Desktop */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={cn(
                "w-10 h-10 rounded-full border border-border flex items-center justify-center transition-all",
                canScrollLeft 
                  ? "hover:bg-muted hover:border-primary/30 text-foreground" 
                  : "text-muted-foreground/30 cursor-not-allowed"
              )}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={cn(
                "w-10 h-10 rounded-full border border-border flex items-center justify-center transition-all",
                canScrollRight 
                  ? "hover:bg-muted hover:border-primary/30 text-foreground" 
                  : "text-muted-foreground/30 cursor-not-allowed"
              )}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Categories Scroll Container */}
        <div className="relative">
          <div 
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex gap-4 md:gap-6 overflow-x-auto scroll-smooth-x pb-4 -mx-4 px-4 md:mx-0 md:px-0"
          >
            {CATEGORIES.map((category, index) => {
              const Icon = category.icon;
              const count = categoryCounts[category.slug] || 0;
              
              return (
                <Link
                  key={category.slug}
                  to={`/category/${category.slug}`}
                  className="group flex flex-col items-center flex-shrink-0 animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Circular Icon Container */}
                  <div className={cn(
                    "relative w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center mb-3 transition-all duration-300",
                    "group-hover:scale-110 group-hover:shadow-lg",
                    category.bgColor
                  )}>
                    {/* Gradient ring on hover */}
                    <div className={cn(
                      "absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                      `bg-gradient-to-br ${category.gradient}`,
                      "p-[2px]"
                    )}>
                      <div className={cn("w-full h-full rounded-full", category.bgColor)} />
                    </div>
                    
                    {/* Icon */}
                    <Icon className={cn(
                      "w-8 h-8 md:w-10 md:h-10 relative z-10 transition-colors duration-300",
                      "text-foreground/70 group-hover:text-foreground"
                    )} />
                  </div>
                  
                  {/* Category Name */}
                  <span className="text-sm font-medium text-foreground text-center whitespace-nowrap">
                    {category.name}
                  </span>
                  
                  {/* Product Count */}
                  <span className="text-xs text-muted-foreground">
                    {count} items
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CircularCategories;
