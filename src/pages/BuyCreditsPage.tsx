import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAccount } from 'wagmi';
import { 
  Zap, 
  Check, 
  Loader2,
  ArrowRight,
  Coins
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Layout } from '@/components/layout/Layout';
import { useCredits } from '@/contexts/CreditsContext';
import { toast } from '@/hooks/use-toast';
import { CREDIT_PRICE } from '@/lib/wagmi';

const creditPackages = [
  { amount: 10, discount: 0, popular: false },
  { amount: 50, discount: 5, popular: true },
  { amount: 100, discount: 10, popular: false },
  { amount: 500, discount: 15, popular: false },
];

export default function BuyCreditsPage() {
  const { isConnected } = useAccount();
  const { buyCredits, isLoading } = useCredits();
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [purchaseState, setPurchaseState] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');

  const handlePurchase = async (amount: number) => {
    setPurchaseState('pending');
    
    const result = await buyCredits(amount);
    
    if (result.success) {
      setPurchaseState('success');
      toast({
        title: 'Credits Purchased!',
        description: `Successfully added ${amount} credits to your account.`,
      });
      setTimeout(() => setPurchaseState('idle'), 2000);
    } else {
      setPurchaseState('error');
      toast({
        title: 'Purchase Failed',
        description: 'There was an error processing your purchase.',
        variant: 'destructive',
      });
      setTimeout(() => setPurchaseState('idle'), 2000);
    }
  };

  if (!isConnected) {
    return (
      <Layout>
        <div className="min-h-[80vh] flex items-center justify-center">
          <Card variant="glass" className="max-w-md p-8 text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Coins className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Connect Your Wallet</h2>
            <p className="text-muted-foreground mb-6">
              Connect your wallet to purchase credits.
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
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Buy Credits</h1>
            <p className="text-muted-foreground text-lg">
              Purchase credits to access APIs. 1 credit = 1 API call.
            </p>
          </div>

          {/* Pricing Info */}
          <Card variant="glass" className="p-6 mb-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold mb-1">Credit Pricing</h3>
                <p className="text-sm text-muted-foreground">
                  Each credit costs {CREDIT_PRICE} MON (~$0.001)
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Zap className="h-4 w-4 text-primary" />
                <span>1 Credit = 1 API Call</span>
              </div>
            </div>
          </Card>

          {/* Credit Packages */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {creditPackages.map((pkg) => (
              <motion.div
                key={pkg.amount}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Card 
                  variant={selectedPackage === pkg.amount ? 'interactive' : 'glass'}
                  className={`p-6 cursor-pointer relative ${
                    selectedPackage === pkg.amount ? 'border-primary shadow-glow' : ''
                  }`}
                  onClick={() => setSelectedPackage(pkg.amount)}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                        Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">{pkg.amount}</div>
                    <div className="text-sm text-muted-foreground mb-4">Credits</div>
                    
                    <div className="mb-4">
                      <span className="text-2xl font-bold">
                        {(pkg.amount * CREDIT_PRICE * (1 - pkg.discount / 100)).toFixed(3)}
                      </span>
                      <span className="text-muted-foreground ml-1">MON</span>
                    </div>
                    
                    {pkg.discount > 0 && (
                      <div className="text-sm text-success">
                        Save {pkg.discount}%
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Custom Amount */}
          <Card variant="glass" className="p-6 mb-8">
            <h3 className="font-semibold mb-4">Custom Amount</h3>
            <div className="flex gap-4">
              <div className="flex-1">
                <input
                  type="number"
                  min="1"
                  max="10000"
                  placeholder="Enter amount..."
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedPackage(null);
                  }}
                  className="w-full h-12 px-4 rounded-lg bg-secondary border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors"
                />
              </div>
              <Button
                variant="outline"
                className="h-12"
                onClick={() => {
                  const amount = parseInt(customAmount);
                  if (amount > 0 && amount <= 10000) {
                    setSelectedPackage(amount);
                  }
                }}
              >
                Select
              </Button>
            </div>
            {customAmount && parseInt(customAmount) > 0 && (
              <div className="mt-4 text-sm text-muted-foreground">
                Cost: {(parseInt(customAmount) * CREDIT_PRICE).toFixed(4)} MON
              </div>
            )}
          </Card>

          {/* Purchase Button */}
          <div className="text-center">
            <Button
              variant="gradient"
              size="xl"
              disabled={!selectedPackage || purchaseState !== 'idle'}
              onClick={() => selectedPackage && handlePurchase(selectedPackage)}
              className="min-w-[200px]"
            >
              {purchaseState === 'pending' ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Processing...
                </>
              ) : purchaseState === 'success' ? (
                <>
                  <Check className="h-5 w-5" />
                  Success!
                </>
              ) : (
                <>
                  Buy {selectedPackage || 0} Credits
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </Button>
            
            {selectedPackage && (
              <p className="text-sm text-muted-foreground mt-4">
                You will pay {(selectedPackage * CREDIT_PRICE).toFixed(4)} MON
              </p>
            )}
          </div>

          {/* Info Cards */}
          <div className="grid sm:grid-cols-3 gap-6 mt-12">
            <Card variant="glass" className="p-6 text-center">
              <Zap className="h-8 w-8 text-primary mx-auto mb-3" />
              <h4 className="font-semibold mb-2">Instant Delivery</h4>
              <p className="text-sm text-muted-foreground">
                Credits available immediately after transaction confirms
              </p>
            </Card>
            
            <Card variant="glass" className="p-6 text-center">
              <Check className="h-8 w-8 text-success mx-auto mb-3" />
              <h4 className="font-semibold mb-2">Never Expire</h4>
              <p className="text-sm text-muted-foreground">
                Your credits are stored on-chain and never expire
              </p>
            </Card>
            
            <Card variant="glass" className="p-6 text-center">
              <Coins className="h-8 w-8 text-warning mx-auto mb-3" />
              <h4 className="font-semibold mb-2">Transparent Pricing</h4>
              <p className="text-sm text-muted-foreground">
                All pricing visible on-chain, no hidden fees
              </p>
            </Card>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
