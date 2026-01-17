import { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Eye } from 'lucide-react';
import { Product } from '@/types/product';
import { getOptimizedImageUrl, getImageSrcSet } from '@/utils/imageOptimization';
import { cn } from '@/lib/utils';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/hooks/useWishlist';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onQuickView?: () => void;
  className?: string;
}

const ProductCard = memo(({ product, onAddToCart, onQuickView, className }: ProductCardProps) => {
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product);
    } else {
      addItem(product);
    }
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickView?.();
  };

  const getConditionColor = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'new':
        return 'bg-emerald-500 text-white';
      case 'refurbished':
        return 'bg-primary text-primary-foreground';
      case 'ex uk':
        return 'bg-violet-500 text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div 
      className={cn(
        "group bg-card rounded-xl border border-border overflow-hidden h-full flex flex-col",
        "transition-all duration-300 hover:shadow-xl hover:border-primary/30 hover:-translate-y-1",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container - Wrapped in Link */}
      <Link 
        to={`/product/${product.id}`}
        className="relative aspect-[4/3] bg-muted overflow-hidden block"
      >
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
            "w-full h-full object-cover transition-all duration-500 group-hover:scale-110",
            imageLoaded ? "opacity-100" : "opacity-0"
          )}
          loading="lazy"
          decoding="async"
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Condition Badge */}
        <div className="absolute top-3 left-3">
          <span className={cn(
            "px-2.5 py-1 rounded-full text-xs font-medium",
            getConditionColor(product.condition)
          )}>
            {product.condition}
          </span>
        </div>

        {/* Gradient overlay on hover */}
        <div className={cn(
          "absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent transition-opacity duration-300",
          isHovered ? "opacity-100" : "opacity-0"
        )} />

        {/* Stock Status */}
        {!product.in_stock && (
          <div className="absolute inset-0 bg-background/90 backdrop-blur-sm flex items-center justify-center">
            <span className="text-sm font-semibold text-muted-foreground">Out of Stock</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className={cn(
          "absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300",
          isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
        )}>
          {/* Wishlist Button */}
          <button 
            onClick={handleWishlistClick}
            className={cn(
              "w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center transition-all duration-200 shadow-lg",
              isWishlisted 
                ? "bg-red-500 text-white scale-110" 
                : "bg-background/95 hover:bg-background text-muted-foreground hover:text-red-500 hover:scale-110"
            )}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={cn("w-4 h-4 transition-transform", isWishlisted && "fill-current")} />
          </button>

          {/* Quick View Button */}
          {onQuickView && (
            <button 
              onClick={handleQuickView}
              className="w-10 h-10 rounded-full bg-background/95 backdrop-blur-md flex items-center justify-center hover:bg-background text-muted-foreground hover:text-primary hover:scale-110 transition-all duration-200 shadow-lg"
              aria-label="Quick view"
            >
              <Eye className="w-4 h-4" />
            </button>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="flex-1 p-4 flex flex-col">
        {/* Category badge */}
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium mb-2">
          {product.category}
        </span>

        {/* Product Name - Linked */}
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-foreground text-sm leading-tight line-clamp-2 mb-3 min-h-[2.5rem] hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        
        {/* Specs Grid */}
        <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs text-muted-foreground mb-4 flex-1">
          <div className="truncate">
            <span className="text-foreground/70 font-medium">CPU:</span> {product.processor.split(' ').slice(0, 2).join(' ')}
          </div>
          <div className="truncate">
            <span className="text-foreground/70 font-medium">RAM:</span> {product.ram}
          </div>
          <div className="truncate">
            <span className="text-foreground/70 font-medium">Storage:</span> {product.storage}
          </div>
          <div className="truncate">
            <span className="text-foreground/70 font-medium">Display:</span> {product.display.split(' ')[0]}
          </div>
        </div>

        {/* Price & Actions */}
        <div className="mt-auto pt-3 border-t border-border/50">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xl font-bold text-foreground">
              KSh {product.price.toLocaleString()}
            </span>
            {product.in_stock && (
              <span className="text-xs text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded-full">In Stock</span>
            )}
          </div>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart();
            }}
            disabled={!product.in_stock}
            className={cn(
              "w-full py-3 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all duration-300",
              product.in_stock 
                ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98]" 
                : "bg-muted text-muted-foreground cursor-not-allowed"
            )}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;
