
import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { UserType } from '../types';
import { updateUserSuperAdminStatus } from '../utils/userUtils';

interface SuperAdminToggleProps {
  selectedUser: UserType;
  setSelectedUser: React.Dispatch<React.SetStateAction<UserType | null>>;
  isSuperAdmin: boolean;
  isUneCxAdmin: boolean;
}

const SuperAdminToggle: React.FC<SuperAdminToggleProps> = ({
  selectedUser,
  setSelectedUser,
  isSuperAdmin,
  isUneCxAdmin
}) => {
  if (!isSuperAdmin || isUneCxAdmin) return null;
  
  const handleSuperAdminChange = (checked: boolean) => {
    const updatedUser = updateUserSuperAdminStatus(selectedUser, checked);
    if (updatedUser) setSelectedUser(updatedUser);
  };
  
  return (
    <div className="grid gap-2 pt-3 border-t">
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="super-admin-toggle" 
          checked={selectedUser.isSuperAdmin || false}
          onCheckedChange={handleSuperAdminChange}
        />
        <Label 
          htmlFor="super-admin-toggle"
          className="text-sm font-medium"
        >
          Administrador da UNE CX
        </Label>
      </div>
      <p className="text-xs text-muted-foreground ml-6">
        Administradores da UNE CX têm acesso completo a todas as organizações e recursos do sistema.
      </p>
    </div>
  );
};

export default SuperAdminToggle;
