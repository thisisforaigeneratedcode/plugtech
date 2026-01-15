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

      {/* M-Pesa Banner - Clean and minimal */}
      <div className="bg-emerald-600 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-3 text-sm font-medium">
            <span>Pay via M-Pesa:</span>
            <span className="bg-white/20 px-2 py-0.5 rounded">Paybill 714888</span>
            <span className="bg-white/20 px-2 py-0.5 rounded">Acc 281219</span>
          </div>
        </div>
      </div>

      {/* Hero Section - Clean, stable layout */}
      <section className="bg-gradient-to-b from-muted/50 to-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Now Shipping Across Nairobi
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight mb-6 leading-tight">
              Premium Computers at
              <span className="text-primary block sm:inline"> Unbeatable Prices</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
              Quality laptops, desktops, and gaming computers. New and refurbished options with warranty included. Located in Nairobi CBD.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link 
                to="/category/laptops"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary-hover transition-colors"
              >
                Shop Laptops
                <ArrowRight className="w-4 h-4" />
              </Link>
              <WhatsAppButton className="bg-accent text-accent-foreground px-6 py-3 rounded-lg font-medium hover:bg-accent-hover transition-colors inline-flex items-center gap-2" />
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-foreground">30-Day Warranty</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Truck className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-foreground">Fast Delivery</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Award className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-foreground">5+ Years Experience</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories - Clean grid */}
      <section className="py-16 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Shop by Category</h2>
            <p className="text-muted-foreground">Find the perfect computer for your needs</p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Link
                  key={category.slug}
                  to={`/category/${category.slug}`}
                  className="group flex flex-col items-center p-6 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-md transition-all duration-200"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-medium text-foreground text-sm mb-1">{category.name}</h3>
                  <p className="text-xs text-muted-foreground">
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
