import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Truck, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import WhatsAppButton from './WhatsAppButton';

const promotions = [
  {
    id: 1,
    title: "Back to School Deals",
    subtitle: "Student laptops from KSh 25,000",
    cta: "Shop Now",
    link: "/category/laptops",
    gradient: "from-primary/90 via-primary to-orange-400",
  },
  {
    id: 2,
    title: "Gaming Setup Sale",
    subtitle: "High-performance rigs ready to ship",
    cta: "View Gaming",
    link: "/category/gaming",
    gradient: "from-violet-600 via-purple-600 to-fuchsia-500",
  },
  {
    id: 3,
    title: "Office Essentials",
    subtitle: "Complete workstation packages available",
    cta: "Browse Desktops",
    link: "/category/desktops",
    gradient: "from-emerald-600 via-teal-600 to-cyan-500",
  }
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % promotions.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

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
      {/* Promotional Carousel */}
      <div className="relative">
        {promotions.map((promo, index) => (
          <div
            key={promo.id}
            className={`transition-all duration-700 ease-out ${
              index === currentSlide 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 absolute inset-0 translate-x-full'
            }`}
          >
            <div className={`bg-gradient-to-r ${promo.gradient} py-16 md:py-24 lg:py-32`}>
              <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center text-white">
                  {/* Animated Badge */}
                  <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium mb-6 animate-pulse-subtle">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                    </span>
                    Nairobi's Trusted Computer Shop
                  </div>

                  {/* Headline */}
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 leading-[1.1]">
                    {promo.title}
                  </h1>

                  {/* Subheadline */}
                  <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-8 font-medium">
                    {promo.subtitle}
                  </p>

                  {/* CTAs */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link 
                      to={promo.link}
                      className="inline-flex items-center gap-2 bg-white text-foreground px-8 py-4 rounded-xl font-semibold hover:bg-white/90 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                    >
                      {promo.cta}
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                    <WhatsAppButton 
                      className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/30 transition-all duration-200 border border-white/30"
                      label="Chat with Us"
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
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/30 transition-colors z-10"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/30 transition-colors z-10"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {promotions.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsAutoPlaying(false);
                setCurrentSlide(index);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'w-8 bg-white' 
                  : 'w-2 bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Trust Strip */}
      <div className="bg-background border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">30-Day Warranty</p>
                <p className="text-xs text-muted-foreground">On all products</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Truck className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Same-Day Delivery</p>
                <p className="text-xs text-muted-foreground">Within Nairobi</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
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
