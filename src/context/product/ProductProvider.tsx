
import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/auth';
import { ProductType, ProductSubscription, ProductContextType } from './types';
import { fetchUserProducts, createMockSubscription } from './productUtils';

// Create the context
export const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentProduct, setCurrentProduct] = useState<ProductType | null>(null);
  const [userSubscriptions, setUserSubscriptions] = useState<ProductSubscription[]>([]);
  const [availableProducts, setAvailableProducts] = useState<ProductType[]>([]);
  const { toast } = useToast();
  const { userEmail, currentUser, isSuperAdmin } = useAuth();
  
  // Simulated list of organizations for use in components
  const organizations: any[] = [];
  
  // Load available products for the current user
  useEffect(() => {
    const loadUserProducts = async () => {
      if (!currentUser?.id) return;
      
      try {
        const { subscriptions, availableProducts } = await fetchUserProducts(
          currentUser.id, 
          Boolean(isSuperAdmin)
        );
        
        setUserSubscriptions(subscriptions);
        setAvailableProducts(availableProducts);
      } catch (error) {
        console.error('Error loading user products:', error);
      }
    };
    
    loadUserProducts();
  }, [currentUser, isSuperAdmin]);
  
  const setProduct = (product: ProductType) => {
    setCurrentProduct(product);
  };
  
  const hasAccessToProduct = (productType: ProductType): boolean => {
    // Super admins have access to everything
    if (isSuperAdmin) return true;
    
    return userSubscriptions.some(sub => 
      sub.productType === productType && (sub.status === 'active' || sub.status === 'trial')
    );
  };
  
  const subscribeToProduct = async (productType: ProductType) => {
    try {
      // Simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update the user's subscriptions
      const newSubscription = createMockSubscription(productType);
      setUserSubscriptions(prev => [...prev, newSubscription]);
      
      // Show success toast
      toast({
        title: "Assinatura realizada com sucesso",
        description: "Você já pode começar a usar o produto.",
      });
      
      return true;
    } catch (error) {
      console.error('Erro ao assinar produto:', error);
      
      // Show error toast
      toast({
        title: "Erro ao realizar assinatura",
        description: "Por favor, tente novamente mais tarde.",
        variant: "destructive",
      });
      
      return false;
    }
  };
  
  const value: ProductContextType = {
    currentProduct,
    setCurrentProduct: setProduct,
    userSubscriptions,
    subscribeToProduct,
    availableProducts,
    hasAccessToProduct,
    organizations
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};
