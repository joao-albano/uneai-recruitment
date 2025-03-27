
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import { useProduct } from '@/context/ProductContext';
import ProductHeader from './ProductHeader';
import ProductsGrid from './ProductsGrid';
import AdminSection from './AdminSection';
import { getProducts } from './productData';
import { Skeleton } from '@/components/ui/skeleton';

const ProductHub: React.FC = () => {
  const navigate = useNavigate();
  const { isAdmin, isSuperAdmin } = useAuth();
  const { subscribeToProduct, hasAccessToProduct } = useProduct();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const productsData = await getProducts();
        setProducts(productsData);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadProducts();
  }, []);
  
  const handleSubscribe = async (productType: string) => {
    // Cast the string to ProductType where needed
    const success = await subscribeToProduct(productType as any);
    if (success) {
      navigateToProduct(productType);
    }
  };
  
  const navigateToProduct = (productType: string) => {
    // Redirect based on the product
    if (productType === 'retention') {
      navigate('/dashboard');
    } else if (productType === 'billing') {
      navigate('/billing');
    } else if (productType === 'sales') {
      navigate('/sales');
    } else if (productType === 'recruitment') {
      navigate('/recruitment');
    } else if (productType === 'scheduling') {
      navigate('/schedule');
    } else if (productType === 'secretary') {
      navigate('/secretary');
    } else if (productType === 'pedagogical') {
      navigate('/pedagogical');
    }
  };
  
  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <ProductHeader />
        <div className="grid gap-8 md:grid-cols-3 sm:grid-cols-2 mt-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-64 w-full rounded-lg" />
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-8">
      <ProductHeader />
      <ProductsGrid 
        products={products} 
        onNavigateToProduct={navigateToProduct} 
        onSubscribeToProduct={handleSubscribe}
      />
      {isSuperAdmin && (
        <AdminSection isAdmin={isAdmin} isSuperAdmin={isSuperAdmin} />
      )}
    </div>
  );
};

export default ProductHub;
