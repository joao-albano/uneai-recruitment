
import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { PermissionType } from './types';

interface PermissionItemProps {
  permission: PermissionType;
  isChecked: boolean;
  onToggle: () => void;
  disabled: boolean;
}

const PermissionItem: React.FC<PermissionItemProps> = ({
  permission,
  isChecked,
  onToggle,
  disabled
}) => {
  const Icon = permission.icon;
  
  return (
    <div className="flex items-start space-x-3 py-1">
      <Checkbox 
        id={permission.id} 
        checked={isChecked}
        onCheckedChange={onToggle}
        disabled={disabled}
      />
      <div className="grid gap-1">
        <Label 
          htmlFor={permission.id}
          className="flex items-center gap-1.5 font-medium text-sm"
        >
          <Icon className="h-4 w-4 text-muted-foreground" />
          {permission.name}
        </Label>
        <p className="text-xs text-muted-foreground">
          {permission.description}
        </p>
      </div>
    </div>
  );
};

export default PermissionItem;
