
import React from 'react';
import ProductCard from './ProductCard';
import { ProductType } from '@/context/ProductContext';

export interface ProductInfo {
  id: string;  // Changed from ProductType to string to be more flexible
  title: string;
  description: string;
  icon: React.ReactNode;
  iconColor: string;
  isActive: boolean;
  segments: string[];
}

interface ProductsGridProps {
  products: ProductInfo[];
  onNavigateToProduct: (productType: string) => void;  // Updated to match id type
}

const ProductsGrid: React.FC<ProductsGridProps> = ({ products, onNavigateToProduct }) => {
  return (
    <div className="grid gap-8 md:grid-cols-3 sm:grid-cols-2">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          title={product.title}
          description={product.description}
          icon={product.icon}
          iconColor={product.iconColor}
          isActive={product.isActive}
          onNavigate={onNavigateToProduct}
        />
      ))}
    </div>
  );
};

export default ProductsGrid;
