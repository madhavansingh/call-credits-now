import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { 
  Zap, 
  Shield, 
  Clock, 
  Coins, 
  ArrowRight, 
  CheckCircle2,
  Code2,
  Wallet,
  Activity
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Layout } from '@/components/layout/Layout';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function LandingPage() {
  const { isConnected } = useAccount();

  const features = [
    {
      icon: Coins,
      title: 'Pay-Per-Use',
      description: 'Only pay for what you use. No monthly fees, no commitments.'
    },
    {
      icon: Shield,
      title: 'No API Keys',
      description: 'Your wallet is your identity. No keys to manage or secure.'
    },
    {
      icon: Clock,
      title: 'Instant Access',
      description: 'Connect wallet, buy credits, start calling. That simple.'
    },
    {
      icon: Activity,
      title: 'Monad Speed',
      description: '10,000 TPS means instant credit verification.'
    }
  ];

  const steps = [
    { step: '01', title: 'Connect Wallet', description: 'Link your Web3 wallet in one click' },
    { step: '02', title: 'Buy Credits', description: 'Purchase credits with MON tokens' },
    { step: '03', title: 'Call APIs', description: 'Each call consumes 1 credit' },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-glow opacity-50" />
        <div className="absolute inset-0 grid-pattern opacity-30" />
        
        {/* Floating Elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary">
                <Zap className="h-4 w-4" />
                Powered by Monad Testnet
              </span>
            </motion.div>

            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            >
              API Access.{' '}
              <span className="text-gradient">Pay Per Call.</span>
            </motion.h1>

            <motion.p 
              variants={fadeInUp}
              className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto"
            >
              No subscriptions. No API keys. Just connect your wallet, 
              buy credits, and start calling. Simple as that.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {isConnected ? (
                <Link to="/dashboard">
                  <Button variant="gradient" size="xl" className="group">
                    Go to Dashboard
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              ) : (
                <ConnectButton.Custom>
                  {({ openConnectModal }) => (
                    <Button onClick={openConnectModal} variant="gradient" size="xl" className="group">
                      Connect Wallet
                      <Wallet className="h-5 w-5" />
                    </Button>
                  )}
                </ConnectButton.Custom>
              )}
              <Link to="/how-it-works">
                <Button variant="outline" size="xl">
                  Learn More
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-24 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Problem */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card variant="glass" className="h-full p-8">
                <div className="text-destructive text-sm font-semibold uppercase tracking-wider mb-4">
                  The Problem
                </div>
                <h3 className="text-2xl font-bold mb-4">
                  Traditional API Billing is Broken
                </h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="text-destructive mt-1">✕</span>
                    Monthly subscriptions you don't fully use
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-destructive mt-1">✕</span>
                    API keys that get leaked or compromised
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-destructive mt-1">✕</span>
                    Complex authentication flows
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-destructive mt-1">✕</span>
                    Vendor lock-in and hidden fees
                  </li>
                </ul>
              </Card>
            </motion.div>

            {/* Solution */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card variant="glass" className="h-full p-8 border-primary/30">
                <div className="text-primary text-sm font-semibold uppercase tracking-wider mb-4">
                  Our Solution
                </div>
                <h3 className="text-2xl font-bold mb-4">
                  Wallet-Based Pay-Per-Use
                </h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-success h-5 w-5 mt-0.5 shrink-0" />
                    Pay only for calls you make
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-success h-5 w-5 mt-0.5 shrink-0" />
                    Your wallet = your identity
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-success h-5 w-5 mt-0.5 shrink-0" />
                    On-chain credit accounting
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-success h-5 w-5 mt-0.5 shrink-0" />
                    Transparent and trustless
                  </li>
                </ul>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-card/30">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Built for the Future of APIs
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Experience the next generation of API billing with blockchain-powered simplicity.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card variant="interactive" className="h-full p-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Preview */}
      <section className="py-24 border-t border-border">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Three Steps to Get Started
            </h2>
            <p className="text-muted-foreground text-lg">
              From wallet to API call in under a minute.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative"
              >
                <div className="text-6xl font-bold text-primary/10 absolute -top-4 -left-2">
                  {step.step}
                </div>
                <div className="relative pt-8">
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform translate-x-1/2">
                    <ArrowRight className="h-6 w-6 text-muted-foreground/50" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link to="/how-it-works">
              <Button variant="outline" size="lg">
                View Full Documentation
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why Monad Section */}
      <section className="py-24 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Monad?
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                The perfect blockchain for pay-per-use infrastructure.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { value: '10,000', label: 'TPS', desc: 'Transactions per second' },
                { value: '<1s', label: 'Finality', desc: 'Near-instant confirmation' },
                { value: '~$0.001', label: 'Per TX', desc: 'Ultra-low gas fees' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card variant="glass" className="p-6 text-center">
                    <div className="text-3xl font-bold text-gradient mb-1">{stat.value}</div>
                    <div className="text-sm font-semibold text-foreground mb-1">{stat.label}</div>
                    <div className="text-xs text-muted-foreground">{stat.desc}</div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-glow opacity-30" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Connect your wallet and experience the future of API access.
            </p>
            
            {isConnected ? (
              <Link to="/dashboard">
                <Button variant="gradient" size="xl" className="group">
                  Go to Dashboard
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            ) : (
              <ConnectButton.Custom>
                {({ openConnectModal }) => (
                  <Button onClick={openConnectModal} variant="gradient" size="xl" className="group">
                    Connect Wallet
                    <Wallet className="h-5 w-5" />
                  </Button>
                )}
              </ConnectButton.Custom>
            )}
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
