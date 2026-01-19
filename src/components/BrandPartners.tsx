import { cn } from '@/lib/utils';

const brands = [
  { name: 'HP', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/HP_logo_2012.svg/800px-HP_logo_2012.svg.png' },
  { name: 'Dell', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Dell_Logo.svg/800px-Dell_Logo.svg.png' },
  { name: 'Lenovo', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Lenovo_logo_2015.svg/800px-Lenovo_logo_2015.svg.png' },
  { name: 'Apple', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/800px-Apple_logo_black.svg.png' },
  { name: 'ASUS', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/ASUS_Logo.svg/800px-ASUS_Logo.svg.png' },
  { name: 'Acer', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Acer_2011.svg/800px-Acer_2011.svg.png' },
];

const BrandPartners = () => {
  return (
    <section className="py-12 md:py-16 bg-muted/30 border-y border-border">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Trusted Brands
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            Genuine products from world-leading manufacturers
          </p>
        </div>

        {/* Brand Logos */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {brands.map((brand, index) => (
            <div
              key={brand.name}
              className={cn(
                "group flex items-center justify-center w-24 h-16 md:w-32 md:h-20 p-4",
                "bg-card rounded-xl border border-border/50",
                "hover:border-primary/30 hover:shadow-lg transition-all duration-300",
                "animate-fade-in"
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="max-w-full max-h-full object-contain opacity-60 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Trust Message */}
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            ✓ Authorized Dealer • ✓ 100% Genuine Products • ✓ Manufacturer Warranty
          </p>
        </div>
      </div>
    </section>
  );
};

export default BrandPartners;
