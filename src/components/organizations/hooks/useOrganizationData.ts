
import { useCallback, useEffect } from 'react';
import { OrganizationType } from '../types';
import { toast } from "sonner";
import { fetchOrganizations } from '../api/organizationsApi';

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
        setOrganizations(orgsData);
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
