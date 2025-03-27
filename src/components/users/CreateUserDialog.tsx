
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { NewUserType } from './types';
import { useAuth } from '@/context/auth';
import CreateUserForm from './create/CreateUserForm';

interface CreateUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newUser: NewUserType;
  setNewUser: React.Dispatch<React.SetStateAction<NewUserType>>;
  onSubmit: (e: React.FormEvent) => void;
}

const CreateUserDialog: React.FC<CreateUserDialogProps> = ({
  open,
  onOpenChange,
  newUser,
  setNewUser,
  onSubmit
}) => {
  const { currentUser, isSuperAdmin } = useAuth();
  const [organizationChecked, setOrganizationChecked] = useState(false);
  
  // Pre-select organization for non-superadmin users
  useEffect(() => {
    if (open && !organizationChecked) {
      setOrganizationChecked(true);
      
      if (!isSuperAdmin && currentUser?.organizationId) {
        setNewUser(prev => ({ 
          ...prev, 
          organizationId: currentUser.organizationId || '',
          organizationName: currentUser.organization?.name || 'Minha Organização'
        }));
      }
    }
  }, [open, currentUser, isSuperAdmin, setNewUser, organizationChecked]);
  
  // Reset states when dialog closes
  useEffect(() => {
    if (!open) {
      setOrganizationChecked(false);
    }
  }, [open]);
  
  // Always enable creation of users
  const canCreateUser = true;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Usuário</DialogTitle>
          <DialogDescription>
            Preencha os dados do novo usuário.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={onSubmit}>
          <CreateUserForm newUser={newUser} setNewUser={setNewUser} />
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={!canCreateUser}>
              Adicionar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUserDialog;
