
import React from 'react';
import CreateUserDialog from '../CreateUserDialog';
import EditUserDialog from './EditUserDialog';
import DeleteUserDialog from '../DeleteUserDialog';
import { UserType, NewUserType } from '../types';
import { ProductSubscription } from '@/context/ProductContext';

interface UserDialogsContainerProps {
  showCreateDialog: boolean;
  showEditDialog: boolean;
  showDeleteDialog: boolean;
  setShowCreateDialog: (show: boolean) => void;
  setShowEditDialog: (show: boolean) => void;
  setShowDeleteDialog: (show: boolean) => void;
  newUser: NewUserType;
  selectedUser: UserType | null;
  setNewUser: React.Dispatch<React.SetStateAction<NewUserType>>;
  setSelectedUser: React.Dispatch<React.SetStateAction<UserType | null>>;
  handleCreateUser: (e: React.FormEvent) => void;
  handleEditUser: (e: React.FormEvent) => void;
  handleDeleteUser: () => void;
  userSubscriptions: ProductSubscription[];
  isAdmin: boolean;
  isSuperAdmin: boolean;
}

const UserDialogsContainer: React.FC<UserDialogsContainerProps> = ({
  showCreateDialog,
  showEditDialog,
  showDeleteDialog,
  setShowCreateDialog,
  setShowEditDialog,
  setShowDeleteDialog,
  newUser,
  selectedUser,
  setNewUser,
  setSelectedUser,
  handleCreateUser,
  handleEditUser,
  handleDeleteUser,
  userSubscriptions,
  isAdmin,
  isSuperAdmin
}) => {
  return (
    <>
      <CreateUserDialog 
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        newUser={newUser}
        setNewUser={setNewUser}
        onSubmit={handleCreateUser}
      />
      
      <EditUserDialog 
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        onSubmit={handleEditUser}
        subscriptions={userSubscriptions}
        isAdmin={isAdmin}
        isSuperAdmin={isSuperAdmin}
      />
      
      <DeleteUserDialog 
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        selectedUser={selectedUser}
        onDelete={handleDeleteUser}
      />
    </>
  );
};

export default UserDialogsContainer;
