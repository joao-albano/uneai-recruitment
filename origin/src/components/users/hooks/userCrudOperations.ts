import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { UserType, NewUserType, UserRole } from '../types';

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
  const [selectedUser, setLocalSelectedUser] = useState<UserType | null>(null);

  const updateSelectedUser = (user: UserType | null) => {
    setLocalSelectedUser(user);
    setSelectedUser(user);
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (!e.currentTarget) return;
      
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      const name = formData.get('name') as string;
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;
      const role = formData.get('role') as UserRole;
      
      if (!name || !email || !password) {
        toast({
          title: "Campos obrigatórios",
          description: "Por favor, preencha todos os campos obrigatórios.",
          variant: "destructive"
        });
        return;
      }
      
      const initials = name
        .split(' ')
        .slice(0, 2)
        .map(word => word[0])
        .join('')
        .toUpperCase();
      
      const userToAdd: UserType = {
        id: String(users.length + 1),
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
      if (!selectedUser) {
        if (!selectedUser) {
          toast({
            title: "Erro",
            description: "Nenhum usuário selecionado para edição.",
            variant: "destructive"
          });
          return;
        }
      }

      const userToUpdate = structuredClone(selectedUser);
      
      const updatedUserName = userToUpdate.name;
      
      const updatedUsers = users.map(user => {
        if (user.id === userToUpdate.id) {
          return userToUpdate;
        }
        return user;
      });
      
      setUsers(updatedUsers);
      
      toast({
        title: "Usuário atualizado",
        description: `As informações de ${updatedUserName} foram atualizadas.`
      });
      
      setShowEditDialog(false);
      
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
      if (!selectedUser) {
        toast({
          title: "Erro",
          description: "Nenhum usuário selecionado para exclusão.",
          variant: "destructive"
        });
        return;
      }
      
      const userName = selectedUser.name;
      const updatedUsers = users.filter(user => user.id !== selectedUser.id);
      
      setUsers(updatedUsers);
      
      setShowDeleteDialog(false);
      
      setTimeout(() => {
        updateSelectedUser(null);
      }, 100);
      
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
    selectedUser: selectedUser,
    setSelectedUser: updateSelectedUser
  };
};
