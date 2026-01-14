import { Link } from 'react-router-dom';
import { Laptop, Monitor, Gamepad2, HardDrive, Headphones, Settings, ArrowRight } from 'lucide-react';

interface CategoryGridProps {
  categories: {
    name: string;
    slug: string;
    count: number;
    image: string;
  }[];
}

const CATEGORY_ICONS: Record<string, any> = {
  laptops: Laptop,
  desktops: HardDrive,
  gaming: Gamepad2,
  monitors: Monitor,
  'all-in-one': Settings,
  accessories: Headphones,
};

const CategoryGrid = ({ categories }: CategoryGridProps) => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Shop by Category
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find the perfect computer for your needs from our wide selection
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => {
            const Icon = CATEGORY_ICONS[category.slug] || Laptop;
            
            return (
              <Link
                key={category.slug}
                to={`/category/${category.slug}`}
                className="group relative bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              >
                {/* Image */}
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                  
                  {/* Icon */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-semibold text-sm mb-0.5 group-hover:text-primary-foreground">
                    {category.name}
                  </h3>
                  <p className="text-xs text-white/70">
                    {category.count} products
                  </p>
                </div>

                {/* Hover Arrow */}
                <div className="absolute top-3 right-3 w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                  <ArrowRight className="w-4 h-4 text-white" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
