
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { UserType, NewUserType } from '../types';

export const useUserCrudOperations = (
  initialUsers: UserType[],
  setShowCreateDialog: React.Dispatch<React.SetStateAction<boolean>>,
  setShowEditDialog: React.Dispatch<React.SetStateAction<boolean>>,
  setShowDeleteDialog: React.Dispatch<React.SetStateAction<boolean>>,
  setSelectedUser: React.Dispatch<React.SetStateAction<UserType | null>>,
  setNewUser: React.Dispatch<React.SetStateAction<NewUserType>>
) => {
  const { toast } = useToast();
  const [users, setUsers] = useState<UserType[]>(initialUsers);
  // Add a local selectedUser state to maintain the selected user within this hook
  const [selectedUser, setLocalSelectedUser] = useState<UserType | null>(null);

  // Update both the local and parent selectedUser states
  const updateSelectedUser = (user: UserType | null) => {
    setLocalSelectedUser(user);
    setSelectedUser(user);
  };

  const handleCreateUser = (e: React.FormEvent) => {
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
      
      // Generate initials
      const initials = name
        .split(' ')
        .slice(0, 2)
        .map(word => word[0])
        .join('')
        .toUpperCase();
      
      const userToAdd: UserType = {
        id: users.length + 1,
        name,
        email,
        role: role || 'user',
        initials,
        organizationId: '1',
        organizationName: 'Escola de Letras'
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
      if (!e.currentTarget) return;
      
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
        updateSelectedUser(null);
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
        updateSelectedUser(null);
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

  const isLastAdmin = users.filter(user => user.role === 'admin' && user.organizationId === '1').length === 1;

  return {
    users,
    setUsers,
    isLastAdmin,
    handleCreateUser,
    handleEditUser,
    handleDeleteUser,
    // Add selectedUser and setLocalSelectedUser to the return values
    selectedUser,
    setSelectedUser: updateSelectedUser
  };
};
