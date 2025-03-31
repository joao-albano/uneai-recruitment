
import React from 'react';
import ProductCard from './ProductCard';
import { ProductType } from '@/context/ProductContext';

export interface ProductInfo {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  iconColor: string;
  isActive: boolean;
  segments: string[];
}

interface ProductsGridProps {
  products: ProductInfo[];
  onNavigateToProduct: (productType: string) => void;
  onSubscribeToProduct: (productType: string) => void;
}

const ProductsGrid: React.FC<ProductsGridProps> = ({ 
  products, 
  onNavigateToProduct,
  onSubscribeToProduct
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          onSubscribe={onSubscribeToProduct}
        />
      ))}
    </div>
  );
};

export default ProductsGrid;
