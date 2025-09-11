"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ProductGrid } from "@/components/shopping/ProductGrid";
import { ShoppingCart } from "@/components/shopping/ShoppingCart";
import { WalletConnect } from "@/components/web3/WalletConnect";
import { useWeb3 } from "@/hooks/useWeb3";

export default function ShoppingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showCart, setShowCart] = useState(false);
  const [showWallet, setShowWallet] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);
  
  const { isConnected, formatAddress, address } = useWeb3();

  const categories = [
    { id: "all", name: "All Products", emoji: "🛍️" },
    { id: "electronics", name: "Electronics", emoji: "📱" },
    { id: "fashion", name: "Fashion", emoji: "👕" },
    { id: "nft", name: "NFTs", emoji: "🎨" },
    { id: "gaming", name: "Gaming", emoji: "🎮" },
    { id: "collectibles", name: "Collectibles", emoji: "💎" }
  ];

  const addToCart = (product: any) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-900 dark:via-purple-900 dark:to-pink-900">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
                🛍️ Crypto Shopping
              </h1>
              
              {isConnected && (
                <Badge className="bg-gradient-to-r from-green-400 to-green-600 text-white">
                  {formatAddress(address || '')}
                </Badge>
              )}
            </div>

            <div className="flex items-center space-x-3">
              {/* Search */}
              <div className="hidden md:block relative">
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-64 pl-10 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400">
                  🔍
                </div>
              </div>

              {/* Wallet */}
              <Button
                onClick={() => setShowWallet(true)}
                variant={isConnected ? "outline" : "default"}
                className={isConnected 
                  ? "border-green-200 dark:border-green-700 hover:bg-green-50 dark:hover:bg-green-900/20" 
                  : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                }
              >
                {isConnected ? "💎 Connected" : "🔗 Connect Wallet"}
              </Button>

              {/* Cart */}
              <Button
                onClick={() => setShowCart(true)}
                variant="outline"
                className="relative border-purple-200 dark:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/20"
              >
                🛒 Cart
                {getTotalItems() > 0 && (
                  <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs flex items-center justify-center">
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden mt-4">
            <div className="relative">
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-10 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400">
                🔍
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="mt-4 flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                className={
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                    : "border-purple-200 dark:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                }
              >
                {category.emoji} {category.name}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <ProductGrid
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          onAddToCart={addToCart}
          isConnected={isConnected}
        />
      </div>

      {/* Shopping Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl">
            <ShoppingCart
              items={cartItems}
              onClose={() => setShowCart(false)}
              onUpdateQuantity={updateQuantity}
              onRemoveItem={removeFromCart}
              isConnected={isConnected}
            />
          </div>
        </div>
      )}

      {/* Wallet Modal */}
      {showWallet && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            <WalletConnect onClose={() => setShowWallet(false)} />
          </div>
        </div>
      )}
    </div>
  );
}