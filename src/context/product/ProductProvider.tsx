
import React, { createContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ProductType, ProductContextType, ProductSubscription } from './types';
import { determineProductFromPath } from './productUtils';

// Context creation
export const ProductContext = createContext<ProductContextType | null>(null);

interface ProductProviderProps {
  children: React.ReactNode;
  initialProduct?: ProductType | null;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({ children, initialProduct = null }) => {
  const [currentProduct, setCurrentProduct] = useState<ProductType | null>(initialProduct);
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
  
  // Try to use location only if we're inside a Router context
  let location;
  try {
    location = useLocation();
  } catch (error) {
    // If useLocation throws, we're not inside a Router
    console.log('ProductProvider used outside Router context, path-based product updates disabled');
  }
  
  // Update current product based on URL path when location changes
  useEffect(() => {
    if (location) {
      const productFromPath = determineProductFromPath(location.pathname);
      console.log('ProductProvider - path:', location.pathname, 'product:', productFromPath);
      if (productFromPath && productFromPath !== currentProduct) {
        console.log('ProductProvider - setting product:', productFromPath);
        setCurrentProduct(productFromPath);
      }
    }
  }, [location, currentProduct]);

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
