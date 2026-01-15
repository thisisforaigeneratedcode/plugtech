import { CheckCircle2, MapPin, Clock, Users } from 'lucide-react';

const WhyChooseUs = () => {
  const features = [
    { icon: CheckCircle2, title: 'Verified Quality', description: 'Every product undergoes thorough testing before sale.' },
    { icon: MapPin, title: 'Convenient Location', description: 'Tom Mboya Street, Nairobi CBD. Easy access for purchases.' },
    { icon: Clock, title: 'Quick Service', description: 'Fast WhatsApp response. Same-day delivery in Nairobi.' },
    { icon: Users, title: 'Trusted by Many', description: '5+ years serving happy customers in Nairobi.' },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Why Choose Us</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">The best computer shopping experience in Nairobi</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="p-6 bg-card rounded-xl border border-border hover:border-primary/20 hover:shadow-sm transition-all duration-200">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
