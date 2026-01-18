import { Phone, Instagram, MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import WhatsAppIcon from './icons/WhatsAppIcon';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const openCnBWhatsApp = () => {
    const phoneNumber = "254114399034";
    const message = "👋 Hello CnB!\n\nI visited Plug Tech Business website and wanted to get in touch.\n\nThank you! 🙏";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const openDmXWhatsApp = () => {
    const phoneNumber = "254780106324";
    const message = "Hello, I saw your work on Plug Tech Business website";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const openWhatsApp = () => {
    const phoneNumber = "254711483989";
    const message = "👋 Hello! I'm interested in your computer products.";
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const quickLinks = [
    { to: '/category/laptops', label: 'Laptops' },
    { to: '/category/desktops', label: 'Desktops' },
    { to: '/category/gaming', label: 'Gaming' },
    { to: '/category/all-in-one', label: 'All in One' },
    { to: '/category/monitors', label: 'Monitors' },
    { to: '/category/accessories', label: 'Accessories' },
  ];

  return (
    <footer className="bg-foreground text-background/80 mt-16">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <h3 className="text-xl font-bold text-background mb-4">Plug Tech Business</h3>
            <p className="text-background/60 text-sm leading-relaxed mb-6">
              Nairobi's trusted destination for quality computers. From powerful laptops to gaming rigs, 
              we've got the tech you need at prices that make sense.
            </p>
            <div className="flex gap-3">
              <a 
                href="https://instagram.com/collo_thee_plug" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors"
              >
                <Instagram className="w-5 h-5" style={{ color: '#E4405F' }} />
              </a>
              <a 
                href="https://tiktok.com/@plugtechbusiness" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 5.76 20.5a6.34 6.34 0 0 0 10.86-4.43V7.83a8.2 8.2 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.8-.26z"/>
                </svg>
              </a>
              <button 
                onClick={openWhatsApp}
                className="w-10 h-10 rounded-lg bg-[#25D366]/20 hover:bg-[#25D366]/30 flex items-center justify-center transition-colors"
              >
                <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold text-background uppercase tracking-wider mb-4">Shop</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link 
                    to={link.to} 
                    className="text-background/60 hover:text-background text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account Links */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold text-background uppercase tracking-wider mb-4">Account</h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/wishlist" className="text-background/60 hover:text-background text-sm transition-colors">
                  My Wishlist
                </Link>
              </li>
              <li>
                <Link to="/compare" className="text-background/60 hover:text-background text-sm transition-colors">
                  Compare Products
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-background/60 hover:text-background text-sm transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-4">
            <h4 className="text-sm font-semibold text-background uppercase tracking-wider mb-4">Get in Touch</h4>
            <div className="space-y-4">
              <a 
                href="tel:0711483989" 
                className="flex items-center gap-3 text-background/60 hover:text-background transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-background">0711 483 989</p>
                  <p className="text-xs text-background/50">Call or Text</p>
                </div>
              </a>
              
              <button 
                onClick={openWhatsApp}
                className="flex items-center gap-3 text-background/60 hover:text-background transition-colors group w-full"
              >
                <div className="w-10 h-10 rounded-lg bg-[#25D366]/20 flex items-center justify-center group-hover:bg-[#25D366]/30 transition-colors">
                  <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-background">WhatsApp</p>
                  <p className="text-xs text-background/50">Quick responses</p>
                </div>
              </button>
              
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-background/80">Rasumal House, Shop 5, 1st Floor</p>
                  <p className="text-sm text-background/80">Tom Mboya Street, Nairobi</p>
                  <p className="text-xs text-primary font-medium mt-1">(Ask for Collins)</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-background/80">Mon - Sat: 9AM - 7PM</p>
                  <p className="text-xs text-background/50">Closed on Sundays</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="container mx-auto px-4 py-5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-background/50">
            <div className="flex items-center gap-2">
              <span>&copy; {currentYear} Collo The Plug. All rights reserved.</span>
            </div>
            
            <div className="flex items-center gap-4">
              <span>Quality Guaranteed</span>
              <span className="text-background/20">•</span>
              <span>Fast Delivery</span>
              <span className="text-background/20">•</span>
              <span>Expert Support</span>
            </div>

            <div className="flex items-center gap-2">
              <span>Made with ❤️ by</span>
              <button onClick={openCnBWhatsApp} className="text-primary hover:text-primary/80 font-semibold transition-colors">
                CnBCode
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
