import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home, X, Plus, Scale } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useProducts } from '@/hooks/useProducts';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getOptimizedImageUrl } from '@/utils/imageOptimization';
import { Product } from '@/types/product';
import WhatsAppButton from '../components/WhatsAppButton';

const ComparePage = () => {
  const { products, loading } = useProducts();
  const { addItem, openCart, itemCount } = useCart();
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [showProductSelector, setShowProductSelector] = useState(false);

  // Load comparison list from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('compareProducts');
    if (saved) {
      try {
        setCompareIds(JSON.parse(saved));
      } catch (e) {
        localStorage.removeItem('compareProducts');
      }
    }
  }, []);

  // Save to localStorage when changed
  useEffect(() => {
    localStorage.setItem('compareProducts', JSON.stringify(compareIds));
  }, [compareIds]);

  const compareProducts = useMemo(() => 
    products.filter(p => compareIds.includes(p.id)),
    [products, compareIds]
  );

  const removeProduct = (id: string) => {
    setCompareIds(prev => prev.filter(pid => pid !== id));
  };

  const addProduct = (id: string) => {
    if (compareIds.length < 4 && !compareIds.includes(id)) {
      setCompareIds(prev => [...prev, id]);
    }
    setShowProductSelector(false);
  };

  const clearAll = () => {
    setCompareIds([]);
  };

  const availableProducts = useMemo(() => 
    products.filter(p => !compareIds.includes(p.id)),
    [products, compareIds]
  );

  const specRows = [
    { label: 'Price', key: 'price', format: (v: number) => `KSh ${v.toLocaleString()}` },
    { label: 'Condition', key: 'condition' },
    { label: 'Processor', key: 'processor' },
    { label: 'RAM', key: 'ram' },
    { label: 'Storage', key: 'storage' },
    { label: 'Display', key: 'display' },
    { label: 'Availability', key: 'in_stock', format: (v: boolean) => v ? 'In Stock' : 'Out of Stock' },
  ];

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
          <span className="text-foreground font-medium">Compare Products</span>
        </nav>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-2">
              <Scale className="w-7 h-7 text-primary" />
              Compare Products
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              {compareProducts.length === 0 
                ? 'Add products to compare their specifications' 
                : `Comparing ${compareProducts.length} ${compareProducts.length === 1 ? 'product' : 'products'}`
              }
            </p>
          </div>

          {compareProducts.length > 0 && (
            <Button variant="outline" onClick={clearAll}>
              Clear All
            </Button>
          )}
        </div>

        {compareProducts.length === 0 ? (
          /* Empty State */
          <div className="text-center py-16 bg-muted/30 rounded-xl">
            <Scale className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">No products to compare</h2>
            <p className="text-muted-foreground mb-6">
              Add products from the catalog to compare their specifications side by side.
            </p>
            <Button asChild>
              <Link to="/">Browse Products</Link>
            </Button>
          </div>
        ) : (
          /* Comparison Table */
          <div className="overflow-x-auto">
            <div className="min-w-[600px]">
              {/* Product Headers */}
              <div className="grid gap-4 mb-6" style={{ gridTemplateColumns: `200px repeat(${Math.min(compareProducts.length + 1, 5)}, minmax(200px, 1fr))` }}>
                <div className="p-4 bg-muted/50 rounded-xl">
                  <p className="font-semibold text-foreground">Specifications</p>
                </div>
                
                {compareProducts.map((product) => (
                  <div key={product.id} className="relative p-4 bg-card rounded-xl border border-border">
                    <button
                      onClick={() => removeProduct(product.id)}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-muted hover:bg-destructive hover:text-destructive-foreground transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    
                    <div className="aspect-square w-full mb-3 rounded-lg overflow-hidden bg-muted">
                      <img
                        src={getOptimizedImageUrl(product.image, product.image_version, { width: 200, height: 200, quality: 85 })}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <h3 className="font-semibold text-foreground text-sm line-clamp-2 mb-2">
                      {product.name}
                    </h3>
                    
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        className="flex-1 text-xs"
                        onClick={() => addItem(product)}
                        disabled={!product.in_stock}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                ))}

                {/* Add Product Slot */}
                {compareIds.length < 4 && (
                  <div className="relative">
                    <button
                      onClick={() => setShowProductSelector(!showProductSelector)}
                      className="w-full h-full min-h-[280px] p-4 bg-muted/30 rounded-xl border-2 border-dashed border-border hover:border-primary/50 hover:bg-muted/50 transition-all flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-foreground"
                    >
                      <Plus className="w-8 h-8" />
                      <span className="text-sm font-medium">Add Product</span>
                    </button>

                    {/* Product Selector Dropdown */}
                    {showProductSelector && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-lg z-10 max-h-80 overflow-auto">
                        {availableProducts.slice(0, 10).map((product) => (
                          <button
                            key={product.id}
                            onClick={() => addProduct(product.id)}
                            className="w-full p-3 flex items-center gap-3 hover:bg-muted transition-colors border-b border-border last:border-0"
                          >
                            <img
                              src={getOptimizedImageUrl(product.image, product.image_version, { width: 50, height: 50, quality: 80 })}
                              alt=""
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div className="text-left flex-1 min-w-0">
                              <p className="text-sm font-medium text-foreground truncate">{product.name}</p>
                              <p className="text-xs text-muted-foreground">KSh {product.price.toLocaleString()}</p>
                            </div>
                          </button>
                        ))}
                        {availableProducts.length === 0 && (
                          <p className="p-4 text-center text-muted-foreground text-sm">No more products to add</p>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Specification Rows */}
              <div className="space-y-2">
                {specRows.map((spec, index) => (
                  <div 
                    key={spec.key}
                    className="grid gap-4 py-3 px-4 rounded-lg"
                    style={{ 
                      gridTemplateColumns: `200px repeat(${Math.min(compareProducts.length + (compareIds.length < 4 ? 1 : 0), 5)}, minmax(200px, 1fr))`,
                      backgroundColor: index % 2 === 0 ? 'hsl(var(--muted) / 0.3)' : 'transparent'
                    }}
                  >
                    <div className="font-medium text-foreground">{spec.label}</div>
                    {compareProducts.map((product) => {
                      const value = product[spec.key as keyof Product];
                      const displayValue = spec.format 
                        ? spec.format(value as never) 
                        : String(value);
                      
                      return (
                        <div 
                          key={product.id} 
                          className={cn(
                            "text-sm",
                            spec.key === 'price' && "font-bold text-foreground",
                            spec.key === 'in_stock' && (value ? "text-emerald-600" : "text-destructive")
                          )}
                        >
                          {displayValue}
                        </div>
                      );
                    })}
                    {compareIds.length < 4 && <div />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ComparePage;
