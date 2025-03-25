
import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { useAuth } from '@/context/auth';
import { fetchOrganizations } from '../api';
import { OrganizationType, OrganizationProduct } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { ProductType } from '@/context/ProductContext';

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
      
      // Se não houver dados, mostrar toast apenas em produção
      if (!data || data.length === 0) {
        console.log('Nenhuma organização encontrada');
        if (process.env.NODE_ENV === 'production') {
          toast.warning('Nenhuma organização encontrada');
        }
      }
      
      // Mapear os dados para o formato esperado com type assertion para ProductType
      const formattedOrganizations: OrganizationType[] = data.map(org => ({
        id: org.id,
        name: org.name,
        isActive: true, // Assumindo que todas as orgs estão ativas
        isMainOrg: org.isMainOrg,
        createdAt: org.createdAt,
        updatedAt: org.updatedAt,
        products: org.products ? org.products.map(p => ({
          // Convert string type to ProductType to ensure type safety
          type: p.type as ProductType,
          active: p.active || false
        })) : []
      }));
      
      setOrganizations(formattedOrganizations);
    } catch (error) {
      console.error('Erro ao carregar organizações:', error);
      toast.error('Erro ao carregar organizações');
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
