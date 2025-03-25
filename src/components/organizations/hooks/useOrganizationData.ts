
import { useCallback } from 'react';
import { OrganizationType } from '../types';
import { toast } from "sonner";
import { fetchOrganizations } from '../api';
import { ProductType } from '@/context/ProductContext';
import { useAuth } from '@/context/auth';

export const useOrganizationData = (
  setOrganizations: React.Dispatch<React.SetStateAction<OrganizationType[]>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const { isAdmin, isSuperAdmin, currentUser } = useAuth();

  const loadOrganizations = useCallback(async () => {
    try {
      setIsLoading(true);
      console.log('Carregando organizações...', { isAdmin, isSuperAdmin, currentUser });
      
      // Verificar permissões - apenas admins e super admins podem ver organizações
      if (!isAdmin && !isSuperAdmin) {
        console.log('Usuário sem permissão para ver organizações');
        setOrganizations([]);
        setIsLoading(false);
        return;
      }
      
      // Buscar organizações do Supabase
      const orgsData = await fetchOrganizations(currentUser);
      
      if (Array.isArray(orgsData)) {
        console.log('Organizações carregadas com sucesso:', orgsData);
        
        // Transformar os dados do formato Supabase para o formato esperado por OrganizationType
        const formattedOrgs: OrganizationType[] = orgsData.map(org => {
          return {
            id: org.id,
            name: org.name,
            // Since is_active doesn't exist in the database, default to true
            isActive: true,
            isMainOrg: org.is_main_org || false,
            createdAt: org.created_at,
            products: org.products ? org.products.map(p => ({
              type: p.type as ProductType,
              active: p.active
            })) : []
          };
        });
        
        console.log('Organizações formatadas:', formattedOrgs);
        setOrganizations(formattedOrgs);
      } else {
        console.warn('Resposta não esperada ao buscar organizações:', orgsData);
        setOrganizations([]);
        toast.error("Formato de resposta inesperado ao buscar organizações");
      }
    } catch (error) {
      console.error("Erro ao carregar organizações:", error);
      toast.error("Erro ao carregar organizações. Tente novamente mais tarde.");
      setOrganizations([]);
    } finally {
      setIsLoading(false);
    }
  }, [setOrganizations, setIsLoading, isAdmin, isSuperAdmin, currentUser]);

  return { loadOrganizations };
};
