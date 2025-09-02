import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card.js';
import { Button } from '../components/ui/button.js';
import { useAuth } from '../contexts/AuthContext.js';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../lib/api.js';
import { formatCurrency } from '../lib/utils.js';
import type { Portfolio } from '../../../shared/src/types/index.js';

export function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [portfolio, setPortfolio] = React.useState<Portfolio | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function loadPortfolio() {
      try {
        const portfolioData = await apiClient.getPortfolio();
        setPortfolio(portfolioData);
      } catch (error) {
        console.error('Failed to load portfolio:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadPortfolio();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleMint = async () => {
    try {
      await apiClient.mintStablecoin(100);
      const portfolioData = await apiClient.getPortfolio();
      setPortfolio(portfolioData);
    } catch (error) {
      console.error('Mint failed:', error);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">F</span>
            </div>
            <span className="font-bold text-xl">FOL Capital</span>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome, {user.name || user.email}
          </h1>
          <p className="text-muted-foreground">
            Manage your FOL Capital stablecoin portfolio
          </p>
        </div>

        {isLoading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Total Balance
                  <span className="text-2xl font-bold text-primary">
                    {formatCurrency(portfolio?.totalBalance || 0)}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Your current stablecoin holdings
                </p>
                <Button className="mt-4 w-full" onClick={handleMint}>
                  Mint $100 FOL
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                {portfolio?.transactions?.length ? (
                  <div className="space-y-2">
                    {portfolio.transactions.slice(0, 3).map((tx) => (
                      <div key={tx.id} className="flex justify-between text-sm">
                        <span className="capitalize">{tx.type}</span>
                        <span className={tx.type === 'mint' ? 'text-green-600' : 'text-red-600'}>
                          {tx.type === 'mint' ? '+' : '-'}{formatCurrency(tx.amount)}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No transactions yet
                  </p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <p className="font-medium">{user.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Name</label>
                  <p className="font-medium">{user.name || 'Not provided'}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}