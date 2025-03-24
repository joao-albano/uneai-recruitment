
import React, { useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  MoreHorizontal, 
  Edit, 
  Trash, 
  ShieldAlert, 
  UserCheck 
} from "lucide-react";
import { UserType } from '../types';

interface UserActionsProps {
  user: UserType;
  onEdit: (user: UserType) => void;
  onDelete: (user: UserType) => void;
  onManagePermissions: () => void;
  onViewPermissions: () => void;
  isDropdownOpen: boolean;
  onDropdownOpenChange: (open: boolean) => void;
  isLastAdmin?: boolean;
  isAdmin?: boolean;
  isSuperAdmin?: boolean;
}

const UserActions: React.FC<UserActionsProps> = ({
  user,
  onEdit,
  onDelete,
  onManagePermissions,
  onViewPermissions,
  isDropdownOpen,
  onDropdownOpenChange,
  isLastAdmin = false,
  isAdmin = false,
  isSuperAdmin = false
}) => {
  return (
    <DropdownMenu 
      open={isDropdownOpen} 
      onOpenChange={onDropdownOpenChange}
    >
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Ações</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={onEdit}>
          <Edit className="mr-2 h-4 w-4" />
          Editar
        </DropdownMenuItem>
        
        {/* Só permite gerenciar permissões se você for admin */}
        {isAdmin && (
          <DropdownMenuItem onClick={onManagePermissions}>
            <ShieldAlert className="mr-2 h-4 w-4" />
            Gerenciar Permissões
          </DropdownMenuItem>
        )}
        
        <DropdownMenuItem onClick={onViewPermissions}>
          <UserCheck className="mr-2 h-4 w-4" />
          Visualizar Permissões
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          onClick={onDelete}
          disabled={
            // Não permite excluir o último admin da organização
            (isLastAdmin && user.role === "admin") ||
            // Não permite excluir o super admin a menos que você seja super admin
            (user.isSuperAdmin && !isSuperAdmin)
          }
          className="text-destructive"
        >
          <Trash className="mr-2 h-4 w-4" />
          Excluir
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default React.memo(UserActions);
