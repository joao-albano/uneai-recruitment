
import React from 'react';
import { PermissionType } from './types';
import PermissionItem from './PermissionItem';
import { categoryIcons } from './types';

interface PermissionCategoryProps {
  category: string;
  categoryName: string;
  permissions: PermissionType[];
  selectedPermissions: string[];
  onTogglePermission: (permissionId: string) => void;
  disabled: boolean;
}

const PermissionCategory: React.FC<PermissionCategoryProps> = ({
  category,
  categoryName,
  permissions,
  selectedPermissions,
  onTogglePermission,
  disabled
}) => {
  const Icon = categoryIcons[category];
  
  return (
    <div className="mb-4">
      <div className="flex items-center space-x-2 pb-2 mb-2 border-b">
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
        <h3 className="text-sm font-medium">{categoryName}</h3>
      </div>
      
      <div className="space-y-3 pl-1">
        {permissions.map((permission) => (
          <PermissionItem
            key={permission.id}
            permission={permission}
            isChecked={selectedPermissions.includes(permission.id)}
            onToggle={() => onTogglePermission(permission.id)}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
};

export default PermissionCategory;
