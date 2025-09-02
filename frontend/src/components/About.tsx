import { Card, CardContent, CardHeader, CardTitle } from './ui/card.js';

export function About() {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About FOL</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Supporting workers through economic transitions with stablecoin-powered financial stability
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-semibold mb-4">The Challenge</h3>
            <p className="text-muted-foreground mb-6">
              Rapid technological advancement, particularly AI, is displacing workers across industries. 
              Traditional unemployment systems often fall short in providing immediate, flexible support 
              during these transitions.
            </p>
            
            <h3 className="text-2xl font-semibold mb-4">Our Solution</h3>
            <p className="text-muted-foreground mb-6">
              FOL leverages proven stablecoin infrastructure to provide a stable, accessible 
              financial tool that maintains purchasing power while offering innovative features designed 
              specifically for the modern labor market's challenges.
            </p>

            <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                Why Stablecoins?
              </h3>
              <p className="text-muted-foreground text-sm">
                Stablecoins provide regulatory compliance, institutional backing, and seamless 
                integration with existing payment systems, ensuring reliability and trust for our users.
              </p>
            </div>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Key Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Token Symbol</span>
                <span className="font-semibold">FOL</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Backend</span>
                <span className="font-semibold">Stablecoin</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Peg Ratio</span>
                <span className="font-semibold">1:1 USD</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Target Audience</span>
                <span className="font-semibold">Unemployed Workers</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Purpose</span>
                <span className="font-semibold">Economic Stability</span>
              </div>
              <div className="pt-4 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground text-sm">Regulatory Status</span>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded dark:bg-green-900 dark:text-green-200">
                    Compliant
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
