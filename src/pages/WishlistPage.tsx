import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import ProductQuickView from '../components/ProductQuickView';
import { useWishlist } from '@/hooks/useWishlist';
import { useProducts } from '@/hooks/useProducts';
import { useCart } from '@/contexts/CartContext';
import { Product } from '@/types/product';
import { ChevronRight, Home, Heart, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCardSkeleton from '@/components/ProductCardSkeleton';

const WishlistPage = () => {
  const { wishlistIds, clearWishlist, isLoading: wishlistLoading } = useWishlist();
  const { products, loading: productsLoading } = useProducts();
  const { itemCount, openCart } = useCart();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Get wishlist items from products
  const wishlistItems = useMemo(() => {
    if (productsLoading) return [];
    return products.filter((product) => wishlistIds.includes(product.id));
  }, [products, wishlistIds, productsLoading]);

  const isLoading = wishlistLoading || productsLoading;

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemsCount={itemCount} onCartOpen={openCart} />

      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1">
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground font-medium">My Wishlist</span>
        </nav>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-2">
              <Heart className="w-7 h-7 text-red-500 fill-red-500" />
              My Wishlist
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              {isLoading ? 'Loading...' : `${wishlistItems.length} ${wishlistItems.length === 1 ? 'item' : 'items'} saved`}
            </p>
          </div>

          {wishlistItems.length > 0 && (
            <Button variant="outline" onClick={clearWishlist}>
              Clear Wishlist
            </Button>
          )}
        </div>

        {/* Wishlist Items */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        ) : wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={() => setQuickViewProduct(product)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-muted/30 rounded-xl">
            <Heart className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-6">
              Save items you love by clicking the heart icon on any product.
            </p>
            <Button asChild>
              <Link to="/" className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4" />
                Start Shopping
              </Link>
            </Button>
          </div>
        )}
      </div>

      <Footer />

      {/* Quick View Modal */}
      <ProductQuickView
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};

export default WishlistPage;
