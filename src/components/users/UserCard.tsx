
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
  // Use estados apenas quando realmente necessário
  const [dialogState, setDialogState] = useState({
    showPermissionsDialog: false,
    showViewPermissionsDialog: false,
    isDropdownOpen: false
  });
  
  // Handlers memoizados para evitar re-renderizações
  const handleEdit = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onEdit(user);
    setDialogState(prev => ({ ...prev, isDropdownOpen: false }));
  }, [user, onEdit]);
  
  const handleDelete = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete(user);
    setDialogState(prev => ({ ...prev, isDropdownOpen: false }));
  }, [user, onDelete]);
  
  const handleManagePermissions = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDialogState(prev => ({ 
      ...prev, 
      showPermissionsDialog: true,
      isDropdownOpen: false 
    }));
  }, []);
  
  const handleViewPermissions = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDialogState(prev => ({ 
      ...prev, 
      showViewPermissionsDialog: true,
      isDropdownOpen: false 
    }));
  }, []);
  
  const handleDropdownOpenChange = useCallback((open: boolean) => {
    setDialogState(prev => ({ ...prev, isDropdownOpen: open }));
  }, []);
  
  const handlePermissionsDialogChange = useCallback((open: boolean) => {
    setDialogState(prev => ({ ...prev, showPermissionsDialog: open }));
  }, []);
  
  const handleViewPermissionsDialogChange = useCallback((open: boolean) => {
    setDialogState(prev => ({ ...prev, showViewPermissionsDialog: open }));
  }, []);
  
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
      
      {/* Only render dialogs when they're open to improve performance */}
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

// Memoizando o componente para evitar re-renderizações desnecessárias
export default memo(UserCard);
