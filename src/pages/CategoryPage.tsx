import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import ProductCardSkeleton from '../components/ProductCardSkeleton';
import ProductQuickView from '../components/ProductQuickView';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '@/contexts/CartContext';
import { Product } from '@/types/product';
import { ChevronRight, Home, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const { products, loading } = useProducts();
  const { itemCount, openCart } = useCart();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [sortBy, setSortBy] = useState<string>('newest');
  const [conditionFilter, setConditionFilter] = useState<string>('all');

  const categoryTitles: Record<string, string> = {
    laptops: 'Laptops',
    desktops: 'Desktop Computers',
    gaming: 'Gaming Computers',
    monitors: 'Monitors & Displays',
    accessories: 'Computer Accessories',
    'all-in-one': 'All in One',
  };

  const categoryTitle = categoryTitles[category || ''] || 'Products';

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    if (loading) return [];
    
    let result = products.filter((product) => product.category === category);

    // Apply condition filter
    if (conditionFilter !== 'all') {
      result = result.filter((product) => 
        product.condition.toLowerCase() === conditionFilter.toLowerCase()
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'newest':
      default:
        result.sort((a, b) => new Date(b.date_added).getTime() - new Date(a.date_added).getTime());
        break;
    }

    return result;
  }, [products, category, loading, sortBy, conditionFilter]);

  // Get unique conditions for filter
  const conditions = useMemo(() => {
    if (loading) return [];
    const categoryProducts = products.filter((p) => p.category === category);
    return [...new Set(categoryProducts.map((p) => p.condition))];
  }, [products, category, loading]);

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemsCount={itemCount} onCartOpen={openCart} />

      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1">
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground font-medium">{categoryTitle}</span>
        </nav>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">{categoryTitle}</h1>
            <p className="text-muted-foreground text-sm mt-1">
              {loading ? 'Loading...' : `${filteredProducts.length} products found`}
            </p>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3">
            <Select value={conditionFilter} onValueChange={setConditionFilter}>
              <SelectTrigger className="w-[140px]">
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Condition" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Conditions</SelectItem>
                {conditions.map((condition) => (
                  <SelectItem key={condition} value={condition.toLowerCase()}>
                    {condition}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={() => setQuickViewProduct(product)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-muted/30 rounded-xl">
            <h2 className="text-xl font-semibold text-foreground mb-2">No products found</h2>
            <p className="text-muted-foreground mb-4">
              {conditionFilter !== 'all'
                ? `No ${conditionFilter} ${categoryTitle.toLowerCase()} available.`
                : `Check back soon for new ${categoryTitle.toLowerCase()}.`}
            </p>
            {conditionFilter !== 'all' && (
              <Button variant="outline" onClick={() => setConditionFilter('all')}>
                Clear Filters
              </Button>
            )}
          </div>
        )}
      </div>

      <Footer />

      {/* Quick View Modal */}
      <ProductQuickView
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};

export default CategoryPage;
