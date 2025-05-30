
import React from 'react';
import { PermissionType } from './types';
import PermissionCategory from './PermissionCategory';
import { categoryNames } from './types';
import { ShieldAlert } from "lucide-react";

interface PermissionsListProps {
  groupedPermissions: Record<string, PermissionType[]>;
  selectedPermissions: string[];
  onTogglePermission: (permissionId: string) => void;
  isAdmin: boolean;
}

const PermissionsList: React.FC<PermissionsListProps> = ({
  groupedPermissions,
  selectedPermissions,
  onTogglePermission,
  isAdmin
}) => {
  return (
    <div className="max-h-[400px] overflow-y-auto pr-2">
      {Object.entries(groupedPermissions).map(([category, permissions]) => (
        <PermissionCategory
          key={category}
          category={category}
          categoryName={categoryNames[category] || category}
          permissions={permissions}
          selectedPermissions={selectedPermissions}
          onTogglePermission={onTogglePermission}
          disabled={isAdmin}
        />
      ))}
      
      {isAdmin && (
        <div className="flex items-center space-x-2 py-2 px-3 bg-muted/50 rounded-md mt-4">
          <ShieldAlert className="h-4 w-4 text-primary" />
          <p className="text-xs text-muted-foreground">
            Usuários com perfil de Administrador têm acesso completo ao sistema.
          </p>
        </div>
      )}
    </div>
  );
};

export default PermissionsList;
