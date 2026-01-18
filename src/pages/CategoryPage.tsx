import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import ProductCardSkeleton from '../components/ProductCardSkeleton';
import ProductQuickView from '../components/ProductQuickView';
import ProductFilters, { FilterState } from '../components/ProductFilters';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '@/contexts/CartContext';
import { Product } from '@/types/product';
import { ChevronRight, Home } from 'lucide-react';
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

  // Get category products for filter options
  const categoryProducts = useMemo(() => {
    if (loading) return [];
    return products.filter((product) => product.category === category);
  }, [products, category, loading]);

  // Calculate max price and available options
  const maxPrice = useMemo(() => {
    if (categoryProducts.length === 0) return 500000;
    return Math.ceil(Math.max(...categoryProducts.map(p => p.price)) / 10000) * 10000;
  }, [categoryProducts]);

  const availableConditions = useMemo(() => {
    return [...new Set(categoryProducts.map(p => p.condition))].sort();
  }, [categoryProducts]);

  const availableRam = useMemo(() => {
    const ramValues = [...new Set(categoryProducts.map(p => p.ram).filter(Boolean))];
    // Sort by numeric value
    return ramValues.sort((a, b) => {
      const numA = parseInt(a) || 0;
      const numB = parseInt(b) || 0;
      return numA - numB;
    });
  }, [categoryProducts]);

  const availableStorage = useMemo(() => {
    const storageValues = [...new Set(categoryProducts.map(p => p.storage).filter(Boolean))];
    // Sort by size (TB > GB)
    return storageValues.sort((a, b) => {
      const getBytes = (s: string) => {
        const num = parseInt(s) || 0;
        if (s.toLowerCase().includes('tb')) return num * 1000;
        return num;
      };
      return getBytes(a) - getBytes(b);
    });
  }, [categoryProducts]);

  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, maxPrice],
    conditions: [],
    inStockOnly: false,
    ramOptions: [],
    storageOptions: [],
  });

  // Update price range when maxPrice changes
  useMemo(() => {
    if (filters.priceRange[1] === 500000 && maxPrice !== 500000) {
      setFilters(prev => ({ ...prev, priceRange: [0, maxPrice] }));
    }
  }, [maxPrice]);

  // Count active filters
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < maxPrice) count++;
    if (filters.conditions.length > 0) count += filters.conditions.length;
    if (filters.inStockOnly) count++;
    if (filters.ramOptions.length > 0) count += filters.ramOptions.length;
    if (filters.storageOptions.length > 0) count += filters.storageOptions.length;
    return count;
  }, [filters, maxPrice]);

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
    
    let result = [...categoryProducts];

    // Apply price filter
    result = result.filter(p => 
      p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    // Apply condition filter
    if (filters.conditions.length > 0) {
      result = result.filter(p => filters.conditions.includes(p.condition));
    }

    // Apply in-stock filter
    if (filters.inStockOnly) {
      result = result.filter(p => p.in_stock);
    }

    // Apply RAM filter
    if (filters.ramOptions.length > 0) {
      result = result.filter(p => filters.ramOptions.includes(p.ram));
    }

    // Apply storage filter
    if (filters.storageOptions.length > 0) {
      result = result.filter(p => filters.storageOptions.includes(p.storage));
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
  }, [categoryProducts, loading, sortBy, filters]);

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

          {/* Sort & Mobile Filter */}
          <div className="flex items-center gap-3">
            <ProductFilters
              filters={filters}
              onFiltersChange={setFilters}
              maxPrice={maxPrice}
              availableConditions={availableConditions}
              availableRam={availableRam}
              availableStorage={availableStorage}
              activeFilterCount={activeFilterCount}
            />
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-background">
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Main Content with Sidebar */}
        <div className="flex gap-8">
          {/* Desktop Filters Sidebar */}
          <ProductFilters
            filters={filters}
            onFiltersChange={setFilters}
            maxPrice={maxPrice}
            availableConditions={availableConditions}
            availableRam={availableRam}
            availableStorage={availableStorage}
            activeFilterCount={activeFilterCount}
          />

          {/* Products Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                  <ProductCardSkeleton key={index} />
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
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
                  Try adjusting your filters to find what you're looking for.
                </p>
                {activeFilterCount > 0 && (
                  <button
                    onClick={() => setFilters({
                      priceRange: [0, maxPrice],
                      conditions: [],
                      inStockOnly: false,
                      ramOptions: [],
                      storageOptions: [],
                    })}
                    className="text-primary hover:underline font-medium"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
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
