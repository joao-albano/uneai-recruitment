
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/auth';

export type ProductType = 'retention' | 'billing' | 'recruitment';

export interface ProductSubscription {
  id: string;
  productType: ProductType;
  startDate: Date;
  status: 'active' | 'inactive' | 'pending';
}

export interface OrganizationProduct {
  id: string;
  productType: ProductType;
  isActive: boolean;
}

interface ProductContextType {
  currentProduct: ProductType | null;
  setCurrentProduct: (product: ProductType) => void;
  userSubscriptions: ProductSubscription[];
  subscribeToProduct: (productType: ProductType) => Promise<boolean>;
  availableProducts: ProductType[];
  hasAccessToProduct: (productType: ProductType) => boolean;
  organizations: any[]; // Para satisfazer o tipo
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentProduct, setCurrentProduct] = useState<ProductType | null>(null);
  const [userSubscriptions, setUserSubscriptions] = useState<ProductSubscription[]>([]);
  const { toast } = useToast();
  const { userEmail } = useAuth();
  
  // Lista de produtos disponíveis
  const availableProducts: ProductType[] = ['retention', 'billing', 'recruitment'];
  
  // Lista simulada de organizações para uso em componentes
  const organizations: any[] = [];
  
  const setProduct = (product: ProductType) => {
    setCurrentProduct(product);
  };
  
  const hasAccessToProduct = (productType: ProductType): boolean => {
    return userSubscriptions.some(sub => 
      sub.productType === productType && sub.status === 'active'
    );
  };
  
  const subscribeToProduct = async (productType: ProductType) => {
    try {
      // Simula uma chamada à API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Atualiza as assinaturas do usuário
      setUserSubscriptions(prev => [...prev, {
        id: uuidv4(),
        productType,
        startDate: new Date(),
        status: 'active'
      }]);
      
      // Mostra toast de sucesso
      toast({
        title: "Assinatura realizada com sucesso",
        description: "Você já pode começar a usar o produto.",
      });
      
      return true;
    } catch (error) {
      console.error('Erro ao assinar produto:', error);
      
      // Mostra toast de erro
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
    setCurrentProduct,
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

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProduct must be used within a ProductProvider');
  }
  return context;
};
