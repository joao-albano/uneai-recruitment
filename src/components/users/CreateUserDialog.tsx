
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ShieldAlert } from 'lucide-react';
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
  
  const handleSuperAdminToggle = (checked: boolean) => {
    setNewUser(prev => ({
      ...prev,
      isSuperAdmin: checked,
      // If enabling super admin, also set role to admin
      role: checked ? 'admin' : prev.role
    }));
  };
  
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
          
          {isSuperAdmin && (
            <div className="space-y-4 py-4">
              <Alert className="bg-amber-50 border-amber-200">
                <ShieldAlert className="h-4 w-4 text-amber-600" />
                <AlertDescription className="text-amber-800 text-sm">
                  Super Admins têm acesso completo ao sistema, incluindo todas as organizações e configurações.
                </AlertDescription>
              </Alert>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="super-admin" className="text-base font-medium">
                  Super Admin
                </Label>
                <Switch
                  id="super-admin"
                  checked={Boolean(newUser.isSuperAdmin)}
                  onCheckedChange={handleSuperAdminToggle}
                />
              </div>
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
