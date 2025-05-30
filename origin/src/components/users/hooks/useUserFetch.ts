
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
          // Gerar iniciais do nome ou usar dados existentes
          const name = profile.email?.split('@')[0] || '';
          const initials = name.slice(0, 2).toUpperCase();
          
          let organizationName: string | undefined;
          let organizationId: string | undefined = profile.organization_id;
          
          // Verificar se organizations existe e extrair os dados
          if (profile.organizations) {
            // Como estamos usando foreign keys, a organização vem como objeto e não como array
            organizationName = profile.organizations?.name;
            organizationId = profile.organizations?.id || profile.organization_id;
          }
          
          console.log('Mapeando usuário:', profile.email, 'organizationId:', organizationId, 'organizationName:', organizationName);
          
          return {
            id: profile.id,
            name: name,
            email: profile.email,
            role: profile.role,
            initials: initials,
            organizationId: organizationId,
            organizationName: organizationName,
            isSuperAdmin: profile.is_super_admin
          };
        });
        
        console.log('Usuários mapeados:', mappedUsers);
        
        // Filtrar o usuário atual da lista se necessário
        const filteredUsers = currentUser?.id ? 
          mappedUsers.filter(user => user.id !== currentUser.id) : 
          mappedUsers;
        
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
