
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useAuth } from './AuthContext';

// Tipos de produtos disponíveis
export type ProductType = 'retention' | 'billing' | 'recruitment';

// Interface para definir as assinaturas de produtos
export interface ProductSubscription {
  id: string;
  productType: ProductType;
  organizationId: string;
  active: boolean;
  expiresAt: string | null;
  features: string[];
}

interface ProductContextType {
  currentProduct: ProductType;
  setCurrentProduct: (product: ProductType) => void;
  availableProducts: ProductType[];
  hasAccessToProduct: (product: ProductType) => boolean;
  userSubscriptions: ProductSubscription[];
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProduct must be used within a ProductProvider');
  }
  return context;
};

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  // Padrão para o produto de retenção de alunos
  const [currentProduct, setCurrentProduct] = useState<ProductType>('retention');
  const [userSubscriptions, setUserSubscriptions] = useState<ProductSubscription[]>([]);
  const { currentUser, isAdmin, isSuperAdmin } = useAuth();
  
  // Determina quais produtos o usuário tem acesso com base em suas assinaturas
  const availableProducts = React.useMemo(() => {
    // Se for super admin da UNE CX, tem acesso a todos os produtos
    if (isSuperAdmin) {
      return ['retention', 'billing', 'recruitment'] as ProductType[];
    }
    
    // Se for admin da escola, tem acesso aos produtos contratados pela escola
    if (isAdmin) {
      return userSubscriptions
        .filter(sub => sub.active && sub.organizationId === currentUser?.organizationId)
        .map(sub => sub.productType);
    }
    
    // Caso contrário, apenas os produtos com assinaturas ativas para sua organização
    return userSubscriptions
      .filter(sub => sub.active && sub.organizationId === currentUser?.organizationId)
      .map(sub => sub.productType);
  }, [isAdmin, isSuperAdmin, userSubscriptions, currentUser]);

  // Verifica se o usuário tem acesso a um produto específico
  const hasAccessToProduct = (product: ProductType): boolean => {
    if (isSuperAdmin) return true; // Super admin tem acesso a tudo
    return availableProducts.includes(product);
  };

  // Carrega as assinaturas do usuário (mockado para demonstração)
  useEffect(() => {
    if (currentUser) {
      // Aqui seria uma chamada API para buscar assinaturas do usuário/organização
      // Mockando dados para demonstração
      const mockSubscriptions: ProductSubscription[] = [
        {
          id: '1',
          productType: 'retention',
          organizationId: '1', // Escola de Letras
          active: true,
          expiresAt: null,
          features: ['basic', 'advanced']
        },
        {
          id: '2',
          productType: 'billing',
          organizationId: '1', // Escola de Letras
          active: true, // Agora todos têm acesso ao billing para demonstração
          expiresAt: null,
          features: ['basic']
        },
        {
          id: '3',
          productType: 'recruitment',
          organizationId: '1', // Escola de Letras
          active: false, // Este módulo não está ativo para Escola de Letras
          expiresAt: null,
          features: ['basic']
        },
        {
          id: '4',
          productType: 'retention',
          organizationId: '2', // Outra Escola
          active: true,
          expiresAt: null,
          features: ['basic']
        },
        {
          id: '5',
          productType: 'billing',
          organizationId: '2', // Outra Escola
          active: false, // Este módulo não está ativo para Outra Escola
          expiresAt: null,
          features: ['basic']
        }
      ];
      
      setUserSubscriptions(mockSubscriptions);
    } else {
      setUserSubscriptions([]);
    }
  }, [currentUser]);

  // Se o usuário tentar acessar um produto que não tem permissão, mudamos para o primeiro disponível
  useEffect(() => {
    if (!hasAccessToProduct(currentProduct) && availableProducts.length > 0) {
      setCurrentProduct(availableProducts[0]);
    }
  }, [currentProduct, availableProducts]);

  return (
    <ProductContext.Provider 
      value={{ 
        currentProduct, 
        setCurrentProduct, 
        availableProducts, 
        hasAccessToProduct,
        userSubscriptions
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
