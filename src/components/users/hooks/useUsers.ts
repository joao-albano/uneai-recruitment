
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { UserType, NewUserType } from '../types';

export const useUsers = () => {
  const { toast } = useToast();
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [newUser, setNewUser] = useState<NewUserType>({
    name: '',
    email: '',
    role: 'user',
    password: '',
    initials: '',
    organizationId: '1',
    organizationName: 'Escola de Letras'
  });
  
  const [users, setUsers] = useState<UserType[]>([
    { id: 1, name: 'Admin User', email: 'admin@example.com', role: 'admin', initials: 'AU', organizationId: '1', organizationName: 'Escola de Letras' },
    { id: 2, name: 'Maria Silva', email: 'maria@example.com', role: 'user', initials: 'MS', organizationId: '1', organizationName: 'Escola de Letras' },
    { id: 3, name: 'João Santos', email: 'joao@example.com', role: 'user', initials: 'JS', organizationId: '1', organizationName: 'Escola de Letras' },
    { id: 4, name: 'Carlos Mendes', email: 'carlos@outraescola.com', role: 'admin', initials: 'CM', organizationId: '2', organizationName: 'Outra Escola' },
    { id: 5, name: 'Ana Paula', email: 'ana@outraescola.com', role: 'user', initials: 'AP', organizationId: '2', organizationName: 'Outra Escola' },
  ]);

  const isLastAdmin = users.filter(user => user.role === 'admin' && user.organizationId === '1').length === 1;
  
  // Improved version with better error handling and safe state updates
  const handleOpenEditDialog = (user: UserType) => {
    try {
      // Make a deep copy to avoid reference issues
      setSelectedUser(JSON.parse(JSON.stringify(user)));
      setShowEditDialog(true);
    } catch (error) {
      console.error("Erro ao abrir diálogo de edição:", error);
      toast({
        title: "Erro",
        description: "Não foi possível abrir o editor de usuário",
        variant: "destructive"
      });
    }
  };
  
  const handleOpenDeleteDialog = (user: UserType) => {
    try {
      // Make a deep copy to avoid reference issues
      setSelectedUser(JSON.parse(JSON.stringify(user)));
      setShowDeleteDialog(true);
    } catch (error) {
      console.error("Erro ao abrir diálogo de exclusão:", error);
      toast({
        title: "Erro",
        description: "Não foi possível abrir o diálogo de exclusão",
        variant: "destructive"
      });
    }
  };
  
  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (!newUser.name || !newUser.email || !newUser.password) {
        toast({
          title: "Campos obrigatórios",
          description: "Por favor, preencha todos os campos obrigatórios.",
          variant: "destructive"
        });
        return;
      }
      
      // Generate initials
      const initials = newUser.name
        .split(' ')
        .slice(0, 2)
        .map(word => word[0])
        .join('')
        .toUpperCase();
      
      const userToAdd: UserType = {
        id: users.length + 1,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        initials: initials,
        organizationId: newUser.organizationId,
        organizationName: newUser.organizationName
      };
      
      setUsers([...users, userToAdd]);
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
        description: `${userToAdd.name} foi adicionado com sucesso.`
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
  
  const handleEditUser = (e: React.FormEvent) => {
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

      // Make a copy of the user we're updating for the toast message
      const updatedUserName = selectedUser.name;
      
      const updatedUsers = users.map(user => {
        if (user.id === selectedUser.id) {
          return {...selectedUser};
        }
        return user;
      });
      
      // Update state in this specific order to prevent race conditions
      setUsers(updatedUsers);
      
      // Show success toast
      toast({
        title: "Usuário atualizado",
        description: `As informações de ${updatedUserName} foram atualizadas.`
      });
      
      // Clean up by closing dialog and clearing selected user
      setShowEditDialog(false);
      
      // Important: Set selectedUser to null AFTER the dialog is closed
      // Using setTimeout to ensure this happens after the dialog animation
      setTimeout(() => {
        setSelectedUser(null);
      }, 100);
    } catch (error) {
      console.error("Erro ao editar usuário:", error);
      toast({
        title: "Erro ao atualizar",
        description: "Ocorreu um erro ao salvar as alterações.",
        variant: "destructive"
      });
    }
  };
  
  const handleDeleteUser = () => {
    try {
      if (!selectedUser) return;
      
      const userName = selectedUser.name;
      const updatedUsers = users.filter(user => user.id !== selectedUser.id);
      
      // Update users first
      setUsers(updatedUsers);
      
      // Close dialog
      setShowDeleteDialog(false);
      
      // Clear selected user with timeout
      setTimeout(() => {
        setSelectedUser(null);
      }, 100);
      
      // Show success message after state updates
      toast({
        title: "Usuário removido",
        description: `${userName} foi removido com sucesso.`
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

  return {
    users,
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
    handleDeleteUser
  };
};
