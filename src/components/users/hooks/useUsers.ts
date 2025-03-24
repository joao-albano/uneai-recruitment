
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
  
  const handleOpenEditDialog = (user: UserType) => {
    setSelectedUser(user);
    setShowEditDialog(true);
  };
  
  const handleOpenDeleteDialog = (user: UserType) => {
    setSelectedUser(user);
    setShowDeleteDialog(true);
  };
  
  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    
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
  };
  
  const handleEditUser = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedUser) return;
    
    const updatedUsers = users.map(user => {
      if (user.id === selectedUser.id) {
        return selectedUser;
      }
      return user;
    });
    
    setUsers(updatedUsers);
    setShowEditDialog(false);
    
    toast({
      title: "Usuário atualizado",
      description: `As informações de ${selectedUser.name} foram atualizadas.`
    });
  };
  
  const handleDeleteUser = () => {
    if (!selectedUser) return;
    
    const updatedUsers = users.filter(user => user.id !== selectedUser.id);
    setUsers(updatedUsers);
    setShowDeleteDialog(false);
    
    toast({
      title: "Usuário removido",
      description: `${selectedUser.name} foi removido com sucesso.`
    });
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
