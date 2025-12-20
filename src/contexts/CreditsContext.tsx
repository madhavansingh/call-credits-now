import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useAccount } from 'wagmi';

interface CreditTransaction {
  id: string;
  type: 'purchase' | 'consumption';
  amount: number;
  timestamp: Date;
  txHash?: string;
  apiEndpoint?: string;
}

interface CreditsContextType {
  credits: number;
  transactions: CreditTransaction[];
  isLoading: boolean;
  buyCredits: (amount: number) => Promise<{ success: boolean; txHash?: string }>;
  consumeCredit: (endpoint: string) => Promise<{ success: boolean; data?: any }>;
  refreshCredits: () => void;
}

const CreditsContext = createContext<CreditsContextType | undefined>(undefined);

export function CreditsProvider({ children }: { children: React.ReactNode }) {
  const { address, isConnected } = useAccount();
  const [credits, setCredits] = useState(0);
  const [transactions, setTransactions] = useState<CreditTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load credits from localStorage when wallet connects
  useEffect(() => {
    if (address) {
      const savedCredits = localStorage.getItem(`credits_${address}`);
      const savedTransactions = localStorage.getItem(`transactions_${address}`);
      
      if (savedCredits) {
        setCredits(parseInt(savedCredits, 10));
      }
      if (savedTransactions) {
        setTransactions(JSON.parse(savedTransactions).map((t: any) => ({
          ...t,
          timestamp: new Date(t.timestamp)
        })));
      }
    } else {
      setCredits(0);
      setTransactions([]);
    }
  }, [address]);

  // Save to localStorage when credits or transactions change
  useEffect(() => {
    if (address) {
      localStorage.setItem(`credits_${address}`, credits.toString());
      localStorage.setItem(`transactions_${address}`, JSON.stringify(transactions));
    }
  }, [credits, transactions, address]);

  const buyCredits = useCallback(async (amount: number) => {
    if (!address) return { success: false };
    
    setIsLoading(true);
    try {
      // Simulate blockchain transaction
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const txHash = `0x${Math.random().toString(16).slice(2)}${Math.random().toString(16).slice(2)}`;
      
      setCredits(prev => prev + amount);
      
      const transaction: CreditTransaction = {
        id: `tx_${Date.now()}`,
        type: 'purchase',
        amount,
        timestamp: new Date(),
        txHash,
      };
      
      setTransactions(prev => [transaction, ...prev]);
      
      return { success: true, txHash };
    } catch (error) {
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  }, [address]);

  const consumeCredit = useCallback(async (endpoint: string) => {
    if (!address) return { success: false };
    if (credits <= 0) return { success: false };
    
    setIsLoading(true);
    try {
      // Simulate API call and credit consumption
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock API responses based on endpoint
      const mockResponses: Record<string, any> = {
        '/api/weather': {
          location: 'San Francisco, CA',
          temperature: 68,
          unit: 'fahrenheit',
          conditions: 'Partly Cloudy',
          humidity: 65,
          wind: { speed: 12, direction: 'NW' },
          timestamp: new Date().toISOString(),
        },
        '/api/crypto': {
          symbol: 'MON',
          price: 2.45,
          change24h: 5.67,
          volume: 1250000000,
          marketCap: 4800000000,
          timestamp: new Date().toISOString(),
        },
        '/api/random': {
          uuid: crypto.randomUUID(),
          randomNumber: Math.floor(Math.random() * 1000000),
          timestamp: new Date().toISOString(),
        },
      };

      const data = mockResponses[endpoint] || { message: 'Success', endpoint };
      
      setCredits(prev => prev - 1);
      
      const transaction: CreditTransaction = {
        id: `tx_${Date.now()}`,
        type: 'consumption',
        amount: 1,
        timestamp: new Date(),
        apiEndpoint: endpoint,
      };
      
      setTransactions(prev => [transaction, ...prev]);
      
      return { success: true, data };
    } catch (error) {
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  }, [address, credits]);

  const refreshCredits = useCallback(() => {
    // In real implementation, would fetch from blockchain
    if (address) {
      const savedCredits = localStorage.getItem(`credits_${address}`);
      if (savedCredits) {
        setCredits(parseInt(savedCredits, 10));
      }
    }
  }, [address]);

  return (
    <CreditsContext.Provider value={{
      credits,
      transactions,
      isLoading,
      buyCredits,
      consumeCredit,
      refreshCredits,
    }}>
      {children}
    </CreditsContext.Provider>
  );
}

export function useCredits() {
  const context = useContext(CreditsContext);
  if (!context) {
    throw new Error('useCredits must be used within a CreditsProvider');
  }
  return context;
}
