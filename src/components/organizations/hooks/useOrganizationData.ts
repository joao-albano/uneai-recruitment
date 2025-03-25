
import { useCallback, useEffect } from 'react';
import { OrganizationType, OrganizationProduct } from '../types';
import { toast } from "sonner";
import { fetchOrganizations } from '../api';
import { ProductType } from '@/context/ProductContext';

export const useOrganizationData = (
  setOrganizations: React.Dispatch<React.SetStateAction<OrganizationType[]>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const loadOrganizations = useCallback(async () => {
    try {
      setIsLoading(true);
      console.log('Carregando organizações...');
      
      // Buscar organizações do Supabase
      const orgsData = await fetchOrganizations();
      
      if (Array.isArray(orgsData)) {
        console.log('Organizações carregadas com sucesso:', orgsData);
        
        // Transformar os dados do formato Supabase para o formato esperado por OrganizationType
        const formattedOrgs: OrganizationType[] = orgsData.map(org => ({
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
      toast.error("Erro ao carregar organizações");
      setOrganizations([]);
    } finally {
      setIsLoading(false);
    }
  }, [setOrganizations, setIsLoading]);

  return { loadOrganizations };
};
