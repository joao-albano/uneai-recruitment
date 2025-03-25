
import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { useAuth } from '@/context/auth';
import { fetchOrganizations } from '../api';
import { OrganizationType, OrganizationProduct } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { ProductType } from '@/context/ProductContext';

// Dados fictícios para testes quando a API falha
const getMockOrganizations = (): OrganizationType[] => [
  {
    id: uuidv4(),
    name: 'Escola Alpha',
    isActive: true,
    isMainOrg: true,
    createdAt: new Date().toISOString(),
    products: [
      { type: 'retention' as ProductType, active: true },
      { type: 'billing' as ProductType, active: true },
    ],
  },
  {
    id: uuidv4(),
    name: 'Escola Beta',
    isActive: true,
    createdAt: new Date().toISOString(),
    products: [
      { type: 'retention' as ProductType, active: true },
      { type: 'recruitment' as ProductType, active: true },
    ],
  },
  {
    id: uuidv4(),
    name: 'Escola Gamma',
    isActive: true,
    createdAt: new Date().toISOString(),
    products: [
      { type: 'pedagogical' as ProductType, active: true },
    ],
  },
];

export const useOrganizationData = () => {
  const { currentUser, isSuperAdmin, isAdmin } = useAuth();
  const [organizations, setOrganizations] = useState<OrganizationType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadOrganizations = useCallback(async () => {
    console.log('Carregando organizações...', { isAdmin, isSuperAdmin, currentUser, currentUserId: currentUser?.id, organizationId: currentUser?.organizationId });
    
    // Verificar se o usuário tem permissão para ver organizações
    if (!isAdmin && !isSuperAdmin) {
      console.log('Usuário sem permissão para ver organizações');
      return;
    }

    setIsLoading(true);
    
    try {
      // Buscar organizações da API
      const data = await fetchOrganizations(currentUser);
      
      // Mapear os dados para o formato esperado
      const formattedOrganizations: OrganizationType[] = data.map(org => ({
        id: org.id,
        name: org.name,
        isActive: true, // Assumindo que todas as orgs estão ativas
        isMainOrg: org.is_main_org,
        createdAt: org.created_at,
        updatedAt: org.updated_at,
        products: org.products ? org.products.map(p => ({
          // Convert string type to ProductType to ensure type safety
          type: p.type as ProductType,
          active: p.active || false
        })) : []
      }));
      
      setOrganizations(formattedOrganizations);
    } catch (error) {
      console.error('Erro ao carregar organizações da API:', error);
      
      if (process.env.NODE_ENV === 'development') {
        // Em desenvolvimento, carregar dados fictícios para permitir teste da interface
        console.log('Carregando dados fictícios para teste devido ao erro');
        const mockData = getMockOrganizations();
        setOrganizations(mockData);
      } else {
        // Em produção, mostrar erro
        toast.error('Erro ao carregar organizações');
      }
    } finally {
      setIsLoading(false);
    }
  }, [currentUser, isAdmin, isSuperAdmin]);

  return {
    organizations,
    isLoading,
    loadOrganizations
  };
};
