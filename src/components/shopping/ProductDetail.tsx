"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

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

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  isConnected: boolean;
}

export function ProductDetail({ product, onClose, onAddToCart, isConnected }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("default");
  const [selectedSize, setSelectedSize] = useState("M");

  const images = [
    product.image,
    `${product.image}?variant=2`,
    `${product.image}?variant=3`,
  ];

  const colors = ["default", "blue", "red", "green", "black"];
  const sizes = ["XS", "S", "M", "L", "XL"];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const handleAddToCart = () => {
    const productWithOptions = {
      ...product,
      selectedColor,
      selectedSize,
      quantity
    };
    onAddToCart(productWithOptions);
    onClose();
  };

  return (
    <Card className="bg-white dark:bg-gray-800 p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Product Details
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Images */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700">
            <img
              src={images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://placehold.co/500x500?text=Product+Detail";
              }}
            />
          </div>
          
          {/* Thumbnail Gallery */}
          <div className="flex space-x-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                  selectedImage === index
                    ? 'border-purple-500'
                    : 'border-gray-200 dark:border-gray-600'
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://placehold.co/80x80?text=Thumb";
                  }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Title & Category */}
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Badge className="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300">
                {product.category}
              </Badge>
              {product.isNFT && (
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                  🎨 NFT
                </Badge>
              )}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              {product.name}
            </h1>
            {product.seller && (
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                by <span className="font-medium">{product.seller}</span>
              </p>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-lg ${
                    i < Math.floor(product.rating) 
                      ? 'text-yellow-400' 
                      : 'text-gray-300 dark:text-gray-600'
                  }`}
                >
                  ⭐
                </span>
              ))}
            </div>
            <span className="text-gray-600 dark:text-gray-400">
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="space-y-2">
            <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              {formatPrice(product.price * quantity)}
            </div>
            {product.cryptoPrice && isConnected && (
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></div>
                  <span className="text-gray-600 dark:text-gray-400">
                    {(parseFloat(product.cryptoPrice.eth) * quantity).toFixed(4)} ETH
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"></div>
                  <span className="text-gray-600 dark:text-gray-400">
                    {(parseFloat(product.cryptoPrice.usdc) * quantity).toFixed(2)} USDC
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Description</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {product.description}
            </p>
          </div>

          <Separator />

          {/* Options */}
          {!product.isNFT && (
            <div className="space-y-4">
              {/* Color Selection */}
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Color</h3>
                <div className="flex space-x-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border-2 transition-colors ${
                        selectedColor === color
                          ? 'border-purple-500'
                          : 'border-gray-300 dark:border-gray-600'
                      } ${
                        color === 'default' ? 'bg-gray-200 dark:bg-gray-600' :
                        color === 'blue' ? 'bg-blue-500' :
                        color === 'red' ? 'bg-red-500' :
                        color === 'green' ? 'bg-green-500' :
                        'bg-black'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              {product.category === 'fashion' && (
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Size</h3>
                  <div className="flex space-x-2">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-3 py-1 border rounded-md transition-colors ${
                          selectedSize === size
                            ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400'
                            : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Quantity</h3>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center justify-center transition-colors"
                  >
                    -
                  </button>
                  <span className="text-xl font-semibold text-gray-900 dark:text-gray-100 min-w-[2rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center justify-center transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex space-x-4 pt-4">
            <Button
              onClick={handleAddToCart}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 text-lg transition-all duration-300"
              disabled={!isConnected && product.isNFT}
            >
              {product.isNFT ? (
                isConnected ? "🎨 Buy NFT" : "🔗 Connect Wallet First"
              ) : (
                "🛒 Add to Cart"
              )}
            </Button>
            <Button
              variant="outline"
              className="border-purple-200 dark:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/20 py-3 px-6"
            >
              ❤️
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}