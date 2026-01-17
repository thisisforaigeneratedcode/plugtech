import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Laptop, Monitor, Gamepad2, HardDrive, Headphones, Settings, ArrowRight, Shield, Truck, Award, ChevronRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCarousel from '../components/ProductCarousel';
import TrustBadges from '../components/TrustBadges';
import WhyChooseUs from '../components/WhyChooseUs';
import FAQ from '../components/FAQ';
import StickyContact from '../components/StickyContact';
import SEO from '../components/SEO';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '@/contexts/CartContext';
import WhatsAppButton from '../components/WhatsAppButton';

const Index = () => {
  const { products, loading } = useProducts();
  const { addItem, openCart, itemCount } = useCart();

  const categories = useMemo(() => [
    { 
      name: 'Laptops', 
      slug: 'laptops',
      icon: Laptop, 
      count: products.filter(p => p.category === 'laptops').length,
    },
    { 
      name: 'Desktops', 
      slug: 'desktops',
      icon: HardDrive, 
      count: products.filter(p => p.category === 'desktops').length,
    },
    { 
      name: 'Gaming', 
      slug: 'gaming',
      icon: Gamepad2, 
      count: products.filter(p => p.category === 'gaming').length,
    },
    { 
      name: 'Monitors', 
      slug: 'monitors',
      icon: Monitor, 
      count: products.filter(p => p.category === 'monitors').length,
    },
    { 
      name: 'All in One', 
      slug: 'all-in-one',
      icon: Settings, 
      count: products.filter(p => p.category === 'all-in-one').length,
    },
    { 
      name: 'Accessories', 
      slug: 'accessories',
      icon: Headphones, 
      count: products.filter(p => p.category === 'accessories').length,
    },
  ], [products]);

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
      <Header cartItemsCount={itemCount} onCartOpen={openCart} />

      {/* Hero Section - Premium animated design */}
      <section className="relative bg-gradient-to-br from-background via-muted/30 to-background py-20 md:py-28 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/3 to-transparent rounded-full" />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            {/* Animated Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-accent/10 text-primary px-5 py-2 rounded-full text-sm font-medium mb-8 border border-primary/20 animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">Delivery Available Across Nairobi</span>
            </div>

            {/* Headline with gradient */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-[1.1] animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <span className="text-foreground">Find Your Perfect</span>
              <br />
              <span className="bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">Computer Today</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Quality laptops, desktops, and gaming machines. Every device tested, every purchase backed by warranty. Visit our Nairobi CBD shop today.
            </p>

            {/* CTAs with micro-interactions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Link 
                to="/category/laptops"
                className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5"
              >
                Browse Laptops
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <WhatsAppButton className="group bg-card border-2 border-border text-foreground px-8 py-4 rounded-xl font-semibold hover:border-primary/50 hover:shadow-lg transition-all duration-300 inline-flex items-center gap-2 hover:-translate-y-0.5" />
            </div>

            {/* Trust Indicators with animation */}
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-sm animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center gap-3 group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 flex items-center justify-center group-hover:scale-110 transition-transform border border-emerald-500/20">
                  <Shield className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-foreground">30-Day Warranty</div>
                  <div className="text-xs text-muted-foreground">On all products</div>
                </div>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 flex items-center justify-center group-hover:scale-110 transition-transform border border-blue-500/20">
                  <Truck className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-foreground">Same-Day Delivery</div>
                  <div className="text-xs text-muted-foreground">Within Nairobi</div>
                </div>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/10 to-amber-500/5 flex items-center justify-center group-hover:scale-110 transition-transform border border-amber-500/20">
                  <Award className="w-5 h-5 text-amber-600" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-foreground">5+ Years Experience</div>
                  <div className="text-xs text-muted-foreground">Trusted seller</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories - Animated grid */}
      <section className="py-20 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Shop by Category</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">Find the perfect computer for work, gaming, or everyday use</p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <Link
                  key={category.slug}
                  to={`/category/${category.slug}`}
                  className="group flex flex-col items-center p-6 md:p-8 bg-card rounded-2xl border border-border hover:border-primary/40 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300 border border-primary/10">
                    <Icon className="w-8 h-8 md:w-10 md:h-10 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground text-sm md:text-base mb-1 text-center">{category.name}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    {loading ? '...' : `${category.count} items`}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Latest Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-1">Latest Products</h2>
              <p className="text-muted-foreground text-sm">Fresh arrivals just for you</p>
            </div>
            <Link 
              to="/category/laptops" 
              className="hidden sm:inline-flex items-center gap-1 text-primary hover:text-primary-hover font-medium text-sm transition-colors"
            >
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <ProductCarousel 
            products={latestProducts}
            onAddToCart={addItem}
            autoScroll={true}
            loading={loading}
          />
        </div>
      </section>

      {/* Trust Badges */}
      <TrustBadges />

      {/* Laptops Section */}
      {laptops.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-1">Popular Laptops</h2>
                <p className="text-muted-foreground text-sm">Best selling laptops in Nairobi</p>
              </div>
              <Link 
                to="/category/laptops" 
                className="hidden sm:inline-flex items-center gap-1 text-primary hover:text-primary-hover font-medium text-sm transition-colors"
              >
                View All <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <ProductCarousel 
              products={laptops}
              onAddToCart={addItem}
              loading={loading}
            />
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Gaming Section */}
      {gaming.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-1">Gaming Computers</h2>
                <p className="text-muted-foreground text-sm">High-performance gaming machines</p>
              </div>
              <Link 
                to="/category/gaming" 
                className="hidden sm:inline-flex items-center gap-1 text-primary hover:text-primary-hover font-medium text-sm transition-colors"
              >
                View All <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <ProductCarousel 
              products={gaming}
              onAddToCart={addItem}
              loading={loading}
            />
          </div>
        </section>
      )}

      {/* Desktops Section */}
      {desktops.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-1">Desktop Computers</h2>
                <p className="text-muted-foreground text-sm">Powerful workstations for every need</p>
              </div>
              <Link 
                to="/category/desktops" 
                className="hidden sm:inline-flex items-center gap-1 text-primary hover:text-primary-hover font-medium text-sm transition-colors"
              >
                View All <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <ProductCarousel 
              products={desktops}
              onAddToCart={addItem}
              loading={loading}
            />
          </div>
        </section>
      )}

      {/* All in One Section */}
      {allInOne.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-1">All-in-One Computers</h2>
                <p className="text-muted-foreground text-sm">Space-saving elegance</p>
              </div>
              <Link 
                to="/category/all-in-one" 
                className="hidden sm:inline-flex items-center gap-1 text-primary hover:text-primary-hover font-medium text-sm transition-colors"
              >
                View All <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <ProductCarousel 
              products={allInOne}
              onAddToCart={addItem}
              loading={loading}
            />
          </div>
        </section>
      )}

      {/* Monitors Section */}
      {monitors.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-1">Monitors</h2>
                <p className="text-muted-foreground text-sm">Crystal clear displays</p>
              </div>
              <Link 
                to="/category/monitors" 
                className="hidden sm:inline-flex items-center gap-1 text-primary hover:text-primary-hover font-medium text-sm transition-colors"
              >
                View All <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <ProductCarousel 
              products={monitors}
              onAddToCart={addItem}
              loading={loading}
            />
          </div>
        </section>
      )}

      {/* Accessories Section */}
      {accessories.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-1">Accessories</h2>
                <p className="text-muted-foreground text-sm">Complete your setup</p>
              </div>
              <Link 
                to="/category/accessories" 
                className="hidden sm:inline-flex items-center gap-1 text-primary hover:text-primary-hover font-medium text-sm transition-colors"
              >
                View All <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <ProductCarousel 
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
