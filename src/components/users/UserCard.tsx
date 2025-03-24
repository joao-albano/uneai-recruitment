
import React, { useState } from 'react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, MoreHorizontal, ShieldAlert, Trash, User, Package } from "lucide-react";
import PermissionsDialog from './permissions/PermissionsDialog';
import { ProductSubscription } from '@/context/ProductContext';
import { UserType } from './types';

interface UserCardProps {
  user: UserType;
  onEdit: (user: UserType) => void;
  onDelete: (user: UserType) => void;
  isLastAdmin: boolean;
  userSubscriptions: ProductSubscription[];
  isAdmin: boolean;
}

const UserCard: React.FC<UserCardProps> = ({ 
  user, 
  onEdit, 
  onDelete, 
  isLastAdmin,
  userSubscriptions,
  isAdmin
}) => {
  const [showPermissionsDialog, setShowPermissionsDialog] = useState(false);
  
  // Tradução dos tipos de produto
  const productNames: Record<string, string> = {
    'retention': 'Retenção',
    'billing': 'Cobrança',
    'recruitment': 'Recrutamento'
  };
  
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className={user.role === 'admin' ? 'border-2 border-primary' : ''}>
              <AvatarFallback>{user.initials}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-base font-semibold">{user.name}</CardTitle>
              <CardDescription className="text-xs">{user.email}</CardDescription>
              {user.organizationId && (
                <CardDescription className="text-xs">
                  Org: {user.organizationName || user.organizationId}
                </CardDescription>
              )}
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onEdit(user)}>
                <Edit className="mr-2 h-4 w-4" />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="text-destructive" 
                onClick={() => onDelete(user)}
                disabled={user.role === 'admin' && isLastAdmin}
              >
                <Trash className="mr-2 h-4 w-4" />
                Remover
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1.5">
              {user.role === 'admin' ? (
                <>
                  <ShieldAlert className="h-4 w-4 text-primary" />
                  <span className="font-medium text-primary">Administrador</span>
                </>
              ) : (
                <>
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Usuário</span>
                </>
              )}
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 px-2"
              onClick={() => setShowPermissionsDialog(true)}
            >
              <ShieldAlert className="h-3.5 w-3.5 mr-1" />
              <span className="text-xs">Permissões</span>
            </Button>
          </div>
          
          {/* Assinaturas do usuário */}
          {(userSubscriptions.length > 0 || isAdmin) && (
            <div className="pt-2 border-t">
              <div className="flex items-center gap-1.5 mb-1.5 text-sm">
                <Package className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Produtos Ativos</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {userSubscriptions.length > 0 ? (
                  userSubscriptions
                    .filter(sub => sub.active)
                    .map(sub => (
                      <Badge 
                        key={sub.id} 
                        variant="outline" 
                        className="text-xs bg-green-50 border-green-200 text-green-700"
                      >
                        {productNames[sub.productType] || sub.productType}
                      </Badge>
                    ))
                ) : (
                  <span className="text-xs text-muted-foreground">
                    {isAdmin ? 'Acesso completo' : 'Nenhum produto ativo'}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
      
      <PermissionsDialog 
        open={showPermissionsDialog}
        onOpenChange={setShowPermissionsDialog}
        user={user}
      />
    </Card>
  );
};

export default UserCard;
