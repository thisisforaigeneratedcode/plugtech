import { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { Product } from '@/types/product';
import { getOptimizedImageUrl, getImageSrcSet } from '@/utils/imageOptimization';
import { cn } from '@/lib/utils';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/hooks/useWishlist';

interface ProductCardEnhancedProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  className?: string;
}

// Generate a pseudo-random rating based on product id
const getProductRating = (id: string): { rating: number; reviews: number } => {
  const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const rating = 4 + (hash % 10) / 10; // 4.0 - 4.9
  const reviews = 10 + (hash % 90); // 10 - 99
  return { rating: Math.round(rating * 10) / 10, reviews };
};

const ProductCardEnhanced = memo(({ product, onAddToCart, className }: ProductCardEnhancedProps) => {
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const isWishlisted = isInWishlist(product.id);
  const { rating, reviews } = getProductRating(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
    } else {
      addItem(product);
    }
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const getConditionBadge = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'new':
        return { text: 'New', className: 'bg-emerald-500 text-white' };
      case 'refurbished':
        return { text: 'Refurbished', className: 'bg-primary text-white' };
      case 'ex uk':
        return { text: 'Ex-UK', className: 'bg-violet-500 text-white' };
      default:
        return { text: condition, className: 'bg-muted text-muted-foreground' };
    }
  };

  const conditionBadge = getConditionBadge(product.condition);

  return (
    <Link 
      to={`/product/${product.id}`}
      className={cn(
        "group block bg-card rounded-2xl border border-border overflow-hidden h-full",
        "transition-all duration-300 hover:shadow-xl hover:border-primary/20 hover:-translate-y-1",
        className
      )}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] bg-muted/50 overflow-hidden">
        {/* Skeleton loader */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted/50 animate-pulse" />
        )}
        
        <img
          src={getOptimizedImageUrl(product.image, product.image_version, { width: 400, height: 300, quality: 85 })}
          srcSet={getImageSrcSet(product.image, product.image_version)}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          alt={product.name}
          width={400}
          height={300}
          className={cn(
            "w-full h-full object-cover transition-all duration-500 group-hover:scale-105",
            imageLoaded ? "opacity-100" : "opacity-0"
          )}
          loading="lazy"
          decoding="async"
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Condition Badge */}
        <div className="absolute top-3 left-3">
          <span className={cn(
            "px-2.5 py-1 rounded-full text-xs font-medium shadow-sm",
            conditionBadge.className
          )}>
            {conditionBadge.text}
          </span>
        </div>

        {/* Wishlist Button */}
        <button 
          onClick={handleWishlistClick}
          className={cn(
            "absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 shadow-md",
            isWishlisted 
              ? "bg-red-500 text-white" 
              : "bg-white/90 backdrop-blur-sm text-muted-foreground hover:text-red-500 hover:bg-white"
          )}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={cn("w-4 h-4", isWishlisted && "fill-current")} />
        </button>

        {/* Out of Stock Overlay */}
        {!product.in_stock && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
            <span className="text-sm font-semibold text-muted-foreground bg-muted px-4 py-2 rounded-full">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
          {product.category}
        </span>

        {/* Product Name */}
        <h3 className="font-semibold text-foreground text-sm leading-snug line-clamp-2 mt-1 mb-2 min-h-[2.5rem] group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        
        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "w-3.5 h-3.5",
                  i < Math.floor(rating) 
                    ? "text-amber-400 fill-amber-400" 
                    : "text-muted-foreground/30"
                )}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            {rating} ({reviews})
          </span>
        </div>

        {/* Key Specs - Simplified */}
        <div className="flex flex-wrap gap-1.5 text-xs text-muted-foreground mb-4">
          <span className="bg-muted px-2 py-0.5 rounded">
            {product.ram}
          </span>
          <span className="bg-muted px-2 py-0.5 rounded">
            {product.storage}
          </span>
        </div>

        {/* Price & Cart */}
        <div className="flex items-center justify-between pt-3 border-t border-border/50">
          <div>
            <span className="text-lg font-bold text-foreground">
              KSh {product.price.toLocaleString()}
            </span>
            {product.in_stock && (
              <p className="text-xs text-emerald-600 font-medium">In Stock</p>
            )}
          </div>
          
          <button
            onClick={handleAddToCart}
            disabled={!product.in_stock}
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200",
              product.in_stock 
                ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-110 shadow-md hover:shadow-lg" 
                : "bg-muted text-muted-foreground cursor-not-allowed"
            )}
            aria-label="Add to cart"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Link>
  );
});

ProductCardEnhanced.displayName = 'ProductCardEnhanced';

export default ProductCardEnhanced;
