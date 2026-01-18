import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Truck, Award, ChevronLeft, ChevronRight, Zap, Gift, Percent, Clock } from 'lucide-react';
import WhatsAppButton from './WhatsAppButton';

const promotions = [
  {
    id: 1,
    title: "Back to School Deals",
    subtitle: "Student laptops starting from KSh 25,000 — perfect for studies & creativity",
    cta: "Shop Laptops",
    link: "/category/laptops",
    gradient: "from-primary via-primary/90 to-orange-500",
    icon: "🎓",
    badge: "Limited Time",
  },
  {
    id: 2,
    title: "Level Up Your Gaming",
    subtitle: "High-performance gaming rigs ready to dominate — financing available",
    cta: "View Gaming PCs",
    link: "/category/gaming",
    gradient: "from-violet-600 via-purple-600 to-fuchsia-500",
    icon: "🎮",
    badge: "Hot Deals",
  },
  {
    id: 3,
    title: "Work From Anywhere",
    subtitle: "Complete office setups with monitors, keyboards & more bundled together",
    cta: "Browse Desktops",
    link: "/category/desktops",
    gradient: "from-emerald-600 via-teal-500 to-cyan-400",
    icon: "💼",
    badge: "Best Value",
  },
  {
    id: 4,
    title: "All-in-One Excellence",
    subtitle: "Sleek, space-saving machines that look as good as they perform",
    cta: "Explore All-in-One",
    link: "/category/all-in-one",
    gradient: "from-rose-500 via-pink-500 to-orange-400",
    icon: "✨",
    badge: "New Arrivals",
  }
];

const quickDeals = [
  { icon: Zap, text: "Flash Sale: 15% off all monitors", color: "text-yellow-500" },
  { icon: Gift, text: "Free mouse with laptop purchases", color: "text-emerald-500" },
  { icon: Percent, text: "Trade-in your old PC for discounts", color: "text-primary" },
  { icon: Clock, text: "Same-day delivery in Nairobi CBD", color: "text-cyan-500" },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [dealIndex, setDealIndex] = useState(0);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % promotions.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Rotate quick deals
  useEffect(() => {
    const dealInterval = setInterval(() => {
      setDealIndex((prev) => (prev + 1) % quickDeals.length);
    }, 3000);
    return () => clearInterval(dealInterval);
  }, []);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % promotions.length);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev - 1 + promotions.length) % promotions.length);
  };

  return (
    <section className="relative overflow-hidden">
      {/* Quick Deals Ticker */}
      <div className="bg-foreground text-background py-2.5 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-2 text-sm font-medium">
            {quickDeals.map((deal, index) => {
              const Icon = deal.icon;
              return (
                <div 
                  key={index}
                  className={`flex items-center gap-2 transition-all duration-500 ${
                    index === dealIndex 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 absolute translate-y-4'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${deal.color}`} />
                  <span>{deal.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Promotional Carousel */}
      <div className="relative">
        {promotions.map((promo, index) => (
          <div
            key={promo.id}
            className={`transition-all duration-700 ease-out ${
              index === currentSlide 
                ? 'opacity-100 translate-x-0 relative' 
                : 'opacity-0 absolute inset-0 translate-x-full pointer-events-none'
            }`}
          >
            <div className={`bg-gradient-to-br ${promo.gradient} py-16 md:py-24 lg:py-32 relative overflow-hidden`}>
              {/* Animated Background Elements */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Floating circles */}
                <div className="absolute top-10 left-[10%] w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
                <div className="absolute bottom-10 right-[15%] w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/3 rounded-full blur-3xl" />
                
                {/* Grid pattern overlay */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMXYxaC0xeiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIvPjwvZz48L3N2Zz4=')] opacity-40" />
                
                {/* Floating emoji */}
                <div className="absolute top-[20%] right-[10%] text-6xl md:text-8xl opacity-20 animate-bounce" style={{ animationDuration: '3s' }}>
                  {promo.icon}
                </div>
              </div>

              <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center text-white">
                  {/* Animated Badge */}
                  <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-semibold mb-6 border border-white/20">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                    </span>
                    {promo.badge}
                  </div>

                  {/* Headline */}
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 leading-[1.1] drop-shadow-lg">
                    {promo.title}
                  </h1>

                  {/* Subheadline */}
                  <p className="text-lg md:text-xl lg:text-2xl text-white/90 max-w-2xl mx-auto mb-8 font-medium leading-relaxed">
                    {promo.subtitle}
                  </p>

                  {/* CTAs */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link 
                      to={promo.link}
                      className="group inline-flex items-center gap-2 bg-white text-foreground px-8 py-4 rounded-xl font-semibold hover:bg-white/95 transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1"
                    >
                      {promo.cta}
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <WhatsAppButton 
                      className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/30 transition-all duration-300 border border-white/30 hover:-translate-y-1"
                      label="Ask About This Deal"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/30 hover:scale-110 transition-all z-10 border border-white/20"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/30 hover:scale-110 transition-all z-10 border border-white/20"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Progress Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {promotions.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsAutoPlaying(false);
                setCurrentSlide(index);
              }}
              className={`h-2.5 rounded-full transition-all duration-500 ${
                index === currentSlide 
                  ? 'w-10 bg-white shadow-lg' 
                  : 'w-2.5 bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Trust Strip */}
      <div className="bg-background border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 lg:gap-16">
            <div className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">30-Day Warranty</p>
                <p className="text-xs text-muted-foreground">On all products</p>
              </div>
            </div>
            <div className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Truck className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Same-Day Delivery</p>
                <p className="text-xs text-muted-foreground">Within Nairobi</p>
              </div>
            </div>
            <div className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">5+ Years Trusted</p>
                <p className="text-xs text-muted-foreground">Serving Nairobi</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
