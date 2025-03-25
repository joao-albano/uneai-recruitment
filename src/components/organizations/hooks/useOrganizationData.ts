
import { useCallback } from 'react';
import { OrganizationType } from '../types';
import { toast } from "sonner";
import { fetchOrganizations } from '../api';
import { ProductType } from '@/context/ProductContext';
import { useAuth } from '@/context/auth';

// Dados fictícios para teste - só serão usados em caso de erro ou para testes
const mockOrganizations: OrganizationType[] = [
  {
    id: "1",
    name: "UNE CX",
    isActive: true,
    isMainOrg: true,
    createdAt: new Date().toISOString(),
    products: [
      { type: 'retention' as ProductType, active: true },
      { type: 'billing' as ProductType, active: true },
      { type: 'recruitment' as ProductType, active: true }
    ]
  },
  {
    id: "2",
    name: "Escola Brasil",
    isActive: true,
    isMainOrg: false,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    products: [
      { type: 'retention' as ProductType, active: true },
      { type: 'billing' as ProductType, active: false }
    ]
  },
  {
    id: "3",
    name: "Instituto Educacional Futuro",
    isActive: false,
    isMainOrg: false,
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    products: [
      { type: 'retention' as ProductType, active: true }
    ]
  }
];

export const useOrganizationData = (
  setOrganizations: React.Dispatch<React.SetStateAction<OrganizationType[]>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const { isAdmin, isSuperAdmin, currentUser } = useAuth();

  const loadOrganizations = useCallback(async () => {
    try {
      setIsLoading(true);
      console.log('Carregando organizações...', { 
        isAdmin, 
        isSuperAdmin, 
        currentUser,
        currentUserId: currentUser?.id,
        organizationId: currentUser?.organizationId
      });
      
      // Verificar permissões - apenas admins e super admins podem ver organizações
      if (!isAdmin && !isSuperAdmin) {
        console.log('Usuário sem permissão para ver organizações');
        setOrganizations([]);
        setIsLoading(false);
        return;
      }
      
      try {
        // Buscar organizações do Supabase
        const orgsData = await fetchOrganizations(currentUser);
        
        if (Array.isArray(orgsData) && orgsData.length > 0) {
          console.log('Organizações carregadas com sucesso:', orgsData.length);
          setOrganizations(orgsData);
        } else {
          console.warn('Nenhuma organização retornada da API. Usando dados fictícios.');
          setOrganizations(mockOrganizations);
          toast.info("Exibindo dados fictícios para teste");
        }
      } catch (error) {
        console.error("Erro ao carregar organizações da API:", error);
        console.log("Carregando dados fictícios para teste devido ao erro");
        setOrganizations(mockOrganizations);
        toast.info("Exibindo dados fictícios para teste devido a erro na API");
      }
    } catch (error) {
      console.error("Erro geral ao carregar organizações:", error);
      setOrganizations(mockOrganizations);
      toast.error("Erro ao carregar organizações. Exibindo dados de teste.");
    } finally {
      setIsLoading(false);
    }
  }, [setOrganizations, setIsLoading, isAdmin, isSuperAdmin, currentUser]);

  return { loadOrganizations };
};
