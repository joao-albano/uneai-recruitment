
import { useState, useEffect } from 'react';
import { UserType, NewUserType } from '../types';
import { useUserDialogHandlers } from './userDialogHandlers';
import { initialNewUser } from './userState';
import { useUserFetch } from './useUserFetch';
import { useUserCreate } from './useUserCreate';
import { useUserEdit } from './useUserEdit';
import { useUserDelete } from './useUserDelete';

export const useUsers = () => {
  // State para dialogs
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [newUser, setNewUser] = useState<NewUserType>(initialNewUser);
  
  // Usar o hook de fetch para obter usuários
  const { users, loading, isLastAdmin, fetchUsers } = useUserFetch();
  
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
  
  // Usar os hooks de operações CRUD
  const { handleCreateUser } = useUserCreate(fetchUsers);
  const { handleEditUser } = useUserEdit(fetchUsers);
  const { handleDeleteUser } = useUserDelete(fetchUsers);
  
  // Funções wrapper para conectar os eventos de UI com as funções dos hooks
  const onCreateUser = (e: React.FormEvent) => {
    handleCreateUser(e, newUser, () => {
      // Limpar o formulário
      setNewUser(initialNewUser);
      // Fechar o diálogo
      setShowCreateDialog(false);
    });
  };
  
  const onEditUser = (e: React.FormEvent) => {
    handleEditUser(e, selectedUser, () => {
      // Fechar o diálogo
      setShowEditDialog(false);
      // Limpar o usuário selecionado
      setTimeout(() => {
        setSelectedUser(null);
      }, 100);
    });
  };
  
  const onDeleteUser = () => {
    handleDeleteUser(selectedUser, () => {
      // Fechar o diálogo
      setShowDeleteDialog(false);
      // Limpar o usuário selecionado
      setTimeout(() => {
        setSelectedUser(null);
      }, 100);
    });
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
    handleCreateUser: onCreateUser,
    handleEditUser: onEditUser,
    handleDeleteUser: onDeleteUser,
    fetchUsers
  };
};
