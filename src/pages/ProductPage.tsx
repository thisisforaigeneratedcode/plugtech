import { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Home, ShoppingCart, Heart, Share2, Shield, Truck, RotateCcw, Check, Plus, Minus, Scale } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCarousel from '../components/ProductCarousel';
import WhatsAppButton from '../components/WhatsAppButton';
import WhatsAppIcon from '../components/icons/WhatsAppIcon';
import { useProducts } from '@/hooks/useProducts';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/hooks/useWishlist';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getOptimizedImageUrl } from '@/utils/imageOptimization';

const ProductPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { products, loading } = useProducts();
  const { addItem, openCart, itemCount } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const product = useMemo(() => 
    products.find(p => p.id === productId),
    [products, productId]
  );

  const isWishlisted = product ? isInWishlist(product.id) : false;

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 8);
  }, [products, product]);

  // Generate multiple image views (simulated)
  const productImages = useMemo(() => {
    if (!product) return [];
    return [
      getOptimizedImageUrl(product.image, product.image_version, { width: 600, height: 450, quality: 90 }),
      getOptimizedImageUrl(product.image, product.image_version, { width: 600, height: 450, quality: 90 }),
      getOptimizedImageUrl(product.image, product.image_version, { width: 600, height: 450, quality: 90 }),
    ];
  }, [product]);

  const handleAddToCart = () => {
    if (!product) return;
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    openCart();
  };

  const handleShare = async () => {
    if (!product) return;
    const shareData = {
      title: product.name,
      text: `Check out ${product.name} at KSh ${product.price.toLocaleString()}`,
      url: window.location.href
    };
    
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (err) {
      console.error('Share failed:', err);
    }
  };

  const handleCompare = () => {
    if (!product) return;
    // Get existing comparison list from localStorage
    const existing = JSON.parse(localStorage.getItem('compareProducts') || '[]');
    if (!existing.includes(product.id) && existing.length < 4) {
      existing.push(product.id);
      localStorage.setItem('compareProducts', JSON.stringify(existing));
      navigate('/compare');
    } else if (existing.length >= 4) {
      alert('You can compare up to 4 products at a time');
    } else {
      navigate('/compare');
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'new':
        return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20';
      case 'refurbished':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'ex uk':
        return 'bg-violet-500/10 text-violet-600 border-violet-500/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header cartItemsCount={itemCount} onCartOpen={openCart} />
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="animate-pulse text-muted-foreground">Loading product...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header cartItemsCount={itemCount} onCartOpen={openCart} />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/">Browse Products</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemsCount={itemCount} onCartOpen={openCart} />

      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1">
            <Home className="w-4 h-4" />
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link to={`/category/${product.category}`} className="hover:text-primary transition-colors capitalize">
            {product.category.replace('-', ' ')}
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground font-medium line-clamp-1">{product.name}</span>
        </nav>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-[4/3] bg-muted rounded-2xl overflow-hidden">
              <img
                src={productImages[activeImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {/* Condition Badge */}
              <div className="absolute top-4 left-4">
                <span className={cn(
                  "px-3 py-1.5 rounded-full text-sm font-semibold border",
                  getConditionColor(product.condition)
                )}>
                  {product.condition}
                </span>
              </div>
              {!product.in_stock && (
                <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                  <span className="text-lg font-semibold text-muted-foreground">Out of Stock</span>
                </div>
              )}
            </div>
            
            {/* Thumbnail Gallery */}
            <div className="flex gap-3">
              {productImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={cn(
                    "w-20 h-20 rounded-lg overflow-hidden border-2 transition-all",
                    activeImageIndex === index 
                      ? "border-primary ring-2 ring-primary/20" 
                      : "border-border hover:border-muted-foreground/50"
                  )}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="flex items-start justify-between gap-4 mb-4">
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground leading-tight">
                {product.name}
              </h1>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={cn(
                    "p-2.5 rounded-lg border transition-all",
                    isWishlisted 
                      ? "bg-red-50 border-red-200 text-red-500" 
                      : "bg-background border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
                  )}
                >
                  <Heart className={cn("w-5 h-5", isWishlisted && "fill-current")} />
                </button>
                <button
                  onClick={handleShare}
                  className="p-2.5 rounded-lg border border-border bg-background text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl lg:text-4xl font-bold text-foreground">
                KSh {product.price.toLocaleString()}
              </span>
              {product.in_stock && (
                <span className="text-sm font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  In Stock
                </span>
              )}
            </div>

            {/* Specifications */}
            <div className="bg-muted/50 rounded-xl p-5 mb-6">
              <h3 className="font-semibold text-foreground mb-4">Specifications</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center border border-border">
                    <span className="text-xs font-bold text-primary">CPU</span>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Processor</p>
                    <p className="text-sm font-medium text-foreground">{product.processor}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center border border-border">
                    <span className="text-xs font-bold text-primary">RAM</span>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Memory</p>
                    <p className="text-sm font-medium text-foreground">{product.ram}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center border border-border">
                    <span className="text-xs font-bold text-primary">SSD</span>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Storage</p>
                    <p className="text-sm font-medium text-foreground">{product.storage}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center border border-border">
                    <span className="text-xs font-bold text-primary">LCD</span>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Display</p>
                    <p className="text-sm font-medium text-foreground">{product.display}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quantity & Actions */}
            <div className="space-y-4 mb-6">
              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-foreground">Quantity:</span>
                <div className="flex items-center border border-border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-muted transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-muted transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleAddToCart}
                  disabled={!product.in_stock}
                  className="flex-1 h-12"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <WhatsAppButton
                  productName={product.name}
                  productPrice={product.price}
                  productUrl={`/product/${product.id}`}
                  className="flex-1 h-12 bg-accent text-accent-foreground hover:bg-accent-hover rounded-lg font-medium inline-flex items-center justify-center gap-2 transition-colors"
                  label="Order via WhatsApp"
                />
              </div>

              {/* Compare Button */}
              <button
                onClick={handleCompare}
                className="w-full py-2.5 border border-border rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all flex items-center justify-center gap-2"
              >
                <Scale className="w-4 h-4" />
                Add to Compare
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-border">
              <div className="text-center p-3 rounded-lg bg-muted/50">
                <Shield className="w-5 h-5 mx-auto mb-1.5 text-primary" />
                <p className="text-xs font-medium text-foreground">30-Day Warranty</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-muted/50">
                <Truck className="w-5 h-5 mx-auto mb-1.5 text-primary" />
                <p className="text-xs font-medium text-foreground">Fast Delivery</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-muted/50">
                <RotateCcw className="w-5 h-5 mx-auto mb-1.5 text-primary" />
                <p className="text-xs font-medium text-foreground">Easy Returns</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-foreground">Similar Products</h2>
                <p className="text-muted-foreground text-sm">You might also like these</p>
              </div>
              <Link 
                to={`/category/${product.category}`}
                className="text-primary hover:text-primary-hover font-medium text-sm flex items-center gap-1"
              >
                View All <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <ProductCarousel 
              products={relatedProducts}
              onAddToCart={addItem}
              loading={false}
            />
          </section>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ProductPage;
