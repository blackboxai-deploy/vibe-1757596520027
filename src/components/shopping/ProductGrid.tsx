"use client";

import { useState, useMemo } from "react";
import { ProductCard } from "./ProductCard";
import { ProductDetail } from "./ProductDetail";
import { mockProducts } from "@/lib/mockData";

interface ProductGridProps {
  searchQuery: string;
  selectedCategory: string;
  onAddToCart: (product: any) => void;
  isConnected: boolean;
}

export function ProductGrid({ searchQuery, selectedCategory, onAddToCart, isConnected }: ProductGridProps) {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const filteredProducts = useMemo(() => {
    let filtered = mockProducts;

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [searchQuery, selectedCategory]);

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
          <div className="text-3xl">🛍️</div>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          No products found
        </h3>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
          {searchQuery 
            ? `No products match "${searchQuery}". Try searching for something else.`
            : `No products in the ${selectedCategory} category. Try selecting a different category.`
          }
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            onViewDetails={setSelectedProduct}
            isConnected={isConnected}
          />
        ))}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <ProductDetail
              product={selectedProduct}
              onClose={() => setSelectedProduct(null)}
              onAddToCart={onAddToCart}
              isConnected={isConnected}
            />
          </div>
        </div>
      )}
    </>
  );
}