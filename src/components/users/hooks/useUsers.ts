
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/auth';
import { UserType, NewUserType } from '../types';
import { useToast } from '@/hooks/use-toast'; 
import { v4 as uuidv4 } from 'uuid';
import { fetchUsers, deleteUser } from '../api/userManagementApi';

export const useUsers = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [isLastAdmin, setIsLastAdmin] = useState(false);
  const { toast } = useToast();
  const { currentUser } = useAuth();

  const [newUser, setNewUser] = useState<NewUserType>({
    name: '',
    email: '',
    role: 'user',
    password: '',
    initials: '',
    organizationId: currentUser?.organizationId,
    organizationName: currentUser?.organization?.name,
  });

  // Fetch users
  const fetchUsersData = useCallback(async () => {
    try {
      setLoading(true);
      
      // Usar função simulada em vez de chamar o banco diretamente
      const usersData = await fetchUsers();
      
      // Transformar dados da API para o formato esperado pelo componente
      const processedUsers: UserType[] = usersData.map(user => ({
        id: user.id,
        name: user.email.split('@')[0], // Use o email para gerar um nome se não tiver
        email: user.email,
        role: user.role || 'user',
        initials: user.email.substring(0, 2).toUpperCase(),
        organizationId: user.organization_id,
        organizationName: user.organizations?.name || 'Organização',
        isSuperAdmin: user.is_super_admin
      }));
      
      setUsers(processedUsers);
      
      // Adicionar dados de amostra se nenhum usuário foi encontrado
      if (processedUsers.length === 0) {
        const demoUsers: UserType[] = [
          {
            id: 'user-1',
            name: 'Administrador Teste',
            email: 'admin@teste.com',
            role: 'admin',
            initials: 'AT',
            organizationId: currentUser?.organizationId || 'org-1',
            organizationName: currentUser?.organization?.name || 'Organização Teste',
            isSuperAdmin: false
          },
          {
            id: 'user-2',
            name: 'Usuário Comum',
            email: 'usuario@teste.com',
            role: 'user',
            initials: 'UC',
            organizationId: currentUser?.organizationId || 'org-1',
            organizationName: currentUser?.organization?.name || 'Organização Teste',
            isSuperAdmin: false
          }
        ];
        
        setUsers(demoUsers);
      }
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      // Garantir que temos pelo menos dados de exemplo em caso de erro
      const fallbackUsers: UserType[] = [
        {
          id: 'user-1',
          name: 'Administrador Teste',
          email: 'admin@teste.com',
          role: 'admin',
          initials: 'AT',
          organizationId: currentUser?.organizationId || 'org-1',
          organizationName: currentUser?.organization?.name || 'Organização Teste',
          isSuperAdmin: false
        }
      ];
      setUsers(fallbackUsers);
      
      toast({
        title: "Erro ao carregar dados",
        description: "Não foi possível obter a lista de usuários. Usando dados de exemplo.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, [currentUser, toast]);

  // Check if user is the last admin
  useEffect(() => {
    if (selectedUser && selectedUser.role === 'admin') {
      const orgAdmins = users.filter(
        u => u.role === 'admin' && 
             u.organizationId === selectedUser.organizationId
      );
      setIsLastAdmin(orgAdmins.length <= 1);
    } else {
      setIsLastAdmin(false);
    }
  }, [selectedUser, users]);

  // Initial data load
  useEffect(() => {
    fetchUsersData();
  }, [fetchUsersData]);

  // Handle dialog opens
  const handleOpenEditDialog = useCallback((user: UserType) => {
    setSelectedUser(user);
    setShowEditDialog(true);
  }, []);

  const handleOpenDeleteDialog = useCallback((user: UserType) => {
    setSelectedUser(user);
    setShowDeleteDialog(true);
  }, []);

  // Handle user create
  const handleCreateUser = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Simular criação de usuário
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newId = uuidv4();
      const createdUser: UserType = {
        id: newId,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role || 'user',
        initials: newUser.initials || newUser.name.substring(0, 2).toUpperCase(),
        organizationId: newUser.organizationId || currentUser?.organizationId || '',
        organizationName: newUser.organizationName || currentUser?.organization?.name || '',
        isSuperAdmin: false
      };
      
      setUsers(prev => [...prev, createdUser]);
      setShowCreateDialog(false);
      
      // Reset the form data
      setNewUser({
        name: '',
        email: '',
        role: 'user',
        password: '',
        initials: '',
        organizationId: currentUser?.organizationId,
        organizationName: currentUser?.organization?.name,
      });
      
      toast({
        title: "Usuário criado",
        description: `${newUser.name} foi adicionado com sucesso.`,
      });
    } catch (error: any) {
      toast({
        title: "Erro ao criar usuário",
        description: error.message || "Ocorreu um erro ao criar o usuário.",
        variant: "destructive",
      });
    }
  }, [newUser, currentUser, toast]);

  // Handle user edit - modificado para aceitar um evento de formulário
  const handleEditUser = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedUser) return;
    
    try {
      // Simular edição de usuário
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setUsers(prev => 
        prev.map(user => 
          user.id === selectedUser.id ? selectedUser : user
        )
      );
      
      setShowEditDialog(false);
      setSelectedUser(null);
      
      toast({
        title: "Usuário atualizado",
        description: `${selectedUser.name} foi atualizado com sucesso.`,
      });
    } catch (error: any) {
      toast({
        title: "Erro ao atualizar usuário",
        description: error.message || "Ocorreu um erro ao atualizar o usuário.",
        variant: "destructive",
      });
    }
  }, [selectedUser, toast]);

  // Handle user delete
  const handleDeleteUser = useCallback(async () => {
    if (!selectedUser) return;
    
    try {
      // Simular exclusão de usuário
      await deleteUser(selectedUser.id);
      
      setUsers(prev => prev.filter(user => user.id !== selectedUser.id));
      setShowDeleteDialog(false);
      setSelectedUser(null);
      
      toast({
        title: "Usuário excluído",
        description: `${selectedUser.name} foi excluído com sucesso.`,
      });
    } catch (error: any) {
      toast({
        title: "Erro ao excluir usuário",
        description: error.message || "Ocorreu um erro ao excluir o usuário.",
        variant: "destructive",
      });
    }
  }, [selectedUser, toast]);

  return {
    users,
    loading,
    newUser,
    selectedUser,
    showCreateDialog,
    showEditDialog,
    showDeleteDialog,
    isLastAdmin,
    setNewUser,
    setSelectedUser,
    setShowCreateDialog,
    setShowEditDialog,
    setShowDeleteDialog,
    handleOpenEditDialog,
    handleOpenDeleteDialog,
    handleCreateUser,
    handleEditUser,
    handleDeleteUser,
    fetchUsers: fetchUsersData
  };
};
