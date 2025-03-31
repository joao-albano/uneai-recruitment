
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
    switch (productType) {
      case 'retention':
        navigate('/dashboard');
        break;
      case 'billing':
        navigate('/billing');
        break;
      case 'sales':
        navigate('/sales');
        break;
      case 'recruitment':
        navigate('/recruitment');
        break;
      case 'scheduling':
        navigate('/schedule');
        break;
      case 'secretary':
        navigate('/secretary');
        break;
      case 'emotional':
        navigate('/emotional');
        break;
      default:
        // Default fallback route if product type doesn't match
        navigate('/dashboard');
        break;
    }
  };
  
  if (loading) {
    return (
      <div className="container max-w-screen-lg mx-auto py-12 px-4">
        <div className="flex flex-col items-center mb-12">
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <Skeleton key={i} className="h-64 w-full rounded-xl" />
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div className="container max-w-screen-lg mx-auto py-12 px-4">
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
