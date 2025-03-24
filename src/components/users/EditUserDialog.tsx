
import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ProductSubscription } from '@/context/ProductContext';
import { UserType } from './types';
import { Badge } from "@/components/ui/badge";
import { InfoIcon } from "lucide-react";

interface EditUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedUser: UserType | null;
  setSelectedUser: React.Dispatch<React.SetStateAction<UserType | null>>;
  onSubmit: (e: React.FormEvent) => void;
  subscriptions?: ProductSubscription[];
  isAdmin?: boolean;
  isSuperAdmin?: boolean;
}

const EditUserDialog: React.FC<EditUserDialogProps> = ({
  open,
  onOpenChange,
  selectedUser,
  setSelectedUser,
  onSubmit,
  subscriptions = [],
  isAdmin = false,
  isSuperAdmin = false
}) => {
  // Safety check - if no selected user, don't render the dialog
  if (!selectedUser) return null;
  
  // Clean up function to prevent memory leaks and state issues
  const handleDialogClose = (isOpen: boolean) => {
    try {
      // If dialog is closing
      if (!isOpen) {
        // Use the callback to ensure we're working with latest state
        onOpenChange(false);
      }
    } catch (error) {
      console.error("Error handling dialog close:", error);
    }
  };
  
  // Tradução dos tipos de produto
  const productNames: Record<string, string> = {
    'retention': 'Retenção',
    'billing': 'Cobrança',
    'recruitment': 'Recrutamento'
  };
  
  const userOrgSubscriptions = subscriptions.filter(
    sub => sub.organizationId === selectedUser.organizationId
  );
  
  // Verificar se o usuário é o super admin da UNE CX
  const isUneCxAdmin = selectedUser.isSuperAdmin;
  
  // Manipuladores de eventos seguros
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedUser) return;
    try {
      setSelectedUser(prev => {
        if (!prev) return null;
        return {...prev, name: e.target.value};
      });
    } catch (error) {
      console.error("Erro ao atualizar nome:", error);
    }
  };
  
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedUser) return;
    try {
      setSelectedUser(prev => {
        if (!prev) return null;
        return {...prev, email: e.target.value};
      });
    } catch (error) {
      console.error("Erro ao atualizar email:", error);
    }
  };
  
  const handleRoleChange = (value: string) => {
    if (!selectedUser) return;
    try {
      setSelectedUser(prev => {
        if (!prev) return null;
        return {...prev, role: value};
      });
    } catch (error) {
      console.error("Erro ao atualizar função:", error);
    }
  };
  
  const handleSuperAdminChange = (checked: boolean) => {
    if (!selectedUser) return;
    try {
      setSelectedUser(prev => {
        if (!prev) return null;
        return {...prev, isSuperAdmin: checked};
      });
    } catch (error) {
      console.error("Erro ao atualizar status de Super Admin:", error);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      if (onSubmit) {
        onSubmit(e);
      }
    } catch (error) {
      console.error("Erro ao submeter formulário:", error);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Editar Usuário</DialogTitle>
          <DialogDescription>
            Altere as informações do usuário
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {isUneCxAdmin && (
              <div className="bg-amber-50 border border-amber-200 rounded-md p-3 mb-2">
                <div className="flex items-center gap-2">
                  <InfoIcon className="h-4 w-4 text-amber-500" />
                  <p className="text-sm text-amber-700 font-medium">Administrador principal do sistema</p>
                </div>
                <p className="text-xs text-amber-600 mt-1">
                  Este usuário possui privilégios de administração em todo o sistema UNE CX.
                </p>
              </div>
            )}
            
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Nome</Label>
              <Input 
                id="edit-name" 
                value={selectedUser.name}
                onChange={handleNameChange}
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="edit-email">Email</Label>
              <Input 
                id="edit-email" 
                type="email"
                value={selectedUser.email}
                onChange={handleEmailChange}
                required
              />
            </div>
            
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="edit-role">Função</Label>
                {selectedUser.organizationName && (
                  <Badge variant="outline" className="text-xs">
                    {selectedUser.organizationName}
                  </Badge>
                )}
              </div>
              
              <Select 
                value={selectedUser.role}
                onValueChange={handleRoleChange}
                disabled={isUneCxAdmin && !isSuperAdmin} // Apenas super admin pode mudar a função do admin UNE CX
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma função" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">Usuário</SelectItem>
                  <SelectItem value="admin">Administrador</SelectItem>
                  {isSuperAdmin && (
                    <SelectItem value="superadmin">Super Admin (UNE CX)</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
            
            {/* Super Admin pode alterar se um usuário é super admin ou não */}
            {isSuperAdmin && !isUneCxAdmin && (
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
            )}
            
            {/* Produtos ativos só podem ser editados por Super Admins ou Admins da mesma organização */}
            {((isAdmin && userOrgSubscriptions.length > 0) || isSuperAdmin) && (
              <div className="grid gap-2 pt-3 border-t">
                <Label className="mb-2">Produtos Ativos</Label>
                <div className="grid gap-2">
                  {userOrgSubscriptions.map(sub => (
                    <div key={sub.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`product-${sub.id}`} 
                        checked={sub.active} 
                        disabled={!isSuperAdmin && selectedUser.organizationId !== selectedUser.organizationId}
                        // Na implementação real, isso chamaria uma API para atualizar a assinatura
                      />
                      <Label 
                        htmlFor={`product-${sub.id}`}
                        className="text-sm font-normal"
                      >
                        {productNames[sub.productType] || sub.productType}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              type="button" 
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit">Salvar Alterações</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserDialog;
