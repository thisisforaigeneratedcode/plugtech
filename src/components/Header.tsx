import { useState, useCallback, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Heart, Menu, X, Phone, MapPin, ChevronDown, Laptop, Monitor, Gamepad2, HardDrive, Headphones, MonitorSmartphone } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/hooks/useWishlist';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const CATEGORIES = [
  { name: 'Laptops', href: '/category/laptops', icon: Laptop },
  { name: 'Desktops', href: '/category/desktops', icon: HardDrive },
  { name: 'Gaming', href: '/category/gaming', icon: Gamepad2 },
  { name: 'Monitors', href: '/category/monitors', icon: Monitor },
  { name: 'All in One', href: '/category/all-in-one', icon: MonitorSmartphone },
  { name: 'Accessories', href: '/category/accessories', icon: Headphones },
];

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const { itemCount, openCart } = useCart();
  const { count: wishlistCount } = useWishlist();
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCategoryDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border">
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
                <span className="hidden md:inline">Rasumal House, Tom Mboya St, Nairobi. Ask for Collins</span>
                <span className="md:hidden">Nairobi CBD</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3 mx-auto sm:mx-0">
              <span className="font-medium">M-Pesa: 714888 | Acc: 281219</span>
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
              <div className="w-9 h-9 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-md">
                <span className="text-primary-foreground font-bold text-lg">C</span>
              </div>
              <div className="hidden sm:block">
                <div className="font-bold text-foreground leading-none">Collo The Plug</div>
                <div className="text-[10px] text-muted-foreground">Quality Computers</div>
              </div>
            </div>
          </Link>

          {/* All Categories Dropdown */}
          <div className="hidden lg:block relative" ref={dropdownRef}>
            <button
              onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all",
                isCategoryDropdownOpen 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted text-foreground hover:bg-muted/80"
              )}
            >
              <Menu className="w-4 h-4" />
              All Categories
              <ChevronDown className={cn("w-4 h-4 transition-transform", isCategoryDropdownOpen && "rotate-180")} />
            </button>

            {/* Dropdown Menu */}
            {isCategoryDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-card rounded-xl border border-border shadow-xl py-2 animate-in slide-in-from-top-2 duration-200 z-50">
                {CATEGORIES.map((category) => {
                  const Icon = category.icon;
                  return (
                    <Link
                      key={category.name}
                      to={category.href}
                      onClick={() => setIsCategoryDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
                    >
                      <Icon className="w-4 h-4 text-muted-foreground" />
                      {category.name}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Centered Search Bar */}
          <form
            onSubmit={handleSearch}
            className={cn(
              "hidden md:flex items-center flex-1 max-w-xl mx-4 relative transition-all duration-300",
              isSearchFocused && "max-w-2xl"
            )}
          >
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search for laptops, desktops, gaming PCs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className={cn(
                  "w-full pl-11 pr-4 py-3 bg-muted border-2 border-transparent rounded-xl text-sm",
                  "placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:bg-background transition-all"
                )}
              />
            </div>
          </form>

          {/* Quick Links */}
          <nav className="hidden xl:flex items-center gap-1">
            <Link
              to="/category/laptops"
              className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Best Deals
            </Link>
            <Link
              to="/contact"
              className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1">
            {/* Location Indicator */}
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-2 text-xs text-muted-foreground">
              <MapPin className="w-3.5 h-3.5" />
              <span>Nairobi</span>
            </div>

            {/* Wishlist */}
            <Link 
              to="/wishlist" 
              className="relative p-2.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl transition-colors"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <Badge className="absolute -top-0.5 -right-0.5 h-4 min-w-4 p-0 flex items-center justify-center text-[10px] bg-primary border-0">
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
                <Badge className="absolute -top-0.5 -right-0.5 h-4 min-w-4 p-0 flex items-center justify-center text-[10px] bg-primary border-0">
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
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-muted border-2 border-transparent rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:bg-background transition-all"
            />
          </div>
        </form>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="lg:hidden pb-4 border-t border-border pt-4 animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-1">
              {CATEGORIES.map((category) => {
                const Icon = category.icon;
                return (
                  <Link
                    key={category.name}
                    to={category.href}
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 px-4 py-3 text-foreground hover:bg-muted rounded-xl transition-colors"
                  >
                    <Icon className="w-5 h-5 text-muted-foreground" />
                    {category.name}
                  </Link>
                );
              })}
              <div className="border-t border-border my-2" />
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

      {/* Category Bar - Desktop */}
      <div className="hidden lg:block border-t border-border bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-1 py-2 overflow-x-auto scroll-smooth-x">
            {CATEGORIES.map((category) => {
              const Icon = category.icon;
              return (
                <Link
                  key={category.name}
                  to={category.href}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors whitespace-nowrap"
                >
                  <Icon className="w-4 h-4" />
                  {category.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
