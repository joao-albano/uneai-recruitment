
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import { useProduct, ProductType } from '@/context/ProductContext';
import ProductHeader from './ProductHeader';
import ProductsGrid from './ProductsGrid';
import AdminSection from './AdminSection';
import { getProducts } from './productData';

const ProductHub: React.FC = () => {
  const navigate = useNavigate();
  const { isAdmin, isSuperAdmin } = useAuth();
  const { subscribeToProduct, hasAccessToProduct } = useProduct();
  
  const handleSubscribe = async (productType: ProductType) => {
    const success = await subscribeToProduct(productType);
    if (success) {
      navigateToProduct(productType);
    }
  };
  
  const navigateToProduct = (productType: ProductType) => {
    // Redirecionar conforme o produto
    if (productType === 'retention') {
      navigate('/dashboard');
    } else if (productType === 'billing') {
      navigate('/billing');
    } else if (productType === 'recruitment') {
      navigate('/recruitment');
    }
  };
  
  // Get product data
  const products = getProducts();
  
  return (
    <div className="container mx-auto py-8">
      <ProductHeader />
      <ProductsGrid 
        products={products} 
        onNavigateToProduct={navigateToProduct} 
      />
      <AdminSection isAdmin={isAdmin} isSuperAdmin={isSuperAdmin} />
    </div>
  );
};

export default ProductHub;
