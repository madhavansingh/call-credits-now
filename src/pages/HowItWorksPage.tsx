import { motion } from 'framer-motion';
import { 
  Wallet, 
  Coins, 
  Zap, 
  ArrowRight,
  Database,
  Server,
  CheckCircle2,
  Code2
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Layout } from '@/components/layout/Layout';

const steps = [
  {
    icon: Wallet,
    title: 'Connect Wallet',
    description: 'Link your Web3 wallet (MetaMask, WalletConnect, etc.) to the platform. Your wallet address serves as your unique identifier - no usernames, passwords, or API keys needed.',
    details: [
      'One-click wallet connection',
      'Supports all major wallets',
      'No account registration required',
      'Your wallet = your identity'
    ]
  },
  {
    icon: Coins,
    title: 'Purchase Credits',
    description: 'Buy credits using MON tokens on Monad Testnet. Each credit equals one API call. Credits are stored on-chain and tied to your wallet address.',
    details: [
      'Transparent on-chain pricing',
      'Bulk discounts available',
      'Credits never expire',
      'Instant delivery after tx confirms'
    ]
  },
  {
    icon: Zap,
    title: 'Call APIs',
    description: 'Make API calls with your wallet signature. Each successful call consumes exactly 1 credit. The backend verifies your credit balance on-chain before processing.',
    details: [
      '1 credit = 1 API call',
      'Real-time balance checking',
      'Fast off-chain execution',
      'On-chain credit accounting'
    ]
  }
];

export default function HowItWorksPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              From wallet connection to API call in three simple steps.
              No subscriptions, no API keys, just pay-per-use simplicity.
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-12 mb-20">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-button">
                      <step.icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-sm font-mono text-muted-foreground">
                        Step {String(index + 1).padStart(2, '0')}
                      </span>
                      <div className="h-px flex-1 bg-border" />
                    </div>
                    
                    <h2 className="text-2xl font-bold mb-3">{step.title}</h2>
                    <p className="text-muted-foreground mb-6">{step.description}</p>
                    
                    <div className="grid sm:grid-cols-2 gap-3">
                      {step.details.map((detail) => (
                        <div key={detail} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {index < steps.length - 1 && (
                  <div className="flex justify-center py-8">
                    <ArrowRight className="h-6 w-6 text-muted-foreground/50 rotate-90 lg:rotate-0" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Architecture */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card variant="glass" className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-center">System Architecture</h2>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-6 rounded-xl bg-secondary/50 border border-border">
                  <Wallet className="h-10 w-10 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Client</h3>
                  <p className="text-sm text-muted-foreground">
                    Web3 wallet for authentication and credit purchases
                  </p>
                </div>
                
                <div className="text-center p-6 rounded-xl bg-secondary/50 border border-border">
                  <Server className="h-10 w-10 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Backend</h3>
                  <p className="text-sm text-muted-foreground">
                    Verifies credits and executes API logic off-chain
                  </p>
                </div>
                
                <div className="text-center p-6 rounded-xl bg-secondary/50 border border-border">
                  <Database className="h-10 w-10 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Monad</h3>
                  <p className="text-sm text-muted-foreground">
                    On-chain credit storage and payment processing
                  </p>
                </div>
              </div>

              {/* Flow Diagram */}
              <div className="p-6 rounded-xl bg-background/50 border border-border">
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                  Request Flow
                </h4>
                <div className="font-mono text-sm space-y-2">
                  <div className="flex items-center gap-4">
                    <span className="text-muted-foreground w-6">1.</span>
                    <span>Client → Backend: <span className="text-primary">API request + wallet signature</span></span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-muted-foreground w-6">2.</span>
                    <span>Backend → Monad: <span className="text-primary">Check credit balance</span></span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-muted-foreground w-6">3.</span>
                    <span>Monad → Backend: <span className="text-success">Balance verified</span></span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-muted-foreground w-6">4.</span>
                    <span>Backend → Monad: <span className="text-warning">Consume 1 credit</span></span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-muted-foreground w-6">5.</span>
                    <span>Backend → Client: <span className="text-success">API response</span></span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Why This Works */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12"
          >
            <h2 className="text-2xl font-bold mb-6 text-center">
              Why This Architecture?
            </h2>
            
            <div className="grid sm:grid-cols-2 gap-6">
              <Card variant="glass" className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Database className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold">On-Chain Billing</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Credits and payments are recorded on Monad's blockchain, ensuring 
                  transparent, immutable, and trustless accounting. No disputes possible.
                </p>
              </Card>
              
              <Card variant="glass" className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Zap className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold">Off-Chain Execution</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  API logic runs on traditional servers for maximum speed. Only credit 
                  verification touches the blockchain, keeping latency minimal.
                </p>
              </Card>
              
              <Card variant="glass" className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Wallet className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold">Wallet Identity</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Your wallet address is your unique identifier. No API keys to manage, 
                  no passwords to remember, no accounts to create.
                </p>
              </Card>
              
              <Card variant="glass" className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Code2 className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold">Monad Performance</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  With 10,000 TPS and sub-second finality, Monad enables real-time 
                  credit verification without the bottlenecks of slower chains.
                </p>
              </Card>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </Layout>
  );
}
