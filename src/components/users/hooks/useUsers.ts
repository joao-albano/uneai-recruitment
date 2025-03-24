
import { useState } from 'react';
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
    handleDeleteUser
  } = useUserCrudOperations(
    initialUsers,
    setShowCreateDialog,
    setShowEditDialog,
    setShowDeleteDialog,
    setSelectedUser,
    setNewUser
  );

  return {
    // State
    users,
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
    handleDeleteUser
  };
};
