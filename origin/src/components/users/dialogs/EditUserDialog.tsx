
import React from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ProductSubscription } from '@/context/ProductContext';
import { UserType } from '../types';
import AdminBanner from '../edit/AdminBanner';
import UserBasicInfoForm from '../edit/UserBasicInfoForm';
import SuperAdminToggle from '../edit/SuperAdminToggle';
import UserSubscriptions from '../edit/UserSubscriptions';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();
  
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
  
  // Safety check - if no selected user and dialog is closed, return null
  if (!selectedUser && !open) {
    return null;
  }
  
  // If dialog is open but there's no user, we need to handle this case
  // by closing the dialog - but we need to render something first
  if (!selectedUser && open) {
    // Schedule dialog close for next tick
    setTimeout(() => onOpenChange(false), 0);
    
    // Render a placeholder dialog while closing
    return (
      <Dialog open={open} onOpenChange={handleDialogClose}>
        <DialogContent className={`${isMobile ? 'w-[95vw] max-w-none p-4' : 'max-w-lg p-6'}`}>
          <DialogHeader>
            <DialogTitle>Erro</DialogTitle>
            <DialogDescription>
              Não foi possível carregar os dados do usuário.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => onOpenChange(false)}>Fechar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
  
  // At this point, we know selectedUser exists
  const isUneCxAdmin = selectedUser?.isSuperAdmin || false;
  
  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className={`${isMobile ? 'w-[95vw] max-w-none p-4' : 'max-w-lg p-6'}`}>
        <DialogHeader>
          <DialogTitle>Editar Usuário</DialogTitle>
          <DialogDescription>
            Altere as informações do usuário
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[70vh]">
          <div className="grid gap-4 py-4">
            <AdminBanner isUneCxAdmin={isUneCxAdmin} />
            
            {selectedUser && (
              <UserBasicInfoForm
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
                isSuperAdmin={isSuperAdmin}
                isUneCxAdmin={isUneCxAdmin}
              />
            )}
            
            {selectedUser && (
              <SuperAdminToggle
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
                isSuperAdmin={isSuperAdmin}
                isUneCxAdmin={isUneCxAdmin}
              />
            )}
            
            {selectedUser && (
              <UserSubscriptions
                selectedUser={selectedUser}
                subscriptions={subscriptions}
                isAdmin={isAdmin}
                isSuperAdmin={isSuperAdmin}
              />
            )}
          </div>
          
          <DialogFooter className={`${isMobile ? 'flex-col gap-2 mt-4' : 'mt-6'}`}>
            <Button 
              variant="outline" 
              type="button" 
              onClick={() => onOpenChange(false)}
              className={isMobile ? "w-full" : ""}
            >
              Cancelar
            </Button>
            <Button 
              type="submit"
              className={isMobile ? "w-full" : ""}
            >
              Salvar Alterações
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default React.memo(EditUserDialog);
