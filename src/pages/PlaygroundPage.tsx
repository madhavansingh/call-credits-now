import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAccount } from 'wagmi';
import { 
  Play, 
  Loader2,
  Zap,
  AlertCircle,
  CheckCircle2,
  Cloud,
  Bitcoin,
  Shuffle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Layout } from '@/components/layout/Layout';
import { useCredits } from '@/contexts/CreditsContext';

const endpoints = [
  {
    id: 'weather',
    path: '/api/weather',
    name: 'Weather API',
    description: 'Get current weather data',
    icon: Cloud,
  },
  {
    id: 'crypto',
    path: '/api/crypto',
    name: 'Crypto Prices',
    description: 'Get cryptocurrency prices',
    icon: Bitcoin,
  },
  {
    id: 'random',
    path: '/api/random',
    name: 'Random Data',
    description: 'Generate random UUIDs and numbers',
    icon: Shuffle,
  },
];

export default function PlaygroundPage() {
  const { isConnected } = useAccount();
  const { credits, consumeCredit, isLoading } = useCredits();
  const [selectedEndpoint, setSelectedEndpoint] = useState(endpoints[0]);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [callState, setCallState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleApiCall = async () => {
    if (credits <= 0) {
      setError('No credits available. Please purchase credits to continue.');
      setCallState('error');
      return;
    }

    setCallState('loading');
    setResponse(null);
    setError(null);

    const result = await consumeCredit(selectedEndpoint.path);

    if (result.success) {
      setResponse(result.data);
      setCallState('success');
    } else {
      setError('Failed to execute API call. Please try again.');
      setCallState('error');
    }
  };

  if (!isConnected) {
    return (
      <Layout>
        <div className="min-h-[80vh] flex items-center justify-center">
          <Card variant="glass" className="max-w-md p-8 text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Play className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Connect Your Wallet</h2>
            <p className="text-muted-foreground mb-6">
              Connect your wallet to use the API playground.
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
          className="max-w-5xl mx-auto"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">API Playground</h1>
              <p className="text-muted-foreground">
                Test API endpoints and see real responses.
              </p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary border border-border">
              <Zap className="h-4 w-4 text-primary" />
              <span className="font-semibold">{credits} credits</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Endpoint Selection */}
            <div className="lg:col-span-2">
              <Card variant="glass" className="p-6">
                <h3 className="font-semibold mb-4">Select Endpoint</h3>
                <div className="space-y-3">
                  {endpoints.map((endpoint) => (
                    <button
                      key={endpoint.id}
                      onClick={() => setSelectedEndpoint(endpoint)}
                      className={`w-full p-4 rounded-lg border transition-all text-left ${
                        selectedEndpoint.id === endpoint.id
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/50 hover:bg-secondary'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          selectedEndpoint.id === endpoint.id
                            ? 'bg-primary/20'
                            : 'bg-secondary'
                        }`}>
                          <endpoint.icon className={`h-5 w-5 ${
                            selectedEndpoint.id === endpoint.id
                              ? 'text-primary'
                              : 'text-muted-foreground'
                          }`} />
                        </div>
                        <div>
                          <div className="font-medium">{endpoint.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {endpoint.description}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mt-6 p-4 rounded-lg bg-secondary/50 border border-border">
                  <div className="text-sm text-muted-foreground mb-2">Request</div>
                  <code className="text-sm font-mono text-primary">
                    GET {selectedEndpoint.path}
                  </code>
                </div>

                <Button
                  variant="gradient"
                  size="lg"
                  className="w-full mt-6"
                  onClick={handleApiCall}
                  disabled={isLoading || callState === 'loading'}
                >
                  {callState === 'loading' ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Calling API...
                    </>
                  ) : (
                    <>
                      <Play className="h-5 w-5" />
                      Execute Call (1 Credit)
                    </>
                  )}
                </Button>
              </Card>
            </div>

            {/* Response Panel */}
            <div className="lg:col-span-3">
              <Card variant="glass" className="h-full">
                <CardHeader className="border-b border-border">
                  <CardTitle className="flex items-center gap-2">
                    Response
                    {callState === 'success' && (
                      <span className="flex items-center gap-1 text-sm font-normal text-success">
                        <CheckCircle2 className="h-4 w-4" />
                        200 OK
                      </span>
                    )}
                    {callState === 'error' && (
                      <span className="flex items-center gap-1 text-sm font-normal text-destructive">
                        <AlertCircle className="h-4 w-4" />
                        Error
                      </span>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {callState === 'idle' ? (
                    <div className="p-12 text-center text-muted-foreground">
                      <Play className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Click "Execute Call" to see the response</p>
                    </div>
                  ) : callState === 'loading' ? (
                    <div className="p-12 text-center text-muted-foreground">
                      <Loader2 className="h-12 w-12 mx-auto mb-4 animate-spin" />
                      <p>Executing API call...</p>
                    </div>
                  ) : error ? (
                    <div className="p-6">
                      <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertCircle className="h-5 w-5" />
                          <span className="font-semibold">Error</span>
                        </div>
                        <p className="text-sm">{error}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="p-6">
                      <pre className="p-4 rounded-lg bg-background/50 border border-border overflow-x-auto">
                        <code className="text-sm font-mono text-foreground">
                          {JSON.stringify(response, null, 2)}
                        </code>
                      </pre>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Credits Warning */}
          {credits <= 3 && credits > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8"
            >
              <Card variant="glass" className="p-4 border-warning/30 bg-warning/5">
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-5 w-5 text-warning" />
                  <p className="text-sm">
                    You're running low on credits. Consider purchasing more to continue using APIs.
                  </p>
                </div>
              </Card>
            </motion.div>
          )}

          {credits === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8"
            >
              <Card variant="glass" className="p-4 border-destructive/30 bg-destructive/5">
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-5 w-5 text-destructive" />
                  <p className="text-sm">
                    You have no credits remaining. Purchase credits to continue using APIs.
                  </p>
                </div>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </div>
    </Layout>
  );
}
