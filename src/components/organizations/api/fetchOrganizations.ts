
import { supabase } from '@/integrations/supabase/client';
import { UserProfile } from '@/context/auth/types';
import { OrganizationType } from '../types';

// Mock data for fallback when API fails
const DEMO_ORGANIZATIONS: OrganizationType[] = [
  {
    id: '1',
    name: 'Escola Modelo São Paulo',
    isActive: true,
    isMainOrg: true,
    createdAt: '2023-10-15T14:30:00.000Z',
    products: [
      { type: 'retention', active: true },
      { type: 'billing', active: true },
      { type: 'recruitment', active: false }
    ]
  },
  {
    id: '2',
    name: 'Colégio Inovação',
    isActive: true,
    isMainOrg: false,
    createdAt: '2023-11-20T10:15:00.000Z',
    products: [
      { type: 'retention', active: true },
      { type: 'secretary', active: true }
    ]
  },
  {
    id: '3',
    name: 'Instituto Educacional Futuro',
    isActive: false,
    isMainOrg: false,
    createdAt: '2023-09-05T09:45:00.000Z',
    products: [
      { type: 'retention', active: false },
      { type: 'pedagogical', active: true }
    ]
  }
];

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
    
    console.log('Configuração Supabase:', {
      url: 'Using configured Supabase URL',
    });
    
    // Construir a consulta para buscar organizações
    let query = supabase
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
      
      // Retornar dados de demonstração em caso de falha na API
      console.warn('Usando dados de demonstração devido ao erro na API');
      return DEMO_ORGANIZATIONS;
    }
    
    console.log('Organizações encontradas:', data?.length || 0);
    console.log('Dados das organizações:', data);
    
    if (!data || data.length === 0) {
      console.warn('Nenhuma organização encontrada na API, usando dados de demonstração');
      return DEMO_ORGANIZATIONS;
    }
    
    return data;
  } catch (error) {
    console.error('Erro ao buscar organizações:', error);
    console.error('Tipo de erro:', typeof error);
    if (error instanceof Error) {
      console.error('Detalhes do erro:', error.message);
    } else {
      console.error('Detalhes do erro JSON:', JSON.stringify(error));
    }
    
    // Retornar dados de demonstração em caso de exceção
    console.warn('Usando dados de demonstração devido à exceção');
    return DEMO_ORGANIZATIONS;
  }
};
