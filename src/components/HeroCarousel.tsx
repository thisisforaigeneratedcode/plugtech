import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Zap, Gift, Percent, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import WhatsAppButton from './WhatsAppButton';

const promotions = [
  {
    id: 1,
    title: "Back to School",
    subtitle: "Student laptops starting from KSh 25,000",
    cta: "Shop Laptops",
    link: "/category/laptops",
    bgColor: "bg-gradient-to-br from-orange-500 via-orange-400 to-amber-400",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600",
    badge: "Limited Time",
  },
  {
    id: 2,
    title: "Gaming Powerhouse",
    subtitle: "High-performance gaming rigs ready to dominate",
    cta: "View Gaming PCs",
    link: "/category/gaming",
    bgColor: "bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-500",
    image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=600",
    badge: "Hot Deals",
  },
  {
    id: 3,
    title: "Work From Anywhere",
    subtitle: "Complete office setups bundled together",
    cta: "Browse Desktops",
    link: "/category/desktops",
    bgColor: "bg-gradient-to-br from-emerald-600 via-teal-500 to-cyan-400",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600",
    badge: "Best Value",
  },
];

const quickDeals = [
  { icon: Zap, text: "Flash Sale: 15% off all monitors", color: "text-yellow-500" },
  { icon: Gift, text: "Free mouse with laptop purchases", color: "text-emerald-500" },
  { icon: Percent, text: "Trade-in your old PC for discounts", color: "text-primary" },
  { icon: Clock, text: "Same-day delivery in Nairobi CBD", color: "text-cyan-500" },
];

const HeroCarousel = () => {
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
    <section className="relative">
      {/* Quick Deals Ticker */}
      <div className="bg-foreground text-background py-2.5">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-2 text-sm font-medium h-5">
            {quickDeals.map((deal, index) => {
              const Icon = deal.icon;
              return (
                <div 
                  key={index}
                  className={cn(
                    "flex items-center gap-2 transition-all duration-500",
                    index === dealIndex 
                      ? 'opacity-100' 
                      : 'opacity-0 absolute'
                  )}
                >
                  <Icon className={cn("w-4 h-4", deal.color)} />
                  <span>{deal.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Carousel */}
      <div className="relative overflow-hidden">
        <div 
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {promotions.map((promo) => (
            <div
              key={promo.id}
              className={cn(
                "w-full flex-shrink-0",
                promo.bgColor
              )}
            >
              <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-8 items-center py-12 md:py-20 min-h-[400px] md:min-h-[500px]">
                  {/* Content */}
                  <div className="text-white order-2 md:order-1">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                      </span>
                      {promo.badge}
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 leading-[1.1]">
                      {promo.title}
                    </h1>

                    {/* Subtitle */}
                    <p className="text-lg md:text-xl text-white/90 mb-8 max-w-md">
                      {promo.subtitle}
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-wrap gap-4">
                      <Link 
                        to={promo.link}
                        className="group inline-flex items-center gap-2 bg-white text-foreground px-6 py-3 rounded-xl font-semibold hover:bg-white/95 transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        {promo.cta}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                      <WhatsAppButton 
                        className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition-all duration-300 border border-white/30"
                        label="Ask About Deals"
                      />
                    </div>
                  </div>

                  {/* Image */}
                  <div className="order-1 md:order-2 flex justify-center md:justify-end">
                    <div className="relative">
                      <div className="absolute inset-0 bg-white/10 rounded-3xl blur-3xl scale-90" />
                      <img
                        src={promo.image}
                        alt={promo.title}
                        className="relative w-full max-w-md h-auto rounded-2xl shadow-2xl object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/30 hover:scale-110 transition-all z-10"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/30 hover:scale-110 transition-all z-10"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
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
              className={cn(
                "h-2.5 rounded-full transition-all duration-500",
                index === currentSlide 
                  ? 'w-10 bg-white shadow-lg' 
                  : 'w-2.5 bg-white/40 hover:bg-white/60'
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;
