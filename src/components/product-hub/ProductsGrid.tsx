
import React from 'react';
import ProductCard from './ProductCard';
import { ProductType } from '@/context/ProductContext';

export interface ProductInfo {
  id: ProductType;
  title: string;
  description: string;
  icon: React.ReactNode;
  iconColor: string;
  isActive: boolean;
}

interface ProductsGridProps {
  products: ProductInfo[];
  onNavigateToProduct: (productType: ProductType) => void;
}

const ProductsGrid: React.FC<ProductsGridProps> = ({ products, onNavigateToProduct }) => {
  return (
    <div className="grid gap-6 md:grid-cols-3">
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
