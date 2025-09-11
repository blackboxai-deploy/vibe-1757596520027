"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useWeb3 } from "@/hooks/useWeb3";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  isNFT?: boolean;
  cryptoPrice?: {
    eth: string;
    usdc: string;
  };
  selectedColor?: string;
  selectedSize?: string;
}

interface ShoppingCartProps {
  items: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  isConnected: boolean;
}

export function ShoppingCart({ items, onClose, onUpdateQuantity, onRemoveItem, isConnected }: ShoppingCartProps) {
  const [paymentMethod, setPaymentMethod] = useState<'crypto' | 'card'>('crypto');
  const [isProcessing, setIsProcessing] = useState(false);
  const { sendPayment, formatAddress, address } = useWeb3();

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalCrypto = (token: 'eth' | 'usdc') => {
    return items.reduce((total, item) => {
      if (item.cryptoPrice) {
        return total + (parseFloat(item.cryptoPrice[token]) * item.quantity);
      }
      return total;
    }, 0);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const handleCheckout = async () => {
    if (!isConnected && paymentMethod === 'crypto') {
      return;
    }

    setIsProcessing(true);

    try {
      if (paymentMethod === 'crypto') {
        // Simulate crypto payment
        await sendPayment(
          '0x1234567890123456789012345678901234567890', // Merchant address
          getTotalCrypto('eth').toString(),
          'ETH'
        );
      } else {
        // Simulate card payment
        await new Promise(resolve => setTimeout(resolve, 2000));
      }

      // Show success and close
      alert('🎉 Payment successful! Your order is being processed.');
      onClose();
    } catch (error) {
      alert('❌ Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <Card className="p-8 bg-white dark:bg-gray-800">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
            <div className="text-3xl">🛒</div>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Your cart is empty
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Add some products to your cart to get started!
          </p>
          <Button
            onClick={onClose}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
          >
            Continue Shopping
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-white dark:bg-gray-800 max-h-[80vh] overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Shopping Cart ({items.length})
        </h2>
        <Button
          onClick={onClose}
          variant="ghost"
          size="sm"
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          ✕
        </Button>
      </div>

      {/* Cart Items */}
      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div key={`${item.id}-${item.selectedColor}-${item.selectedSize}`} className="flex items-center space-x-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 object-cover rounded-lg"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://placehold.co/64x64?text=Item";
              }}
            />
            
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                {item.name}
              </h4>
              <div className="flex items-center space-x-2 mt-1">
                {item.selectedColor && (
                  <Badge variant="outline" className="text-xs">
                    {item.selectedColor}
                  </Badge>
                )}
                {item.selectedSize && (
                  <Badge variant="outline" className="text-xs">
                    {item.selectedSize}
                  </Badge>
                )}
                {item.isNFT && (
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs">
                    NFT
                  </Badge>
                )}
              </div>
              <div className="mt-2">
                <span className="font-bold text-gray-900 dark:text-gray-100">
                  {formatPrice(item.price)}
                </span>
                {item.cryptoPrice && isConnected && (
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {item.cryptoPrice.eth} ETH • {item.cryptoPrice.usdc} USDC
                  </div>
                )}
              </div>
            </div>

            {/* Quantity Controls */}
            {!item.isNFT && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                  className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center justify-center transition-colors"
                >
                  -
                </button>
                <span className="text-lg font-semibold text-gray-900 dark:text-gray-100 min-w-[2rem] text-center">
                  {item.quantity}
                </span>
                <button
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center justify-center transition-colors"
                >
                  +
                </button>
              </div>
            )}

            {/* Remove Button */}
            <button
              onClick={() => onRemoveItem(item.id)}
              className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 p-2 transition-colors"
            >
              🗑️
            </button>
          </div>
        ))}
      </div>

      <Separator className="my-6" />

      {/* Payment Method Selection */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Payment Method</h3>
        <div className="flex space-x-4">
          <button
            onClick={() => setPaymentMethod('crypto')}
            className={`flex-1 p-3 border-2 rounded-lg transition-colors ${
              paymentMethod === 'crypto'
                ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <div className="text-center">
              <div className="text-2xl mb-1">💎</div>
              <div className="font-medium text-gray-900 dark:text-gray-100">Crypto</div>
              {isConnected && (
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  {formatAddress(address || '')}
                </div>
              )}
            </div>
          </button>
          <button
            onClick={() => setPaymentMethod('card')}
            className={`flex-1 p-3 border-2 rounded-lg transition-colors ${
              paymentMethod === 'card'
                ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <div className="text-center">
              <div className="text-2xl mb-1">💳</div>
              <div className="font-medium text-gray-900 dark:text-gray-100">Card</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Credit/Debit
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Order Summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Subtotal:</span>
            <span className="text-gray-900 dark:text-gray-100">{formatPrice(getTotalPrice())}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Shipping:</span>
            <span className="text-gray-900 dark:text-gray-100">Free</span>
          </div>
          <Separator />
          <div className="flex justify-between text-lg font-bold">
            <span className="text-gray-900 dark:text-gray-100">Total:</span>
            <span className="text-gray-900 dark:text-gray-100">{formatPrice(getTotalPrice())}</span>
          </div>
          {paymentMethod === 'crypto' && isConnected && (
            <div className="text-xs text-gray-600 dark:text-gray-400 mt-2">
              ≈ {getTotalCrypto('eth').toFixed(4)} ETH or {getTotalCrypto('usdc').toFixed(2)} USDC
            </div>
          )}
        </div>
      </div>

      {/* Checkout Button */}
      <Button
        onClick={handleCheckout}
        disabled={(!isConnected && paymentMethod === 'crypto') || isProcessing}
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 text-lg transition-all duration-300"
      >
        {isProcessing ? (
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            <span>Processing...</span>
          </div>
        ) : paymentMethod === 'crypto' && !isConnected ? (
          "🔗 Connect Wallet to Pay"
        ) : (
          `💫 Checkout ${formatPrice(getTotalPrice())}`
        )}
      </Button>
    </Card>
  );
}