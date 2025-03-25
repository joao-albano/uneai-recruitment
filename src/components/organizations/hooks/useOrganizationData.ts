
import { useCallback, useEffect } from 'react';
import { OrganizationType, OrganizationProduct } from '../types';
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
      console.log('Carregando organizações...');
      
      // Verificar permissões - apenas admins e super admins podem ver organizações
      if (!isAdmin && !isSuperAdmin) {
        console.log('Usuário sem permissão para ver organizações');
        setOrganizations([]);
        toast.error("Você não tem permissão para visualizar organizações");
        return;
      }
      
      // Buscar organizações do Supabase
      const orgsData = await fetchOrganizations();
      
      if (Array.isArray(orgsData)) {
        console.log('Organizações carregadas com sucesso:', orgsData);
        
        // Filtrar organizações conforme o perfil do usuário
        let filteredOrgs = orgsData;
        
        // Se for admin (não super admin), filtrar apenas a organização do usuário
        if (isAdmin && !isSuperAdmin && currentUser?.organizationId) {
          filteredOrgs = orgsData.filter(org => org.id === currentUser.organizationId);
          console.log('Filtrando apenas a organização do usuário:', filteredOrgs);
        }
        
        // Transformar os dados do formato Supabase para o formato esperado por OrganizationType
        const formattedOrgs: OrganizationType[] = filteredOrgs.map(org => ({
          id: org.id,
          name: org.name,
          isActive: true, // Valor padrão, ajustar conforme necessário
          isMainOrg: org.is_main_org || false,
          createdAt: org.created_at,
          products: org.products ? org.products.map(p => ({
            type: p.type as ProductType,
            active: p.active
          })) : []
        }));
        
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
