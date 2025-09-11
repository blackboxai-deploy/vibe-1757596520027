"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  cryptoPrice?: {
    eth: string;
    usdc: string;
  };
  rating: number;
  reviews: number;
  isNFT?: boolean;
  seller?: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
  isConnected: boolean;
}

export function ProductCard({ product, onAddToCart, onViewDetails, isConnected }: ProductCardProps) {
  const categoryEmojis: { [key: string]: string } = {
    electronics: "📱",
    fashion: "👕",
    nft: "🎨",
    gaming: "🎮",
    collectibles: "💎",
    default: "🛍️"
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <Card className="group overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://placehold.co/300x300?text=Product+Image";
          }}
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <Badge className="bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300 backdrop-blur-sm">
            {categoryEmojis[product.category] || categoryEmojis.default} {product.category}
          </Badge>
          {product.isNFT && (
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              🎨 NFT
            </Badge>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(product);
            }}
            size="sm"
            variant="outline"
            className="bg-white/90 dark:bg-gray-800/90 border-gray-200 dark:border-gray-600 hover:bg-white dark:hover:bg-gray-800 backdrop-blur-sm"
          >
            👁️
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        {/* Title & Rating */}
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 line-clamp-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center space-x-2 mt-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-sm ${
                    i < Math.floor(product.rating) 
                      ? 'text-yellow-400' 
                      : 'text-gray-300 dark:text-gray-600'
                  }`}
                >
                  ⭐
                </span>
              ))}
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              ({product.reviews})
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {product.description}
        </p>

        {/* Price */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
              {formatPrice(product.price)}
            </span>
            {product.seller && (
              <span className="text-xs text-gray-500">
                by {product.seller}
              </span>
            )}
          </div>
          
          {/* Crypto Prices */}
          {product.cryptoPrice && isConnected && (
            <div className="flex items-center space-x-3 text-xs text-gray-600 dark:text-gray-400">
              <span className="flex items-center space-x-1">
                <span className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></span>
                <span>{product.cryptoPrice.eth} ETH</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-3 h-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"></span>
                <span>{product.cryptoPrice.usdc} USDC</span>
              </span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex space-x-2 pt-2">
          <Button
            onClick={() => onAddToCart(product)}
            className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white transition-all duration-300"
            disabled={!isConnected && product.isNFT}
          >
            {product.isNFT ? (
              isConnected ? "🎨 Buy NFT" : "🔗 Connect Wallet"
            ) : (
              "🛒 Add to Cart"
            )}
          </Button>
          <Button
            onClick={() => onViewDetails(product)}
            variant="outline"
            className="border-purple-200 dark:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/20"
          >
            📖
          </Button>
        </div>
      </div>
    </Card>
  );
}