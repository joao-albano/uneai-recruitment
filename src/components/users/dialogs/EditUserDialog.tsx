
import React from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ProductSubscription } from '@/context/ProductContext';
import { UserType } from '../types';
import AdminBanner from '../edit/AdminBanner';
import UserBasicInfoForm from '../edit/UserBasicInfoForm';
import SuperAdminToggle from '../edit/SuperAdminToggle';
import UserSubscriptions from '../edit/UserSubscriptions';

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
  // Safety check - render nothing if no selected user
  if (!selectedUser) {
    // Only return null if dialog is not open
    if (!open) return null;
    
    // If dialog is open but there's no user, close the dialog
    console.warn("EditUserDialog opened without a selected user");
    setTimeout(() => onOpenChange(false), 0);
    return null;
  }
  
  // Check if the user is the super admin of UNE CX
  const isUneCxAdmin = selectedUser.isSuperAdmin;
  
  // Handle form submission with error prevention
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      if (onSubmit && selectedUser) {
        onSubmit(e);
      } else {
        console.error("Cannot submit - no user selected or no submit handler");
      }
    } catch (error) {
      console.error("Erro ao submeter formulário:", error);
    }
  };
  
  // Handle dialog close safely
  const handleDialogClose = (isOpen: boolean) => {
    try {
      if (!isOpen) {
        // Call the parent onOpenChange to close the dialog
        onOpenChange(false);
      }
    } catch (error) {
      console.error("Error handling dialog close:", error);
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
            <AdminBanner isUneCxAdmin={isUneCxAdmin} />
            
            <UserBasicInfoForm
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
              isSuperAdmin={isSuperAdmin}
              isUneCxAdmin={isUneCxAdmin}
            />
            
            <SuperAdminToggle
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
              isSuperAdmin={isSuperAdmin}
              isUneCxAdmin={isUneCxAdmin}
            />
            
            <UserSubscriptions
              selectedUser={selectedUser}
              subscriptions={subscriptions}
              isAdmin={isAdmin}
              isSuperAdmin={isSuperAdmin}
            />
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

export default React.memo(EditUserDialog);
