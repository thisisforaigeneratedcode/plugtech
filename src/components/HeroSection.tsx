import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Truck, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import WhatsAppButton from './WhatsAppButton';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-muted/30 via-background to-muted/50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32 relative">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Now Shipping Across Nairobi
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight mb-6">
            Premium Computers
            <span className="block text-primary">Unbeatable Prices</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            Discover quality laptops, desktops, and gaming computers. New and refurbished options with warranty included. Located in Nairobi CBD.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button asChild size="lg" className="h-12 px-8 text-base">
              <Link to="/category/laptops">
                Shop Laptops
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <WhatsAppButton className="h-12 px-8 text-base bg-accent hover:bg-accent-hover text-accent-foreground rounded-lg font-medium inline-flex items-center gap-2" />
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
                <div className="font-medium text-foreground">30-Day Warranty</div>
                <div className="text-xs">On all products</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Truck className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
                <div className="font-medium text-foreground">Fast Delivery</div>
                <div className="text-xs">Within Nairobi</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Award className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
                <div className="font-medium text-foreground">5+ Years</div>
                <div className="text-xs">Trusted experience</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" className="w-full h-auto text-background">
          <path d="M0 60L60 55C120 50 240 40 360 35C480 30 600 30 720 32.5C840 35 960 40 1080 42.5C1200 45 1320 45 1380 45L1440 45V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0V60Z" fill="currentColor"/>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
