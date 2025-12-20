import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { 
  Zap, 
  ArrowRight, 
  TrendingUp, 
  TrendingDown,
  Clock,
  Plus,
  Play
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Layout } from '@/components/layout/Layout';
import { useCredits } from '@/contexts/CreditsContext';
import { formatDistanceToNow } from 'date-fns';

export default function Dashboard() {
  const { address, isConnected } = useAccount();
  const { credits, transactions } = useCredits();

  const recentTransactions = transactions.slice(0, 10);
  
  const purchasedTotal = transactions
    .filter(t => t.type === 'purchase')
    .reduce((acc, t) => acc + t.amount, 0);
  
  const consumedTotal = transactions
    .filter(t => t.type === 'consumption')
    .reduce((acc, t) => acc + t.amount, 0);

  if (!isConnected) {
    return (
      <Layout>
        <div className="min-h-[80vh] flex items-center justify-center">
          <Card variant="glass" className="max-w-md p-8 text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Zap className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Connect Your Wallet</h2>
            <p className="text-muted-foreground mb-6">
              Connect your wallet to access your dashboard and manage credits.
            </p>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your credits and monitor API usage.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card variant="interactive" className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-muted-foreground">Available Credits</span>
                <Zap className="h-5 w-5 text-primary" />
              </div>
              <div className="text-3xl font-bold">{credits}</div>
              <p className="text-sm text-muted-foreground mt-1">
                Ready to use
              </p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card variant="interactive" className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-muted-foreground">Total Purchased</span>
                <TrendingUp className="h-5 w-5 text-success" />
              </div>
              <div className="text-3xl font-bold">{purchasedTotal}</div>
              <p className="text-sm text-muted-foreground mt-1">
                All time
              </p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card variant="interactive" className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-muted-foreground">Total Used</span>
                <TrendingDown className="h-5 w-5 text-warning" />
              </div>
              <div className="text-3xl font-bold">{consumedTotal}</div>
              <p className="text-sm text-muted-foreground mt-1">
                API calls made
              </p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card variant="interactive" className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-muted-foreground">Transactions</span>
                <Clock className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="text-3xl font-bold">{transactions.length}</div>
              <p className="text-sm text-muted-foreground mt-1">
                Total records
              </p>
            </Card>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid sm:grid-cols-2 gap-6 mb-8"
        >
          <Link to="/buy-credits">
            <Card variant="interactive" className="p-6 h-full group">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Buy More Credits</h3>
                  <p className="text-sm text-muted-foreground">
                    Top up your balance to continue using APIs
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Plus className="h-6 w-6 text-primary" />
                </div>
              </div>
            </Card>
          </Link>

          <Link to="/playground">
            <Card variant="interactive" className="p-6 h-full group">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2">API Playground</h3>
                  <p className="text-sm text-muted-foreground">
                    Test API endpoints and see real responses
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Play className="h-6 w-6 text-primary" />
                </div>
              </div>
            </Card>
          </Link>
        </motion.div>

        {/* Wallet Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <Card variant="glass" className="p-6">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              Connected Wallet
            </h3>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                <Zap className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <code className="text-sm font-mono">
                  {address}
                </code>
                <p className="text-sm text-muted-foreground">
                  Monad Testnet
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Transaction History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              {recentTransactions.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No transactions yet</p>
                  <p className="text-sm">Buy some credits to get started!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentTransactions.map((tx) => (
                    <div
                      key={tx.id}
                      className="flex items-center justify-between py-3 border-b border-border last:border-0"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          tx.type === 'purchase' 
                            ? 'bg-success/10 text-success' 
                            : 'bg-warning/10 text-warning'
                        }`}>
                          {tx.type === 'purchase' ? (
                            <TrendingUp className="h-5 w-5" />
                          ) : (
                            <TrendingDown className="h-5 w-5" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">
                            {tx.type === 'purchase' ? 'Purchased Credits' : 'API Call'}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {tx.type === 'consumption' && tx.apiEndpoint ? (
                              <code className="text-xs">{tx.apiEndpoint}</code>
                            ) : tx.txHash ? (
                              <code className="text-xs">{tx.txHash.slice(0, 16)}...</code>
                            ) : null}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${
                          tx.type === 'purchase' ? 'text-success' : 'text-warning'
                        }`}>
                          {tx.type === 'purchase' ? '+' : '-'}{tx.amount}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {formatDistanceToNow(tx.timestamp, { addSuffix: true })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </Layout>
  );
}
