import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Shield, DollarSign, Users, Zap, CheckCircle, CreditCard } from 'lucide-react';

const features = [
  {
    icon: DollarSign,
    title: 'USD Stability',
    description: 'Maintains 1:1 peg with USD through stablecoin backing, ensuring stable purchasing power during economic uncertainty.'
  },
  {
    icon: Shield,
    title: 'Regulatory Compliance',
    description: 'Built on infrastructure with full regulatory compliance and institutional-grade security.'
  },
  {
    icon: CreditCard,
    title: 'Payment Integration',
    description: 'Seamless integration with existing payment networks for easy transactions.'
  },
  {
    icon: Users,
    title: 'Community Support',
    description: 'Connect with other workers, share opportunities, and build support networks within the FOL ecosystem.'
  },
  {
    icon: Zap,
    title: 'Instant Access',
    description: 'Quick onboarding and immediate access to funds when you need them most.'
  },
  {
    icon: CheckCircle,
    title: 'Proven Technology',
    description: 'Leverages established stablecoin technology with billions in transaction volume.'
  }
];

export function Features() {
  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose FOL?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Designed with the modern worker in mind, FOL offers unique benefits powered by proven infrastructure
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
