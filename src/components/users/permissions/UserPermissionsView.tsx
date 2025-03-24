
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Check, X } from "lucide-react";
import { categoryNames, categoryIcons, PermissionType } from './types';
import { availablePermissions } from './permissionsData';

interface UserPermissionsViewProps {
  userPermissions: string[];
  showTitle?: boolean;
}

const UserPermissionsView: React.FC<UserPermissionsViewProps> = ({ 
  userPermissions, 
  showTitle = true 
}) => {
  // Agrupar permissões por categoria
  const groupedPermissions = availablePermissions.reduce<Record<string, PermissionType[]>>(
    (acc, permission) => {
      if (!acc[permission.category]) {
        acc[permission.category] = [];
      }
      acc[permission.category].push(permission);
      return acc;
    },
    {}
  );

  return (
    <div className="space-y-4">
      {showTitle && (
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-medium">Permissões do Usuário</h3>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <span className="w-4 h-4 flex items-center justify-center rounded-full bg-green-100">
                <Check className="h-3 w-3 text-green-600" />
              </span>
              <span>Ativo</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-4 h-4 flex items-center justify-center rounded-full bg-gray-100">
                <X className="h-3 w-3 text-gray-400" />
              </span>
              <span>Inativo</span>
            </div>
          </div>
        </div>
      )}

      <ScrollArea className="h-[350px] pr-4">
        {Object.entries(groupedPermissions).map(([category, permissions]) => {
          const Icon = categoryIcons[category];
          
          return (
            <div key={category} className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
                <h4 className="text-sm font-medium">{categoryNames[category] || category}</h4>
              </div>
              
              <div className="space-y-2 pl-2">
                {permissions.map((permission) => {
                  const isActive = userPermissions.includes(permission.id);
                  
                  return (
                    <div key={permission.id} className="flex items-center gap-2">
                      <span className={`w-4 h-4 flex items-center justify-center rounded-full ${
                        isActive ? 'bg-green-100' : 'bg-gray-100'
                      }`}>
                        {isActive ? (
                          <Check className="h-3 w-3 text-green-600" />
                        ) : (
                          <X className="h-3 w-3 text-gray-400" />
                        )}
                      </span>
                      <span className="text-xs">{permission.name}</span>
                    </div>
                  );
                })}
              </div>
              
              <Separator className="my-3" />
            </div>
          );
        })}
      </ScrollArea>
    </div>
  );
};

export default UserPermissionsView;
