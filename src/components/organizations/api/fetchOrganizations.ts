
import { supabase } from '@/integrations/supabase/client';
import { UserProfile } from '@/context/auth/types';

/**
 * Busca organizações com base no perfil do usuário
 * - Super Admin: vê todas as organizações
 * - Admin: vê apenas a organização vinculada a ele
 * - Usuário normal: não vê organizações
 */
export const fetchOrganizations = async (currentUser: UserProfile | null) => {
  try {
    console.log('Buscando organizações para o usuário:', currentUser);
    
    // Se não há usuário autenticado, retornar array vazio
    if (!currentUser) {
      console.log('Usuário não autenticado');
      return [];
    }
    
    console.log('Status do usuário:', { 
      isSuperAdmin: currentUser.isSuperAdmin, 
      organizationId: currentUser.organizationId
    });
    
    // Verificar permissões - apenas super admin ou admin com organização vinculada pode ver organizações
    if (!currentUser.isSuperAdmin && !currentUser.organizationId) {
      console.log('Usuário sem permissão ou sem organização vinculada');
      return [];
    }
    
    // Em ambiente de desenvolvimento, retornar dados mock
    if (process.env.NODE_ENV === 'development') {
      console.log('Ambiente de desenvolvimento - retornando dados mock');
      // Simular delay para parecer mais real
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return getMockOrganizations();
    }
    
    // Construir a consulta para buscar organizações
    let query = supabase
      .from('organizations')
      .select(`
        id, 
        name, 
        is_main_org,
        created_at, 
        updated_at,
        organization_products (
          id,
          type,
          active,
          organization_id,
          created_at,
          updated_at
        )
      `)
      .order('name', { ascending: true });
    
    // Se for admin (não super), filtrar apenas a organização do usuário
    if (!currentUser.isSuperAdmin && currentUser.organizationId) {
      console.log('Filtrando pela organização do admin:', currentUser.organizationId);
      query = query.eq('id', currentUser.organizationId);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Erro ao buscar organizações:', error);
      console.error('Detalhes do erro:', JSON.stringify(error));
      throw error;
    }
    
    console.log('Organizações encontradas:', data?.length || 0);
    return formatOrganizationsData(data || []);
  } catch (error) {
    console.error('Erro ao buscar organizações:', error);
    
    if (error instanceof Error) {
      console.error('Detalhes do erro:', error.message);
    } else {
      console.error('Detalhes do erro JSON:', JSON.stringify(error));
    }
    
    // Em ambiente de desenvolvimento, retornar dados mock se houver erro
    if (process.env.NODE_ENV === 'development') {
      return getMockOrganizations();
    }
    
    throw error;
  }
};

// Formatar os dados das organizações para o formato esperado
const formatOrganizationsData = (orgs: any[]) => {
  return orgs.map(org => ({
    id: org.id,
    name: org.name,
    isActive: true, // Assumindo que todas as orgs estão ativas
    isMainOrg: org.is_main_org,
    createdAt: org.created_at,
    updatedAt: org.updated_at,
    products: org.organization_products ? org.organization_products.map((p: any) => ({
      type: p.type,
      active: p.active || false
    })) : []
  }));
};

// Dados fictícios para testes e ambiente de desenvolvimento
const getMockOrganizations = () => [
  {
    id: 'mock-org-1',
    name: 'Escola Alpha',
    isActive: true,
    isMainOrg: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    products: [
      { type: 'retention', active: true },
      { type: 'billing', active: true },
    ],
  },
  {
    id: 'mock-org-2',
    name: 'Escola Beta',
    isActive: true,
    isMainOrg: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    products: [
      { type: 'retention', active: true },
      { type: 'recruitment', active: true },
    ],
  },
  {
    id: 'mock-org-3',
    name: 'Escola Gamma',
    isActive: true,
    isMainOrg: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    products: [
      { type: 'pedagogical', active: true },
    ],
  },
];
