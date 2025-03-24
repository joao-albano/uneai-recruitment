
import React from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ProductSubscription } from '@/context/ProductContext';
import { UserType } from './types';

interface EditUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedUser: UserType | null;
  setSelectedUser: React.Dispatch<React.SetStateAction<UserType | null>>;
  onSubmit: (e: React.FormEvent) => void;
  subscriptions?: ProductSubscription[];
  isAdmin?: boolean;
}

const EditUserDialog: React.FC<EditUserDialogProps> = ({
  open,
  onOpenChange,
  selectedUser,
  setSelectedUser,
  onSubmit,
  subscriptions = [],
  isAdmin = false
}) => {
  if (!selectedUser) return null;
  
  // Tradução dos tipos de produto
  const productNames: Record<string, string> = {
    'retention': 'Retenção',
    'billing': 'Cobrança',
    'recruitment': 'Recrutamento'
  };
  
  const userOrgSubscriptions = subscriptions.filter(
    sub => sub.organizationId === selectedUser.organizationId
  );
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Editar Usuário</DialogTitle>
          <DialogDescription>
            Altere as informações do usuário
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={onSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Nome</Label>
              <Input 
                id="edit-name" 
                value={selectedUser.name}
                onChange={(e) => setSelectedUser({...selectedUser, name: e.target.value})}
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="edit-email">Email</Label>
              <Input 
                id="edit-email" 
                type="email"
                value={selectedUser.email}
                onChange={(e) => setSelectedUser({...selectedUser, email: e.target.value})}
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="edit-role">Função</Label>
              <Select 
                value={selectedUser.role}
                onValueChange={(value) => setSelectedUser({...selectedUser, role: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma função" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">Usuário</SelectItem>
                  <SelectItem value="admin">Administrador</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {isAdmin && userOrgSubscriptions.length > 0 && (
              <div className="grid gap-2 pt-3 border-t">
                <Label className="mb-2">Produtos Ativos</Label>
                <div className="grid gap-2">
                  {userOrgSubscriptions.map(sub => (
                    <div key={sub.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`product-${sub.id}`} 
                        checked={sub.active} 
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
            <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
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
