
import { useState, useCallback } from 'react';
import { UserType } from '../types';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/auth';

export const useUserFetch = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLastAdmin, setIsLastAdmin] = useState(false);
  const { toast } = useToast();
  const { currentUser } = useAuth();
  
  // Carregar usuários do Supabase
  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      
      // Buscar todos os perfis de usuários
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          id,
          email,
          role,
          is_admin,
          is_super_admin,
          organization_id,
          organizations(name)
        `);
      
      if (error) {
        console.error('Erro ao buscar usuários:', error);
        toast({
          title: "Erro ao carregar usuários",
          description: error.message,
          variant: "destructive"
        });
        return;
      }
      
      // Mapear dados do supabase para o formato esperado pelo componente
      const mappedUsers: UserType[] = await Promise.all(data.map(async (profile) => {
        // Buscar dados adicionais do usuário do auth.users
        const { data: userData } = await supabase.auth.admin.getUserById(profile.id);
        
        // Gerar iniciais do nome
        const fullName = userData?.user?.user_metadata?.full_name || profile.email?.split('@')[0] || '';
        const initials = fullName
          .split(' ')
          .slice(0, 2)
          .map(word => word[0])
          .join('')
          .toUpperCase();
        
        let organizationName: string | undefined;
        
        // Verificar se organizations existe e tem dados antes de acessar a propriedade name
        if (profile.organizations && Array.isArray(profile.organizations) && profile.organizations.length > 0) {
          organizationName = profile.organizations[0]?.name;
        } else if (profile.organizations && typeof profile.organizations === 'object') {
          organizationName = (profile.organizations as any).name;
        }
        
        return {
          id: Number(profile.id), // Convertendo UUID para número para compatibilidade
          name: fullName,
          email: profile.email,
          role: profile.role,
          initials: initials,
          organizationId: profile.organization_id,
          organizationName: organizationName,
          isSuperAdmin: profile.is_super_admin
        };
      }));
      
      // Filtrar o usuário atual da lista
      const filteredUsers = mappedUsers.filter(user => 
        // Se o currentUser for null ou undefined, não filtra nada
        // Caso contrário, exclui o usuário atual da lista
        !currentUser || user.id !== Number(currentUser.id)
      );
      
      setUsers(filteredUsers);
      
      // Verificar se há apenas um admin por organização
      const orgAdminCounts = new Map<string, number>();
      
      filteredUsers.forEach(user => {
        if (user.role === 'admin' && user.organizationId) {
          const currentCount = orgAdminCounts.get(user.organizationId) || 0;
          orgAdminCounts.set(user.organizationId, currentCount + 1);
        }
      });
      
      // Se alguma organização tiver apenas 1 admin, isLastAdmin = true
      setIsLastAdmin(Array.from(orgAdminCounts.values()).some(count => count === 1));
      
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      toast({
        title: "Erro ao carregar usuários",
        description: "Não foi possível carregar a lista de usuários.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, [toast, currentUser]);

  return {
    users,
    loading,
    isLastAdmin,
    fetchUsers
  };
};
