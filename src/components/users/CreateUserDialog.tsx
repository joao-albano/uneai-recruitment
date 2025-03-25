
import React, { useEffect } from 'react';
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
  const { currentUser, isSuperAdmin, isAdmin } = useAuth();
  const { toast } = useToast();
  
  // Pre-select organization for non-superadmin users
  useEffect(() => {
    if (open && !isSuperAdmin && currentUser?.organizationId && !newUser.organizationId) {
      setNewUser(prev => ({ 
        ...prev, 
        organizationId: currentUser.organizationId || ''
      }));
    }
  }, [open, currentUser, isSuperAdmin, newUser.organizationId, setNewUser]);
  
  // Verificar se é possível criar um usuário (organização selecionada)
  const canCreateUser = isSuperAdmin ? 
    !!newUser.organizationId : 
    !!currentUser?.organizationId;
  
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
          
          {!canCreateUser && isSuperAdmin && (
            <div className="text-sm text-amber-500 mt-2">
              É necessário criar pelo menos uma organização antes de adicionar usuários.
            </div>
          )}
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={!canCreateUser && isSuperAdmin}>
              Adicionar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUserDialog;
