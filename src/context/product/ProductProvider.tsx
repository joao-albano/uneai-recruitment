
import React, { createContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ProductType, ProductContextType, ProductSubscription } from './types';
import { determineProductFromPath } from './productUtils';

// Context creation
export const ProductContext = createContext<ProductContextType | null>(null);

interface ProductProviderProps {
  children: React.ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const [currentProduct, setCurrentProduct] = useState<ProductType | null>(null);
  const [availableProducts, setAvailableProducts] = useState<ProductType[]>([
    'retention',
    'recruitment'
  ]);
  const [userSubscriptions, setUserSubscriptions] = useState<ProductSubscription[]>([
    {
      productId: 'retention',
      status: 'active',
      expiresAt: null
    },
    {
      productId: 'recruitment',
      status: 'active',
      expiresAt: null
    }
  ]);
  
  const location = useLocation();
  
  // Update current product based on URL path
  useEffect(() => {
    const productFromPath = determineProductFromPath(location.pathname);
    if (productFromPath && productFromPath !== currentProduct) {
      setCurrentProduct(productFromPath);
    }
  }, [location.pathname, currentProduct]);

  // Mock subscription function - in a real app, this would call an API
  const subscribeToProduct = async (product: ProductType): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Add to available products if not already there
    if (!availableProducts.includes(product)) {
      setAvailableProducts(prev => [...prev, product]);
      
      // Add to user subscriptions
      setUserSubscriptions(prev => [
        ...prev,
        {
          productId: product,
          status: 'active',
          expiresAt: null
        }
      ]);
    }
    
    return true;
  };
  
  // Check if user has access to a product
  const hasAccessToProduct = (product: ProductType): boolean => {
    return availableProducts.includes(product);
  };
  
  const contextValue: ProductContextType = {
    currentProduct,
    setCurrentProduct,
    availableProducts,
    subscribeToProduct,
    hasAccessToProduct,
    userSubscriptions
  };
  
  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
};
