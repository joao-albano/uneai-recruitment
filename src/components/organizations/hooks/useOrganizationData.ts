
import { useCallback, useEffect } from 'react';
import { OrganizationType } from '../types';
import { ProductType } from '@/context/ProductContext';
import { toast } from "sonner";

export const useOrganizationData = (
  setOrganizations: React.Dispatch<React.SetStateAction<OrganizationType[]>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const loadOrganizations = useCallback(() => {
    try {
      setIsLoading(true);
      // Here we would fetch organizations from API
      // For now, using mock data
      const mockOrganizations: OrganizationType[] = [
        {
          id: '0',
          name: 'UNE CX',
          isActive: true,
          isMainOrg: true,
          createdAt: '2023-01-01',
          products: [
            { type: 'retention' as ProductType, active: true },
            { type: 'billing' as ProductType, active: true },
            { type: 'recruitment' as ProductType, active: true }
          ]
        },
        {
          id: '1',
          name: 'Escola de Letras',
          isActive: true,
          isMainOrg: false,
          createdAt: '2023-02-15',
          products: [
            { type: 'retention' as ProductType, active: true },
            { type: 'billing' as ProductType, active: true },
            { type: 'recruitment' as ProductType, active: false }
          ]
        },
        {
          id: '2',
          name: 'Outra Escola',
          isActive: true,
          isMainOrg: false,
          createdAt: '2023-03-20',
          products: [
            { type: 'retention' as ProductType, active: true },
            { type: 'billing' as ProductType, active: false },
            { type: 'recruitment' as ProductType, active: false }
          ]
        }
      ];
      
      setOrganizations(mockOrganizations);
    } catch (error) {
      console.error("Erro ao carregar organizações:", error);
      toast.error("Erro ao carregar organizações");
    } finally {
      setIsLoading(false);
    }
  }, [setOrganizations, setIsLoading]);

  // Load organizations when the component mounts
  useEffect(() => {
    loadOrganizations();
  }, [loadOrganizations]);

  return { loadOrganizations };
};
