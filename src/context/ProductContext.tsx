
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { OrganizationType } from '@/components/organizations/types';

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
  organizations: OrganizationType[];
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
  const [organizations, setOrganizations] = useState<OrganizationType[]>([]);
  const { currentUser, isAdmin, isSuperAdmin } = useAuth();
  
  // Carrega as organizações (mockado para demonstração)
  useEffect(() => {
    const mockOrganizations: OrganizationType[] = [
      {
        id: '0',
        name: 'UNE CX',
        isActive: true,
        isMainOrg: true,
        createdAt: '2023-01-01',
        products: [
          { type: 'retention', active: true },
          { type: 'billing', active: true },
          { type: 'recruitment', active: true }
        ]
      },
      {
        id: '1',
        name: 'Escola de Letras',
        isActive: true,
        isMainOrg: false,
        createdAt: '2023-02-15',
        products: [
          { type: 'retention', active: true },
          { type: 'billing', active: true },
          { type: 'recruitment', active: false }
        ]
      },
      {
        id: '2',
        name: 'Outra Escola',
        isActive: true,
        isMainOrg: false,
        createdAt: '2023-03-20',
        products: [
          { type: 'retention', active: true },
          { type: 'billing', active: false },
          { type: 'recruitment', active: false }
        ]
      }
    ];
    
    setOrganizations(mockOrganizations);
  }, []);
  
  // Determina quais produtos o usuário tem acesso com base em suas assinaturas
  const availableProducts = React.useMemo(() => {
    // Se for super admin da UNE CX, tem acesso a todos os produtos
    if (isSuperAdmin) {
      return ['retention', 'billing', 'recruitment'] as ProductType[];
    }
    
    // Se não tiver usuário logado ou organização, retorna vazio
    if (!currentUser?.organizationId) {
      return [];
    }
    
    // Encontra a organização do usuário
    const userOrg = organizations.find(org => org.id === currentUser.organizationId);
    
    if (!userOrg) {
      return [];
    }
    
    // Retorna produtos ativos para a organização do usuário
    return (userOrg.products || [])
      .filter(product => product.active)
      .map(product => product.type);
  }, [isAdmin, isSuperAdmin, organizations, currentUser]);

  // Verifica se o usuário tem acesso a um produto específico
  const hasAccessToProduct = (product: ProductType): boolean => {
    if (isSuperAdmin) return true; // Super admin tem acesso a tudo
    return availableProducts.includes(product);
  };

  // Carrega as assinaturas do usuário com base nas organizações
  useEffect(() => {
    if (currentUser && organizations.length > 0) {
      // Converte os produtos das organizações em assinaturas
      const subs: ProductSubscription[] = [];
      
      organizations.forEach(org => {
        (org.products || []).forEach(product => {
          subs.push({
            id: `${org.id}-${product.type}`,
            productType: product.type,
            organizationId: org.id,
            active: product.active,
            expiresAt: null,
            features: ['basic']
          });
        });
      });
      
      setUserSubscriptions(subs);
    } else {
      setUserSubscriptions([]);
    }
  }, [currentUser, organizations]);

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
        userSubscriptions,
        organizations
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
