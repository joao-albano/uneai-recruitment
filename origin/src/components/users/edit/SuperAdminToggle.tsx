
import React from 'react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { UserType } from '../types';
import { ShieldAlert } from 'lucide-react';

interface SuperAdminToggleProps {
  selectedUser: UserType;
  setSelectedUser: React.Dispatch<React.SetStateAction<UserType | null>>;
  isSuperAdmin?: boolean;
  isUneCxAdmin?: boolean;
}

const SuperAdminToggle: React.FC<SuperAdminToggleProps> = ({
  selectedUser,
  setSelectedUser,
  isSuperAdmin = false,
  isUneCxAdmin = false
}) => {
  // Mostrar apenas para super admins e quando não está editando outro super admin
  if (!isSuperAdmin || isUneCxAdmin) {
    return null;
  }
  
  const handleToggle = (checked: boolean) => {
    if (!selectedUser) return;
    
    setSelectedUser({ 
      ...selectedUser, 
      isSuperAdmin: checked,
      // Se estiver habilitando super admin, definir também como admin
      role: checked ? 'admin' : selectedUser.role
    });
  };
  
  return (
    <div className="space-y-4">
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
          checked={Boolean(selectedUser.isSuperAdmin)}
          onCheckedChange={handleToggle}
        />
      </div>
    </div>
  );
};

export default SuperAdminToggle;
