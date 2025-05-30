
import React, { useState, useCallback, memo } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ProductSubscription } from '@/context/ProductContext';
import { UserType } from './types';
import PermissionsDialog from './permissions/PermissionsDialog';
import ViewPermissionsDialog from './permissions/ViewPermissionsDialog';
import UserAvatar from './user-card/UserAvatar';
import UserInfo from './user-card/UserInfo';
import UserActions from './user-card/UserActions';
import UserCardFooter from './user-card/UserCardFooter';

interface UserCardProps {
  user: UserType;
  onEdit: (user: UserType) => void;
  onDelete: (user: UserType) => void;
  isLastAdmin?: boolean;
  subscriptions?: ProductSubscription[];
  isAdmin?: boolean;
  isSuperAdmin?: boolean;
}

const UserCard: React.FC<UserCardProps> = ({
  user,
  onEdit,
  onDelete,
  isLastAdmin = false,
  subscriptions = [],
  isAdmin = false,
  isSuperAdmin = false
}) => {
  // State management for dialogs and dropdown
  const [dialogState, setDialogState] = useState({
    showPermissionsDialog: false,
    showViewPermissionsDialog: false,
    isDropdownOpen: false
  });
  
  // Optimize state updates with useCallback
  const updateDialogState = useCallback((newState: Partial<typeof dialogState>) => {
    setDialogState(prev => ({ ...prev, ...newState }));
  }, []);
  
  // Event handlers
  const handleManagePermissions = useCallback(() => {
    updateDialogState({ 
      showPermissionsDialog: true,
      isDropdownOpen: false 
    });
  }, [updateDialogState]);
  
  const handleViewPermissions = useCallback(() => {
    updateDialogState({ 
      showViewPermissionsDialog: true,
      isDropdownOpen: false 
    });
  }, [updateDialogState]);
  
  const handleDropdownOpenChange = useCallback((open: boolean) => {
    updateDialogState({ isDropdownOpen: open });
  }, [updateDialogState]);
  
  const handlePermissionsDialogChange = useCallback((open: boolean) => {
    updateDialogState({ showPermissionsDialog: open });
  }, [updateDialogState]);
  
  const handleViewPermissionsDialogChange = useCallback((open: boolean) => {
    updateDialogState({ showViewPermissionsDialog: open });
  }, [updateDialogState]);
  
  // Memoize the edit and delete handlers to prevent recreating functions
  const handleEdit = useCallback((userToEdit: UserType) => {
    onEdit(userToEdit);
    updateDialogState({ isDropdownOpen: false });
  }, [onEdit, updateDialogState]);
  
  const handleDelete = useCallback((userToDelete: UserType) => {
    onDelete(userToDelete);
    updateDialogState({ isDropdownOpen: false });
  }, [onDelete, updateDialogState]);
  
  return (
    <Card className="shadow-sm hover:shadow transition-all">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            <UserAvatar user={user} />
            <UserInfo user={user} />
          </div>
          
          <UserActions 
            user={user}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onManagePermissions={handleManagePermissions}
            onViewPermissions={handleViewPermissions}
            isDropdownOpen={dialogState.isDropdownOpen}
            onDropdownOpenChange={handleDropdownOpenChange}
            isLastAdmin={isLastAdmin}
            isAdmin={isAdmin}
            isSuperAdmin={isSuperAdmin}
          />
        </div>
      </CardContent>
      
      <UserCardFooter 
        user={user}
        onManagePermissions={handleManagePermissions}
      />
      
      {/* Lazy-load dialogs only when they're open */}
      {dialogState.showPermissionsDialog && (
        <PermissionsDialog 
          open={dialogState.showPermissionsDialog} 
          onOpenChange={handlePermissionsDialogChange} 
          user={user} 
        />
      )}
      
      {dialogState.showViewPermissionsDialog && (
        <ViewPermissionsDialog 
          open={dialogState.showViewPermissionsDialog} 
          onOpenChange={handleViewPermissionsDialogChange} 
          user={user} 
        />
      )}
    </Card>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(UserCard);
