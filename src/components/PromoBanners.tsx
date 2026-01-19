import { Link } from 'react-router-dom';
import { ArrowRight, Percent, Gift, Zap, Laptop } from 'lucide-react';
import { cn } from '@/lib/utils';

const banners = [
  {
    id: 1,
    title: "Student Specials",
    subtitle: "Laptops from KSh 25,000",
    cta: "Shop Now",
    link: "/category/laptops",
    gradient: "from-primary via-orange-500 to-amber-400",
    icon: Laptop,
    badge: "🎓 Back to School",
  },
  {
    id: 2,
    title: "Gaming Deals",
    subtitle: "Level up for less",
    cta: "View Gaming",
    link: "/category/gaming",
    gradient: "from-violet-600 via-purple-600 to-fuchsia-500",
    icon: Zap,
    badge: "🎮 Hot Deals",
  },
  {
    id: 3,
    title: "Trade-In Offer",
    subtitle: "Get up to 30% off",
    cta: "Learn More",
    link: "/contact",
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    icon: Gift,
    badge: "♻️ Trade & Save",
  },
];

const PromoBanners = () => {
  return (
    <section className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {banners.map((banner, index) => {
            const Icon = banner.icon;
            
            return (
              <Link
                key={banner.id}
                to={banner.link}
                className={cn(
                  "group relative overflow-hidden rounded-2xl p-6 md:p-8 min-h-[180px] flex flex-col justify-between",
                  "transition-all duration-300 hover:shadow-2xl hover:-translate-y-1",
                  `bg-gradient-to-br ${banner.gradient}`
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -translate-y-1/2 translate-x-1/2" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/20 rounded-full translate-y-1/2 -translate-x-1/2" />
                </div>
                
                {/* Floating Icon */}
                <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-30 transition-opacity">
                  <Icon className="w-16 h-16 text-white" />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Badge */}
                  <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full mb-3">
                    {banner.badge}
                  </span>
                  
                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
                    {banner.title}
                  </h3>
                  
                  {/* Subtitle */}
                  <p className="text-white/90 text-sm md:text-base">
                    {banner.subtitle}
                  </p>
                </div>

                {/* CTA */}
                <div className="relative z-10 mt-4">
                  <span className="inline-flex items-center gap-2 text-white font-medium text-sm group-hover:gap-3 transition-all">
                    {banner.cta}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PromoBanners;
