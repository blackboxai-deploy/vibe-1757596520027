"use client";

import { useEffect, useState } from 'react';

export interface TokenBalance {
  symbol: string;
  balance: string;
  value: number;
  formatted: string;
}

export function useWeb3() {
  // Mock Web3 state for demo
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string>('');
  const [tokenBalances, setTokenBalances] = useState<TokenBalance[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [chain] = useState({ name: 'Ethereum', id: 1 });

  // Mock connection data
  useEffect(() => {
    if (isConnected) {
      setAddress('0x1234567890abcdef1234567890abcdef12345678');
      setIsLoading(true);
      // Simulate fetching token balances
      setTimeout(() => {
        const mockBalances: TokenBalance[] = [
          {
            symbol: 'ETH',
            balance: '2.5',
            value: 6250,
            formatted: '2.5000 ETH'
          },
          {
            symbol: 'USDC',
            balance: '1250.50',
            value: 1250.50,
            formatted: '$1,250.50 USDC'
          },
          {
            symbol: 'USDT',
            balance: '750.25',
            value: 750.25,
            formatted: '$750.25 USDT'
          },
          {
            symbol: 'DAI',
            balance: '500.75',
            value: 500.75,
            formatted: '$500.75 DAI'
          }
        ];
        setTokenBalances(mockBalances);
        setIsLoading(false);
      }, 1500);
    }
  }, [isConnected]);

  const connectWallet = () => {
    setIsConnected(true);
  };

  const disconnect = () => {
    setIsConnected(false);
    setAddress('');
    setTokenBalances([]);
  };

  const getTotalPortfolioValue = () => {
    return tokenBalances.reduce((total, token) => total + token.value, 0);
  };

  const formatAddress = (addr: string) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const sendPayment = async (to: string, amount: string, token: string = 'ETH') => {
    // Mock payment function - in real implementation, this would interact with smart contracts
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          hash: `0x${Math.random().toString(16).slice(2)}`,
          amount,
          token,
          to,
          status: 'success'
        });
      }, 2000);
    });
  };

   return {
    // Connection state
    address,
    isConnected,
    chain,
    error: null,
    
    // Functions
    connectWallet,
    disconnect,
    
    // Balances
    balance: '2.5',
    tokenBalances,
    isLoading,
    getTotalPortfolioValue,
    
    // Utilities
    formatAddress,
    sendPayment,
    
    // Chain info
    chainName: chain?.name || 'Ethereum',
    chainId: chain?.id || 1,
  };
}