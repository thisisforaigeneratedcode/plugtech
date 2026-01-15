import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import ProductCardSkeleton from '../components/ProductCardSkeleton';
import ProductQuickView from '../components/ProductQuickView';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '@/contexts/CartContext';
import { Product } from '@/types/product';
import { ChevronRight, Home, Search } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { products, loading } = useProducts();
  const { itemCount, openCart } = useCart();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [sortBy, setSortBy] = useState<string>('relevance');

  // Search and sort products
  const searchResults = useMemo(() => {
    if (loading || !query.trim()) return [];

    const searchTerm = query.toLowerCase().trim();

    let results = products.filter((product) => {
      const searchableText = [
        product.name,
        product.category,
        product.condition,
        product.processor,
        product.ram,
        product.storage,
        product.display,
      ]
        .join(' ')
        .toLowerCase();

      return (
        searchableText.includes(searchTerm) ||
        searchTerm.split(' ').some((word) => word.length > 0 && searchableText.includes(word))
      );
    });

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        results.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        results.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'relevance':
      default:
        // Keep original order (most relevant first based on initial filter)
        break;
    }

    return results;
  }, [products, query, loading, sortBy]);

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
          <span className="text-foreground font-medium">Search Results</span>
        </nav>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-2">
              <Search className="w-7 h-7 text-primary" />
              Search Results
            </h1>
            {query && (
              <p className="text-muted-foreground text-sm mt-1">
                {loading
                  ? `Searching for "${query}"...`
                  : `${searchResults.length} results for "${query}"`}
              </p>
            )}
          </div>

          {/* Sort */}
          {searchResults.length > 0 && (
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>

        {/* Results */}
        {query ? (
          loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
          ) : searchResults.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {searchResults.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={() => setQuickViewProduct(product)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-muted/30 rounded-xl">
              <Search className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-foreground mb-2">No products found</h2>
              <p className="text-muted-foreground">
                No products match your search for "{query}". Try different keywords.
              </p>
            </div>
          )
        ) : (
          <div className="text-center py-16 bg-muted/30 rounded-xl">
            <Search className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">Enter a search term</h2>
            <p className="text-muted-foreground">Use the search bar above to find products.</p>
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

export default SearchPage;
