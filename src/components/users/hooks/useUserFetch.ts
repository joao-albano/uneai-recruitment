
import { useState, useCallback } from 'react';
import { UserType } from '../types';
import { fetchUsers } from '../api/userManagementApi';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/auth';
import { initialUsers } from './userState';

export const useUserFetch = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLastAdmin, setIsLastAdmin] = useState(false);
  const { toast } = useToast();
  const { currentUser } = useAuth();
  
  // Carregar usuários do Supabase
  const fetchUsersData = useCallback(async () => {
    try {
      setLoading(true);
      
      try {
        // Buscar todos os perfis de usuários usando nossa API function
        const profiles = await fetchUsers();
        
        if (!profiles) {
          // Usando dados de demonstração caso não consiga buscar do servidor
          console.log('Usando dados de demonstração');
          setUsers(initialUsers);
          setLoading(false);
          return;
        }
        
        // Mapear dados do supabase para o formato esperado pelo componente
        const mappedUsers: UserType[] = profiles.map((profile: any) => {
          // Gerar iniciais do nome
          const fullName = profile.email?.split('@')[0] || '';
          const initials = fullName
            .slice(0, 2)
            .toUpperCase();
          
          let organizationName: string | undefined;
          
          // Verificar se organizations existe e tem dados antes de acessar a propriedade name
          if (profile.organizations && Array.isArray(profile.organizations) && profile.organizations.length > 0) {
            organizationName = profile.organizations[0]?.name;
          } else if (profile.organizations && typeof profile.organizations === 'object') {
            organizationName = (profile.organizations as any).name;
          }
          
          return {
            id: profile.id,
            name: fullName,
            email: profile.email,
            role: profile.role,
            initials: initials,
            organizationId: profile.organization_id,
            organizationName: organizationName,
            isSuperAdmin: profile.is_super_admin
          };
        });
        
        // Filtrar o usuário atual da lista
        const filteredUsers = mappedUsers.filter(user => 
          // Se o currentUser for null ou undefined, não filtra nada
          // Caso contrário, exclui o usuário atual da lista
          !currentUser || user.id !== currentUser.id
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
        console.error('Erro ao buscar usuários do Supabase, usando dados de demonstração:', error);
        // Fallback para dados de demonstração
        setUsers(initialUsers);
      }
      
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      toast({
        title: "Erro ao carregar usuários",
        description: "Não foi possível carregar a lista de usuários.",
        variant: "destructive"
      });
      // Fallback para dados de demonstração
      setUsers(initialUsers);
    } finally {
      setLoading(false);
    }
  }, [toast, currentUser]);

  return {
    users,
    loading,
    isLastAdmin,
    fetchUsers: fetchUsersData
  };
};
