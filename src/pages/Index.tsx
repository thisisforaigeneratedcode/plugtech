import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '../components/Footer';
import HeroCarousel from '../components/HeroCarousel';
import CircularCategories from '../components/CircularCategories';
import PromoBanners from '../components/PromoBanners';
import BrandPartners from '../components/BrandPartners';
import ProductCarouselEnhanced from '../components/ProductCarouselEnhanced';
import RecentlyViewedProducts from '../components/RecentlyViewedProducts';
import TrustBadges from '../components/TrustBadges';
import WhyChooseUs from '../components/WhyChooseUs';
import FAQ from '../components/FAQ';
import StickyContact from '../components/StickyContact';
import SEO from '../components/SEO';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '@/contexts/CartContext';
import { useRecentlyViewed } from '../hooks/useRecentlyViewed';

const Index = () => {
  const { products, loading } = useProducts();
  const { addItem, openCart, itemCount } = useCart();
  const { recentlyViewed, clearAll: clearRecentlyViewed } = useRecentlyViewed();

  // Category counts for circular categories
  const categoryCounts = useMemo(() => ({
    laptops: products.filter(p => p.category === 'laptops').length,
    desktops: products.filter(p => p.category === 'desktops').length,
    gaming: products.filter(p => p.category === 'gaming').length,
    monitors: products.filter(p => p.category === 'monitors').length,
    'all-in-one': products.filter(p => p.category === 'all-in-one').length,
    accessories: products.filter(p => p.category === 'accessories').length,
  }), [products]);

  // Memoized product lists
  const latestProducts = useMemo(() => products.slice(0, 12), [products]);
  const laptops = useMemo(() => products.filter(p => p.category === 'laptops'), [products]);
  const gaming = useMemo(() => products.filter(p => p.category === 'gaming'), [products]);
  const desktops = useMemo(() => products.filter(p => p.category === 'desktops'), [products]);
  const monitors = useMemo(() => products.filter(p => p.category === 'monitors'), [products]);
  const allInOne = useMemo(() => products.filter(p => p.category === 'all-in-one'), [products]);
  const accessories = useMemo(() => products.filter(p => p.category === 'accessories'), [products]);

  return (
    <div className="min-h-screen bg-background">
      <SEO />
      <Header />

      {/* Hero Carousel with Deals Ticker */}
      <HeroCarousel />

      {/* Circular Categories */}
      <CircularCategories categoryCounts={categoryCounts} />

      {/* Promo Banners Grid */}
      <PromoBanners />

      {/* Latest Products */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-1">Latest Products</h2>
              <p className="text-muted-foreground text-sm md:text-base">Fresh arrivals just for you</p>
            </div>
            <Link 
              to="/category/laptops" 
              className="hidden sm:inline-flex items-center gap-1 text-primary hover:text-primary-hover font-medium text-sm transition-colors"
            >
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <ProductCarouselEnhanced 
            products={latestProducts}
            onAddToCart={addItem}
            autoScroll={true}
            loading={loading}
          />
        </div>
      </section>

      {/* Recently Viewed Products */}
      <RecentlyViewedProducts
        products={recentlyViewed}
        onClear={clearRecentlyViewed}
      />

      {/* Brand Partners */}
      <BrandPartners />

      {/* Laptops Section */}
      {laptops.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-1">Popular Laptops</h2>
                <p className="text-muted-foreground text-sm md:text-base">Best selling laptops in Nairobi</p>
              </div>
              <Link 
                to="/category/laptops" 
                className="hidden sm:inline-flex items-center gap-1 text-primary hover:text-primary-hover font-medium text-sm transition-colors"
              >
                View All <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <ProductCarouselEnhanced 
              products={laptops}
              onAddToCart={addItem}
              loading={loading}
            />
          </div>
        </section>
      )}

      {/* Trust Badges */}
      <TrustBadges />

      {/* Gaming Section */}
      {gaming.length > 0 && (
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-1">Gaming Computers</h2>
                <p className="text-muted-foreground text-sm md:text-base">High-performance gaming machines</p>
              </div>
              <Link 
                to="/category/gaming" 
                className="hidden sm:inline-flex items-center gap-1 text-primary hover:text-primary-hover font-medium text-sm transition-colors"
              >
                View All <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <ProductCarouselEnhanced 
              products={gaming}
              onAddToCart={addItem}
              loading={loading}
            />
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Desktops Section */}
      {desktops.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-1">Desktop Computers</h2>
                <p className="text-muted-foreground text-sm md:text-base">Powerful workstations for every need</p>
              </div>
              <Link 
                to="/category/desktops" 
                className="hidden sm:inline-flex items-center gap-1 text-primary hover:text-primary-hover font-medium text-sm transition-colors"
              >
                View All <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <ProductCarouselEnhanced 
              products={desktops}
              onAddToCart={addItem}
              loading={loading}
            />
          </div>
        </section>
      )}

      {/* All in One Section */}
      {allInOne.length > 0 && (
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-1">All-in-One Computers</h2>
                <p className="text-muted-foreground text-sm md:text-base">Space-saving elegance</p>
              </div>
              <Link 
                to="/category/all-in-one" 
                className="hidden sm:inline-flex items-center gap-1 text-primary hover:text-primary-hover font-medium text-sm transition-colors"
              >
                View All <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <ProductCarouselEnhanced 
              products={allInOne}
              onAddToCart={addItem}
              loading={loading}
            />
          </div>
        </section>
      )}

      {/* Monitors Section */}
      {monitors.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-1">Monitors</h2>
                <p className="text-muted-foreground text-sm md:text-base">Crystal clear displays</p>
              </div>
              <Link 
                to="/category/monitors" 
                className="hidden sm:inline-flex items-center gap-1 text-primary hover:text-primary-hover font-medium text-sm transition-colors"
              >
                View All <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <ProductCarouselEnhanced 
              products={monitors}
              onAddToCart={addItem}
              loading={loading}
            />
          </div>
        </section>
      )}

      {/* Accessories Section */}
      {accessories.length > 0 && (
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-1">Accessories</h2>
                <p className="text-muted-foreground text-sm md:text-base">Complete your setup</p>
              </div>
              <Link 
                to="/category/accessories" 
                className="hidden sm:inline-flex items-center gap-1 text-primary hover:text-primary-hover font-medium text-sm transition-colors"
              >
                View All <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <ProductCarouselEnhanced 
              products={accessories}
              onAddToCart={addItem}
              loading={loading}
            />
          </div>
        </section>
      )}

      {/* FAQ */}
      <FAQ />

      {/* Footer */}
      <Footer />

      {/* Sticky Contact for Mobile */}
      <StickyContact />
    </div>
  );
};

export default Index;
