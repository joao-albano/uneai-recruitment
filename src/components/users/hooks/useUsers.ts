
import { useState, useCallback } from 'react';
import { UserType, NewUserType } from '../types';
import { useUserDialogHandlers } from './userDialogHandlers';
import { useUserCrudOperations } from './userCrudOperations';
import { initialNewUser, initialUsers } from './userState';

export const useUsers = () => {
  // State for dialogs
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [newUser, setNewUser] = useState<NewUserType>(initialNewUser);
  
  // Import dialog handling functionality
  const { 
    handleOpenEditDialog, 
    handleOpenDeleteDialog 
  } = useUserDialogHandlers(
    setSelectedUser,
    setShowEditDialog,
    setShowDeleteDialog
  );
  
  // Import CRUD operations
  const {
    users,
    setUsers,
    isLastAdmin,
    handleCreateUser,
    handleEditUser,
    handleDeleteUser,
    // We get the selected user from the hook to ensure consistency
    selectedUser: crudSelectedUser,
    setSelectedUser: crudSetSelectedUser,
  } = useUserCrudOperations(
    initialUsers,
    setShowCreateDialog,
    setShowEditDialog,
    setShowDeleteDialog,
    setSelectedUser,
    setNewUser
  );

  // Ensure both hooks have the same user selected
  // This fixes potential race conditions between the two hooks
  const updateSelectedUser = useCallback((user: UserType | null) => {
    setSelectedUser(user);
    crudSetSelectedUser(user);
  }, [crudSetSelectedUser]);

  return {
    // State
    users,
    newUser,
    // Prioritize the selected user from the CRUD operations
    selectedUser: crudSelectedUser || selectedUser,
    showCreateDialog,
    showEditDialog,
    showDeleteDialog,
    isLastAdmin,
    
    // State setters
    setNewUser,
    setSelectedUser: updateSelectedUser,
    setShowCreateDialog,
    setShowEditDialog,
    setShowDeleteDialog,
    
    // Event handlers
    handleOpenEditDialog,
    handleOpenDeleteDialog,
    handleCreateUser,
    handleEditUser,
    handleDeleteUser
  };
};
