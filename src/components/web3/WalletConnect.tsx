"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useWeb3 } from "@/hooks/useWeb3";

interface WalletConnectProps {
  onClose?: () => void;
}

export function WalletConnect({ onClose }: WalletConnectProps) {
  const { 
    isConnected, 
    address,
    chainName,
    tokenBalances,
    getTotalPortfolioValue,
    formatAddress,
    connectWallet,
    disconnect,
    isLoading
  } = useWeb3();

  const [showDetails, setShowDetails] = useState(false);

  if (isConnected) {
    return (
      <Card className="p-6 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-2 border-purple-200 dark:border-purple-700 shadow-xl">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src="https://storage.googleapis.com/workspace-ai-images/d6fed37f-ef91-430c-b2ad-a89e4f4f4c84.png" alt="Wallet" />
                <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-400 text-white">
                  💎
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                  Wallet Connected
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {formatAddress(address || '')}
                </p>
              </div>
            </div>
            <Badge className="bg-gradient-to-r from-green-400 to-green-600 text-white">
              {chainName}
            </Badge>
          </div>

          {/* Portfolio Value */}
          <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Portfolio</p>
            <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              ${getTotalPortfolioValue().toLocaleString()}
            </p>
          </div>

          {/* Token Balances */}
          {showDetails && (
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100">Token Balances</h4>
              {isLoading ? (
                <div className="flex items-center justify-center py-4">
                  <div className="w-6 h-6 border-2 border-purple-300 border-t-purple-600 rounded-full animate-spin"></div>
                </div>
              ) : (
                <div className="space-y-2">
                  {tokenBalances.map((token) => (
                    <div key={token.symbol} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {token.symbol.charAt(0)}
                        </div>
                        <span className="font-medium text-gray-900 dark:text-gray-100">{token.symbol}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900 dark:text-gray-100">{token.formatted}</p>
                        <p className="text-xs text-gray-500">${token.value.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex space-x-3">
            <Button
              onClick={() => setShowDetails(!showDetails)}
              variant="outline"
              className="flex-1 border-purple-200 dark:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/20"
            >
              {showDetails ? 'Hide Details' : 'Show Details'}
            </Button>
            <Button
              onClick={() => {
                disconnect();
                onClose?.();
              }}
              variant="outline"
              className="flex-1 border-red-200 dark:border-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400"
            >
              Disconnect
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-2 border-purple-200 dark:border-purple-700 shadow-xl">
      <div className="text-center space-y-6">
        {/* Logo */}
        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <div className="text-xl">💎</div>
          </div>
        </div>

        {/* Title */}
        <div>
          <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Connect Your Wallet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            Connect your Web3 wallet to start shopping with crypto and trading NFTs
          </p>
        </div>

        {/* Features */}
        <div className="space-y-3 text-left">
          <div className="flex items-center space-x-3 text-sm">
            <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
            <span className="text-gray-600 dark:text-gray-400">Pay with crypto in chats</span>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full"></div>
            <span className="text-gray-600 dark:text-gray-400">Buy & sell NFTs with friends</span>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-purple-500 rounded-full"></div>
            <span className="text-gray-600 dark:text-gray-400">Trade tokens & DeFi features</span>
          </div>
        </div>

        {/* Connect Button */}
        <Button
          onClick={connectWallet}
          className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 text-white font-semibold py-3 transition-all duration-300 transform hover:scale-105"
        >
          Connect MetaMask
        </Button>

        {/* Supported Wallets */}
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-2">Supported wallets:</p>
          <div className="flex items-center justify-center space-x-4">
            <div className="text-xs text-gray-400">MetaMask</div>
            <div className="text-xs text-gray-400">WalletConnect</div>
            <div className="text-xs text-gray-400">Coinbase</div>
          </div>
        </div>

        {onClose && (
          <Button
            onClick={onClose}
            variant="ghost"
            className="w-full text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            Maybe Later
          </Button>
        )}
      </div>
    </Card>
  );
}