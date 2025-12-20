import { motion } from 'framer-motion';
import { 
  Code2, 
  Copy,
  CheckCircle2,
  Terminal,
  FileCode,
  Book
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
import { useState } from 'react';

export default function DocsPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const codeExamples = {
    contract: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract PayPerCall {
    uint256 public constant CREDIT_PRICE = 0.001 ether;
    
    mapping(address => uint256) public credits;
    
    event CreditsPurchased(address indexed user, uint256 amount);
    event CreditConsumed(address indexed user);
    
    function buyCredits() external payable {
        require(msg.value >= CREDIT_PRICE, "Insufficient payment");
        uint256 amount = msg.value / CREDIT_PRICE;
        credits[msg.sender] += amount;
        emit CreditsPurchased(msg.sender, amount);
    }
    
    function consumeCredit(address user) external {
        require(credits[user] > 0, "No credits");
        credits[user] -= 1;
        emit CreditConsumed(user);
    }
    
    function getCredits(address user) external view returns (uint256) {
        return credits[user];
    }
}`,
    
    apiCall: `// Making an API call with PayPerCall
const response = await fetch('https://api.paypercall.xyz/weather', {
  method: 'GET',
  headers: {
    'X-Wallet-Address': walletAddress,
    'X-Wallet-Signature': signature,
  },
});

const data = await response.json();
// Credit automatically deducted on successful call`,

    buyCredits: `// Purchasing credits
import { ethers } from 'ethers';

const contract = new ethers.Contract(
  PAYPERCALL_ADDRESS,
  PAYPERCALL_ABI,
  signer
);

// Buy 10 credits
const tx = await contract.buyCredits({
  value: ethers.parseEther("0.01") // 0.001 MON per credit
});

await tx.wait();
console.log("Credits purchased!");`,

    checkBalance: `// Checking credit balance
const balance = await contract.getCredits(walletAddress);
console.log(\`Available credits: \${balance}\`);`,
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Developer Documentation</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Everything you need to integrate PayPerCall into your applications.
            </p>
          </div>

          {/* Quick Start */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Terminal className="h-6 w-6 text-primary" />
              Quick Start
            </h2>
            
            <div className="space-y-6">
              <Card variant="glass">
                <CardHeader>
                  <CardTitle className="text-lg">1. Connect Wallet</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Use any Web3 wallet (MetaMask, WalletConnect, etc.) to connect to the Monad Testnet.
                  </p>
                  <div className="p-4 rounded-lg bg-secondary/50 border border-border">
                    <code className="text-sm font-mono">
                      Chain ID: 10143<br />
                      RPC: https://testnet-rpc.monad.xyz<br />
                      Currency: MON
                    </code>
                  </div>
                </CardContent>
              </Card>

              <Card variant="glass">
                <CardHeader>
                  <CardTitle className="text-lg">2. Purchase Credits</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Call the <code className="text-primary">buyCredits()</code> function with MON tokens.
                    Each credit costs 0.001 MON.
                  </p>
                  <CodeBlock
                    code={codeExamples.buyCredits}
                    id="buy-credits"
                    copiedCode={copiedCode}
                    onCopy={copyToClipboard}
                  />
                </CardContent>
              </Card>

              <Card variant="glass">
                <CardHeader>
                  <CardTitle className="text-lg">3. Make API Calls</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Include your wallet address and signature in the request headers.
                    Each successful call consumes 1 credit.
                  </p>
                  <CodeBlock
                    code={codeExamples.apiCall}
                    id="api-call"
                    copiedCode={copiedCode}
                    onCopy={copyToClipboard}
                  />
                </CardContent>
              </Card>
            </div>
          </section>

          {/* API Reference */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Book className="h-6 w-6 text-primary" />
              API Reference
            </h2>
            
            <div className="space-y-6">
              <Card variant="glass">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <span className="px-2 py-1 rounded bg-success/20 text-success text-xs font-mono">
                        GET
                      </span>
                      /api/weather
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Returns current weather data for a location.
                  </p>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold mb-2">Response</h4>
                      <div className="p-4 rounded-lg bg-background/50 border border-border">
                        <pre className="text-sm font-mono overflow-x-auto">
{`{
  "location": "San Francisco, CA",
  "temperature": 68,
  "unit": "fahrenheit",
  "conditions": "Partly Cloudy",
  "humidity": 65,
  "wind": { "speed": 12, "direction": "NW" }
}`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card variant="glass">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <span className="px-2 py-1 rounded bg-success/20 text-success text-xs font-mono">
                        GET
                      </span>
                      /api/crypto
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Returns cryptocurrency price data.
                  </p>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold mb-2">Response</h4>
                      <div className="p-4 rounded-lg bg-background/50 border border-border">
                        <pre className="text-sm font-mono overflow-x-auto">
{`{
  "symbol": "MON",
  "price": 2.45,
  "change24h": 5.67,
  "volume": 1250000000,
  "marketCap": 4800000000
}`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card variant="glass">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <span className="px-2 py-1 rounded bg-success/20 text-success text-xs font-mono">
                        GET
                      </span>
                      /api/random
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Generates random UUIDs and numbers.
                  </p>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold mb-2">Response</h4>
                      <div className="p-4 rounded-lg bg-background/50 border border-border">
                        <pre className="text-sm font-mono overflow-x-auto">
{`{
  "uuid": "550e8400-e29b-41d4-a716-446655440000",
  "randomNumber": 847293,
  "timestamp": "2024-01-15T10:30:00Z"
}`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Smart Contract */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <FileCode className="h-6 w-6 text-primary" />
              Smart Contract
            </h2>
            
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="text-lg">PayPerCall.sol</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  The PayPerCall smart contract handles credit purchases and consumption on-chain.
                  Below is the full contract source code.
                </p>
                <CodeBlock
                  code={codeExamples.contract}
                  id="contract"
                  copiedCode={copiedCode}
                  onCopy={copyToClipboard}
                  language="solidity"
                />
                
                <div className="mt-6 grid sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-secondary/50 border border-border">
                    <h4 className="font-semibold mb-2">Contract Address</h4>
                    <code className="text-sm font-mono text-muted-foreground break-all">
                      0x0000...0000 (Deploy on Monad Testnet)
                    </code>
                  </div>
                  <div className="p-4 rounded-lg bg-secondary/50 border border-border">
                    <h4 className="font-semibold mb-2">Credit Price</h4>
                    <code className="text-sm font-mono text-muted-foreground">
                      0.001 MON per credit
                    </code>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Utility Functions */}
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Code2 className="h-6 w-6 text-primary" />
              Utility Functions
            </h2>
            
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="text-lg">Check Credit Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Query the on-chain credit balance for any wallet address.
                </p>
                <CodeBlock
                  code={codeExamples.checkBalance}
                  id="check-balance"
                  copiedCode={copiedCode}
                  onCopy={copyToClipboard}
                />
              </CardContent>
            </Card>
          </section>
        </motion.div>
      </div>
    </Layout>
  );
}

function CodeBlock({ 
  code, 
  id, 
  copiedCode, 
  onCopy,
  language = 'typescript'
}: { 
  code: string; 
  id: string; 
  copiedCode: string | null;
  onCopy: (code: string, id: string) => void;
  language?: string;
}) {
  return (
    <div className="relative">
      <div className="absolute top-3 right-3 z-10">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onCopy(code, id)}
          className="h-8 px-2"
        >
          {copiedCode === id ? (
            <CheckCircle2 className="h-4 w-4 text-success" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
      <div className="p-4 rounded-lg bg-background/50 border border-border overflow-x-auto">
        <pre className="text-sm font-mono">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
