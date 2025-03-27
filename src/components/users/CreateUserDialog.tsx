
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { NewUserType } from './types';
import { useAuth } from '@/context/auth';
import { useToast } from '@/hooks/use-toast';
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
  const { toast } = useToast();
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
  
  // Reset organization checked state when dialog closes
  useEffect(() => {
    if (!open) {
      setOrganizationChecked(false);
    }
  }, [open]);
  
  // Habilitar criação de usuário fictício (para testes)
  const enableFictitiousUserCreation = true;
  
  // Verificar se é possível criar um usuário
  const canCreateUser = enableFictitiousUserCreation || 
    (isSuperAdmin ? !!newUser.organizationId : !!currentUser?.organizationId);
  
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
          
          {!canCreateUser && isSuperAdmin && !enableFictitiousUserCreation && (
            <div className="text-sm text-amber-500 mt-2">
              É necessário criar pelo menos uma organização antes de adicionar usuários.
            </div>
          )}
          
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
