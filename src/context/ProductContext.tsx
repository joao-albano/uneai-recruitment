
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';

export type ProductType = 'retention' | 'sales' | 'scheduling' | 'recruitment' | 'secretary' | 'pedagogical';

export interface ProductSubscription {
  id: string;
  productType: ProductType;
  startDate: Date;
  status: 'active' | 'inactive' | 'pending' | 'trial';
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
  const [availableProducts, setAvailableProducts] = useState<ProductType[]>([]);
  const { toast } = useToast();
  const { userEmail, currentUser, isSuperAdmin } = useAuth();
  
  // Lista simulada de organizações para uso em componentes
  const organizations: any[] = [];
  
  // Carregar produtos disponíveis para o usuário atual
  useEffect(() => {
    const fetchUserProducts = async () => {
      if (!currentUser?.id) return;
      
      try {
        if (currentUser?.isSuperAdmin) {
          // Super admins têm acesso a todos os produtos
          const allProductTypes: ProductType[] = [
            'retention', 
            'sales', 
            'scheduling', 
            'recruitment', 
            'secretary', 
            'pedagogical'
          ];
          
          setAvailableProducts(allProductTypes);
          
          // Criar assinaturas simuladas para todos os produtos
          const subscriptions: ProductSubscription[] = allProductTypes.map(type => ({
            id: uuidv4(),
            productType: type,
            startDate: new Date(),
            status: 'active'
          }));
          
          setUserSubscriptions(subscriptions);
        } else {
          // Usuários normais só têm acesso aos produtos atribuídos
          const { data: subscriptions, error } = await supabase
            .from('subscriptions')
            .select('id, product_type, status, trial_start_date, trial_end_date')
            .eq('user_id', currentUser.id);
          
          if (error) {
            console.error('Erro ao buscar assinaturas:', error);
            return;
          }
          
          if (subscriptions && subscriptions.length > 0) {
            // Check if trial is expired for each subscription
            const now = new Date();
            
            const productSubscriptions: ProductSubscription[] = subscriptions.map(sub => {
              let status = sub.status;
              
              // If trial, check if expired
              if (status === 'trial' && sub.trial_end_date) {
                const trialEndDate = new Date(sub.trial_end_date);
                if (now > trialEndDate) {
                  status = 'inactive'; // Trial expired
                }
              }
              
              return {
                id: sub.id,
                productType: sub.product_type as ProductType,
                startDate: sub.trial_start_date ? new Date(sub.trial_start_date) : new Date(),
                status: status as 'active' | 'inactive' | 'pending' | 'trial'
              };
            });
            
            setUserSubscriptions(productSubscriptions);
            
            // Set available products based on active or trial subscriptions
            const productTypes = productSubscriptions
              .filter(sub => sub.status === 'active' || sub.status === 'trial')
              .map(sub => sub.productType);
            
            setAvailableProducts(productTypes);
          }
        }
      } catch (error) {
        console.error('Erro ao buscar produtos do usuário:', error);
      }
    };
    
    fetchUserProducts();
  }, [currentUser]);
  
  const setProduct = (product: ProductType) => {
    setCurrentProduct(product);
  };
  
  const hasAccessToProduct = (productType: ProductType): boolean => {
    // Super admins têm acesso a tudo
    if (isSuperAdmin) return true;
    
    return userSubscriptions.some(sub => 
      sub.productType === productType && (sub.status === 'active' || sub.status === 'trial')
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
        status: 'trial'
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

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProduct must be used within a ProductProvider');
  }
  return context;
};
