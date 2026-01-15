import { Shield, Truck, Award, Headphones, CreditCard, RefreshCw } from 'lucide-react';

const TrustBadges = () => {
  const badges = [
    { icon: Shield, title: '30-Day Warranty', description: 'All products covered' },
    { icon: Truck, title: 'Fast Delivery', description: 'Nairobi & countrywide' },
    { icon: Award, title: 'Quality Assured', description: '5+ years experience' },
    { icon: Headphones, title: 'Expert Support', description: 'Technical assistance' },
    { icon: CreditCard, title: 'M-Pesa Payment', description: 'Secure & convenient' },
    { icon: RefreshCw, title: 'Easy Returns', description: 'Hassle-free process' },
  ];

  return (
    <section className="py-12 border-y border-border bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {badges.map((badge) => {
            const Icon = badge.icon;
            return (
              <div key={badge.title} className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-medium text-foreground text-sm mb-1">{badge.title}</h3>
                <p className="text-xs text-muted-foreground">{badge.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
