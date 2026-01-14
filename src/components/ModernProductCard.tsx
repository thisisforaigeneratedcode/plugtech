import { memo, useState } from 'react';
import { Heart, Eye, ShoppingCart, Star } from 'lucide-react';
import { Product } from '@/types/product';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/hooks/useWishlist';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getOptimizedImageUrl, getImageSrcSet } from '@/utils/imageOptimization';

interface ModernProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

const ModernProductCard = memo(({ product, onQuickView }: ModernProductCardProps) => {
  const { addItem, openCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product);
    openCart();
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickView?.(product);
  };

  const getConditionStyle = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'new':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'refurbished':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'ex uk':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div
      className="group relative bg-card rounded-2xl border border-border overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary/20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] bg-muted overflow-hidden">
        {/* Skeleton loader */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-muted animate-pulse" />
        )}
        
        <img
          src={getOptimizedImageUrl(product.image, product.image_version, { width: 400, height: 300, quality: 85 })}
          srcSet={getImageSrcSet(product.image, product.image_version)}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
          decoding="async"
          onLoad={() => setImageLoaded(true)}
        />

        {/* Overlay Actions */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-between p-4 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Top Actions */}
          <div className="flex justify-end gap-2">
            <button
              onClick={handleWishlist}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all backdrop-blur-sm ${
                inWishlist
                  ? 'bg-red-500 text-white'
                  : 'bg-white/90 text-foreground hover:bg-white hover:scale-110'
              }`}
            >
              <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={handleQuickView}
              className="w-9 h-9 rounded-full bg-white/90 text-foreground flex items-center justify-center hover:bg-white hover:scale-110 transition-all backdrop-blur-sm"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>

          {/* Bottom Action */}
          <Button
            onClick={handleAddToCart}
            disabled={!product.in_stock}
            className="w-full bg-white text-foreground hover:bg-primary hover:text-primary-foreground transition-all"
            size="sm"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            {product.in_stock ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.in_stock ? (
            <Badge className="bg-emerald-500 hover:bg-emerald-500 text-white text-[10px] px-2 py-0.5">
              In Stock
            </Badge>
          ) : (
            <Badge variant="destructive" className="text-[10px] px-2 py-0.5">
              Sold Out
            </Badge>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category & Condition */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
            {product.category}
          </span>
          <span className="text-muted-foreground/30">•</span>
          <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${getConditionStyle(product.condition)}`}>
            {product.condition}
          </Badge>
        </div>

        {/* Title */}
        <h3 className="font-medium text-foreground text-sm leading-snug line-clamp-2 mb-2 min-h-[2.5rem] group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-3 h-3 ${i < 4 ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/30'}`}
            />
          ))}
          <span className="text-[10px] text-muted-foreground ml-1">(4.0)</span>
        </div>

        {/* Key Specs */}
        <div className="text-[11px] text-muted-foreground space-y-0.5 mb-3">
          <p className="truncate">{product.processor}</p>
          <p>{product.ram} • {product.storage}</p>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold text-foreground">
            KSh {product.price.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
});

ModernProductCard.displayName = 'ModernProductCard';

export default ModernProductCard;
