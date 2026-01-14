import { memo } from 'react';
import { X, ShoppingCart, Heart, Shield, Truck, RefreshCw, Star } from 'lucide-react';
import { Product } from '@/types/product';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/hooks/useWishlist';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import WhatsAppButton from './WhatsAppButton';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

interface ProductQuickViewProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductQuickView = memo(({ product, isOpen, onClose }: ProductQuickViewProps) => {
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  if (!product) return null;

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addItem(product);
    onClose();
  };

  const getConditionColor = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'new':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'refurbished':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'ex uk':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden">
        <VisuallyHidden>
          <DialogTitle>{product.name}</DialogTitle>
        </VisuallyHidden>
        <div className="grid md:grid-cols-2 gap-0">
          {/* Image Section */}
          <div className="relative aspect-square bg-muted">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            
            {/* Wishlist Button */}
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                inWishlist
                  ? 'bg-red-500 text-white'
                  : 'bg-white/90 text-foreground hover:bg-white'
              }`}
            >
              <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
            </button>

            {/* Status Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.in_stock ? (
                <Badge className="bg-emerald-500 hover:bg-emerald-500 text-white">
                  In Stock
                </Badge>
              ) : (
                <Badge variant="destructive">Out of Stock</Badge>
              )}
              <Badge className={getConditionColor(product.condition)} variant="outline">
                {product.condition}
              </Badge>
            </div>
          </div>

          {/* Details Section */}
          <div className="p-6 flex flex-col">
            {/* Rating */}
            <div className="flex items-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`}
                />
              ))}
              <span className="text-sm text-muted-foreground ml-2">(4.0)</span>
            </div>

            {/* Title */}
            <h2 className="text-xl font-semibold text-foreground mb-4 leading-tight">
              {product.name}
            </h2>

            {/* Price */}
            <div className="mb-6">
              <span className="text-3xl font-bold text-primary">
                KSh {product.price.toLocaleString()}
              </span>
            </div>

            {/* Specs */}
            <div className="space-y-3 mb-6 text-sm">
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Processor</span>
                <span className="font-medium text-foreground">{product.processor}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">RAM</span>
                <span className="font-medium text-foreground">{product.ram}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Storage</span>
                <span className="font-medium text-foreground">{product.storage}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Display</span>
                <span className="font-medium text-foreground">{product.display}</span>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="flex flex-col items-center text-center p-2 rounded-lg bg-muted/50">
                <Shield className="w-4 h-4 text-primary mb-1" />
                <span className="text-xs text-muted-foreground">30-Day Warranty</span>
              </div>
              <div className="flex flex-col items-center text-center p-2 rounded-lg bg-muted/50">
                <Truck className="w-4 h-4 text-primary mb-1" />
                <span className="text-xs text-muted-foreground">Fast Delivery</span>
              </div>
              <div className="flex flex-col items-center text-center p-2 rounded-lg bg-muted/50">
                <RefreshCw className="w-4 h-4 text-primary mb-1" />
                <span className="text-xs text-muted-foreground">Easy Returns</span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 mt-auto">
              <Button
                onClick={handleAddToCart}
                disabled={!product.in_stock}
                className="w-full h-12 text-base"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
              
              <WhatsAppButton
                productName={product.name}
                productPrice={product.price}
                className="w-full h-12 bg-accent hover:bg-accent-hover text-accent-foreground rounded-lg font-medium"
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
});

ProductQuickView.displayName = 'ProductQuickView';

export default ProductQuickView;
