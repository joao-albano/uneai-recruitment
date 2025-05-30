
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { supabase } from '@/integrations/supabase/client';
import { OrganizationType } from '../../types';
import { useAuth } from '@/context/auth';
import { ProductType } from '@/context/ProductContext';

export const useOrganizationDetails = (id: string | undefined) => {
  const navigate = useNavigate();
  const { isAdmin, isSuperAdmin } = useAuth();
  const [organization, setOrganization] = useState<OrganizationType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadOrganization = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        
        const { data, error } = await supabase
          .from('organizations')
          .select(`
            id, 
            name, 
            is_main_org,
            created_at, 
            updated_at,
            products:organization_products(
              id,
              type,
              active,
              organization_id,
              created_at,
              updated_at
            )
          `)
          .eq('id', id)
          .single();
          
        if (error) {
          console.error('Erro ao carregar organização:', error);
          toast.error('Erro ao carregar os dados da organização');
          navigate('/organizations');
          return;
        }
        
        if (data) {
          setOrganization({
            id: data.id,
            name: data.name,
            isActive: true, // Default to true since is_active doesn't exist in DB
            isMainOrg: data.is_main_org || false,
            createdAt: data.created_at,
            products: data.products?.map(p => ({
              type: p.type as ProductType,
              active: p.active || false
            })) || []
          });
        }
      } catch (error) {
        console.error('Erro ao carregar organização:', error);
        toast.error('Erro ao carregar os dados da organização');
      } finally {
        setIsLoading(false);
      }
    };
    
    // Check permissions
    if (!isAdmin && !isSuperAdmin) {
      toast.error("Você não tem permissão para acessar esta página");
      navigate('/');
      return;
    }
    
    loadOrganization();
  }, [id, navigate, isAdmin, isSuperAdmin]);

  return {
    organization,
    isLoading
  };
};
