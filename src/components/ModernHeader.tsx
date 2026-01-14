import { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Heart, Menu, X, Phone, MapPin } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/hooks/useWishlist';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const CATEGORIES = [
  { name: 'Laptops', href: '/category/laptops' },
  { name: 'Desktops', href: '/category/desktops' },
  { name: 'Gaming', href: '/category/gaming' },
  { name: 'Monitors', href: '/category/monitors' },
  { name: 'All in One', href: '/category/all-in-one' },
  { name: 'Accessories', href: '/category/accessories' },
];

const ModernHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  const { itemCount, openCart } = useCart();
  const { count: wishlistCount } = useWishlist();
  const navigate = useNavigate();

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      setSearchTerm('');
      setIsMobileMenuOpen(false);
    }
  }, [searchTerm, navigate]);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      {/* Top Bar */}
      <div className="bg-foreground text-background">
        <div className="container mx-auto px-4 py-1.5">
          <div className="flex items-center justify-between text-xs">
            <div className="hidden sm:flex items-center gap-4">
              <a href="tel:0711483989" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                <Phone className="w-3 h-3" />
                <span>0711 483 989</span>
              </a>
              <span className="text-background/30">|</span>
              <div className="flex items-center gap-1.5 text-background/70">
                <MapPin className="w-3 h-3" />
                <span className="hidden md:inline">Rasumal House, Tom Mboya St, Nairobi</span>
                <span className="md:hidden">Nairobi CBD</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3 mx-auto sm:mx-0">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/1/15/M-PESA_LOGO-01.svg"
                alt="M-Pesa"
                className="h-4"
              />
              <span className="font-medium">Paybill: 714888 | Acc: 281219</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">P</span>
              </div>
              <div className="hidden sm:block">
                <div className="font-bold text-foreground leading-none">Plug Tech</div>
                <div className="text-[10px] text-muted-foreground">Quality Computers</div>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {CATEGORIES.map((category) => (
              <Link
                key={category.name}
                to={category.href}
                className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
              >
                {category.name}
              </Link>
            ))}
            <Link
              to="/contact"
              className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Search Bar - Desktop */}
          <form
            onSubmit={handleSearch}
            className={`hidden md:flex items-center flex-1 max-w-md mx-4 relative transition-all ${
              isSearchFocused ? 'scale-105' : ''
            }`}
          >
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search laptops, desktops..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full pl-10 pr-4 py-2.5 bg-muted/50 border border-transparent rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:bg-background transition-all"
              />
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-1">
            {/* Wishlist */}
            <Link to="/wishlist" className="relative p-2.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl transition-colors">
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <Badge className="absolute -top-0.5 -right-0.5 h-4 min-w-4 p-0 flex items-center justify-center text-[10px] bg-primary">
                  {wishlistCount}
                </Badge>
              )}
            </Link>

            {/* Cart */}
            <button
              onClick={openCart}
              className="relative p-2.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <Badge className="absolute -top-0.5 -right-0.5 h-4 min-w-4 p-0 flex items-center justify-center text-[10px] bg-primary">
                  {itemCount > 9 ? '9+' : itemCount}
                </Badge>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <form onSubmit={handleSearch} className="md:hidden pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-muted/50 border border-transparent rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:bg-background transition-all"
            />
          </div>
        </form>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="lg:hidden pb-4 border-t border-border pt-4 animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-1">
              {CATEGORIES.map((category) => (
                <Link
                  key={category.name}
                  to={category.href}
                  onClick={closeMobileMenu}
                  className="px-4 py-3 text-foreground hover:bg-muted rounded-xl transition-colors"
                >
                  {category.name}
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={closeMobileMenu}
                className="px-4 py-3 text-foreground hover:bg-muted rounded-xl transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default ModernHeader;
