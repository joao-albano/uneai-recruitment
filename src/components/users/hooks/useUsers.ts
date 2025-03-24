
import { useState, useCallback, useEffect } from 'react';
import { UserType, NewUserType } from '../types';
import { useUserDialogHandlers } from './userDialogHandlers';
import { useUserCrudOperations } from './userCrudOperations';
import { initialNewUser } from './userState';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useUsers = () => {
  // State para dialogs
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [newUser, setNewUser] = useState<NewUserType>(initialNewUser);
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLastAdmin, setIsLastAdmin] = useState(false);
  const { toast } = useToast();
  
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
          organizations:organization_id (
            name
          )
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
        
        return {
          id: Number(profile.id), // Convertendo UUID para número para compatibilidade
          name: fullName,
          email: profile.email,
          role: profile.role,
          initials: initials,
          organizationId: profile.organization_id,
          organizationName: profile.organizations?.name,
          isSuperAdmin: profile.is_super_admin
        };
      }));
      
      setUsers(mappedUsers);
      
      // Verificar se há apenas um admin por organização
      const orgAdminCounts = new Map<string, number>();
      
      mappedUsers.forEach(user => {
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
  }, [toast]);
  
  // Carregar usuários na inicialização
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);
  
  // Import dialog handling functionality
  const { 
    handleOpenEditDialog, 
    handleOpenDeleteDialog 
  } = useUserDialogHandlers(
    setSelectedUser,
    setShowEditDialog,
    setShowDeleteDialog
  );
  
  // Criar usuário
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (!e.currentTarget) return;
      
      // Get form data
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      const name = formData.get('name') as string;
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;
      const role = formData.get('role') as string;
      
      if (!name || !email || !password) {
        toast({
          title: "Campos obrigatórios",
          description: "Por favor, preencha todos os campos obrigatórios.",
          variant: "destructive"
        });
        return;
      }
      
      // Usar a função RPC personalizada para criar o usuário
      const { data, error } = await supabase.rpc('create_user_with_profile', {
        email,
        password,
        name,
        role: role || 'user',
        is_admin: role === 'admin',
        organization_id: newUser.organizationId
      });
      
      if (error) {
        console.error("Erro ao criar usuário:", error);
        toast({
          title: "Erro ao criar usuário",
          description: error.message,
          variant: "destructive"
        });
        return;
      }
      
      // Recarregar a lista de usuários
      fetchUsers();
      
      // Limpar o formulário
      setNewUser({ 
        name: '', 
        email: '', 
        role: 'user', 
        password: '', 
        initials: '',
        organizationId: '1',
        organizationName: 'Escola de Letras'
      });
      
      setShowCreateDialog(false);
      
      toast({
        title: "Usuário criado",
        description: `${name} foi adicionado com sucesso.`
      });
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      toast({
        title: "Erro ao criar usuário",
        description: "Ocorreu um erro ao processar a solicitação.",
        variant: "destructive"
      });
    }
  };
  
  // Editar usuário
  const handleEditUser = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (!selectedUser) {
        toast({
          title: "Erro",
          description: "Nenhum usuário selecionado para edição.",
          variant: "destructive"
        });
        return;
      }

      // Obter dados do formulário
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      const name = formData.get('name') as string;
      const email = formData.get('email') as string;
      const role = formData.get('role') as string;
      const isAdmin = role === 'admin';
      const isSuperAdmin = selectedUser.isSuperAdmin;
      
      // Usar a função RPC para atualizar o usuário
      const { error } = await supabase.rpc('update_user_profile', {
        user_id: selectedUser.id.toString(),
        name,
        email,
        role,
        is_admin: isAdmin,
        is_super_admin: isSuperAdmin
      });
      
      if (error) {
        console.error("Erro ao atualizar usuário:", error);
        toast({
          title: "Erro ao atualizar",
          description: error.message,
          variant: "destructive"
        });
        return;
      }
      
      // Recarregar a lista de usuários
      fetchUsers();
      
      // Fechar o diálogo
      setShowEditDialog(false);
      
      // Limpar o usuário selecionado
      setTimeout(() => {
        setSelectedUser(null);
      }, 100);
      
      toast({
        title: "Usuário atualizado",
        description: `As informações de ${name} foram atualizadas.`
      });
    } catch (error) {
      console.error("Erro ao editar usuário:", error);
      toast({
        title: "Erro ao atualizar",
        description: "Ocorreu um erro ao salvar as alterações.",
        variant: "destructive"
      });
    }
  };
  
  // Excluir usuário
  const handleDeleteUser = async () => {
    try {
      if (!selectedUser) {
        toast({
          title: "Erro",
          description: "Nenhum usuário selecionado para exclusão.",
          variant: "destructive"
        });
        return;
      }
      
      // Usar a função RPC para excluir o usuário
      const { error } = await supabase.rpc('delete_user', {
        user_id: selectedUser.id.toString()
      });
      
      if (error) {
        console.error("Erro ao excluir usuário:", error);
        toast({
          title: "Erro ao excluir",
          description: error.message,
          variant: "destructive"
        });
        return;
      }
      
      // Recarregar a lista de usuários
      fetchUsers();
      
      // Fechar o diálogo
      setShowDeleteDialog(false);
      
      // Limpar o usuário selecionado
      setTimeout(() => {
        setSelectedUser(null);
      }, 100);
      
      toast({
        title: "Usuário removido",
        description: `${selectedUser.name} foi removido com sucesso.`
      });
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
      toast({
        title: "Erro ao excluir",
        description: "Ocorreu um erro ao remover o usuário.",
        variant: "destructive"
      });
    }
  };

  // Combine todos os handlers e estados
  return {
    // State
    users,
    loading,
    newUser,
    selectedUser,
    showCreateDialog,
    showEditDialog,
    showDeleteDialog,
    isLastAdmin,
    
    // State setters
    setNewUser,
    setSelectedUser,
    setShowCreateDialog,
    setShowEditDialog,
    setShowDeleteDialog,
    
    // Event handlers
    handleOpenEditDialog,
    handleOpenDeleteDialog,
    handleCreateUser,
    handleEditUser,
    handleDeleteUser,
    fetchUsers
  };
};
