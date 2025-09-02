import { Card, CardContent, CardHeader, CardTitle } from './ui/card.js';

const steps = [
  {
    number: '01',
    title: 'Register & Verify',
    description: 'Sign up with your employment history and verify your unemployment status through our secure platform.'
  },
  {
    number: '02',
    title: 'Receive FOL Tokens',
    description: 'Get allocated FOL tokens based on your eligibility and previous employment contributions.'
  },
  {
    number: '03',
    title: 'Use & Exchange',
    description: 'Use FOL for daily expenses, job search activities, or exchange for USD through payment networks with 1:1 parity.'
  },
  {
    number: '04',
    title: 'Transition Support',
    description: 'Access job opportunities, training programs, and community support while maintaining financial stability through the transition.'
  }
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Simple steps to access financial support during your career transition
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="h-full">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg font-bold mb-4">
                    {step.number}
                  </div>
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </CardContent>
              </Card>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-6 -right-4 w-8 h-0.5 bg-border"></div>
              )}
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Ready to secure your financial future with stablecoin-backed stability during employment transitions?
          </p>
          <button className="bg-primary text-primary-foreground px-8 py-3 rounded-md font-semibold hover:bg-primary/90 transition-colors">
            Get Started Today
          </button>
        </div>
      </div>
    </section>
  );
}
