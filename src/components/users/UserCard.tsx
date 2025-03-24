
import React, { useState, useCallback, memo } from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MoreHorizontal, Edit, Trash, Users, ShieldAlert, Building, UserCheck } from "lucide-react";
import { ProductSubscription } from '@/context/ProductContext';
import { UserType } from './types';
import PermissionsDialog from './permissions/PermissionsDialog';
import ViewPermissionsDialog from './permissions/ViewPermissionsDialog';

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
  
  // Definindo a cor do avatar baseado no papel do usuário
  const avatarColor = user.isSuperAdmin
    ? "bg-amber-100 text-amber-800"
    : user.role === "admin"
    ? "bg-blue-100 text-blue-800"
    : "bg-gray-100 text-gray-800";

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
            <Avatar className={`h-12 w-12 ${avatarColor}`}>
              <AvatarFallback>{user.initials}</AvatarFallback>
            </Avatar>
            
            <div>
              <h3 className="font-medium text-base">{user.name}</h3>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              
              <div className="flex items-center gap-2 mt-1">
                <Badge 
                  variant={user.role === "admin" ? "default" : "secondary"}
                  className={user.role === "admin" 
                    ? (user.isSuperAdmin ? "bg-amber-100 text-amber-800 hover:bg-amber-100" : "bg-blue-100 text-blue-800 hover:bg-blue-100") 
                    : ""
                  }
                >
                  {user.isSuperAdmin 
                    ? "Super Admin" 
                    : user.role === "admin" 
                    ? "Admin" 
                    : "Usuário"}
                </Badge>
                
                {user.organizationName && (
                  <Badge variant="outline" className="text-xs">
                    <Building className="h-3 w-3 mr-1" />
                    {user.organizationName}
                  </Badge>
                )}
              </div>
            </div>
          </div>
          
          <DropdownMenu 
            open={dialogState.isDropdownOpen} 
            onOpenChange={handleDropdownOpenChange}
          >
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              <DropdownMenuItem onClick={handleEdit}>
                <Edit className="mr-2 h-4 w-4" />
                Editar
              </DropdownMenuItem>
              
              {/* Só permite gerenciar permissões se você for admin */}
              {isAdmin && (
                <DropdownMenuItem onClick={handleManagePermissions}>
                  <ShieldAlert className="mr-2 h-4 w-4" />
                  Gerenciar Permissões
                </DropdownMenuItem>
              )}
              
              <DropdownMenuItem onClick={handleViewPermissions}>
                <UserCheck className="mr-2 h-4 w-4" />
                Visualizar Permissões
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem 
                onClick={handleDelete}
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
        </div>
      </CardContent>
      
      <CardFooter className="bg-muted/50 py-3 px-6">
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center gap-1.5">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              {user.role === "admin" 
                ? "Acesso administrativo" 
                : "Acesso de usuário"}
            </span>
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8"
            onClick={handleManagePermissions}
          >
            <ShieldAlert className="h-3.5 w-3.5 mr-1" />
            Permissões
          </Button>
        </div>
      </CardFooter>
      
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
