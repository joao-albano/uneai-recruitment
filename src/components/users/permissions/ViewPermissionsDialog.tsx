
import React, { useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { userProfiles } from './permissionsData';
import { UserType } from '../types';
import UserPermissionsView from './UserPermissionsView';
import { ShieldAlert, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ViewPermissionsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: UserType;
}

const ViewPermissionsDialog: React.FC<ViewPermissionsDialogProps> = ({
  open,
  onOpenChange,
  user
}) => {
  // Usando useMemo para evitar recálculos desnecessários
  const { userPermissions, profileName } = useMemo(() => {
    let permissions: string[] = [];
    
    if (user.role === 'admin' || user.isSuperAdmin) {
      permissions = userProfiles.admin;
    } else {
      permissions = userProfiles.basico;
    }
    
    const profile = user.role === 'admin' ? 'Administrador' : 'Usuário Básico';
    
    return { 
      userPermissions: permissions,
      profileName: profile
    };
  }, [user.role, user.isSuperAdmin]);
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-primary" />
            <DialogTitle>Permissões do Usuário</DialogTitle>
          </div>
          <DialogDescription>
            <div className="flex items-center justify-between">
              <span>
                Visualizando permissões de <span className="font-semibold">{user.name}</span>
              </span>
              <Badge 
                variant="outline" 
                className={user.isSuperAdmin ? "bg-amber-50 text-amber-700 border-amber-200" : ""}
              >
                <Check className="mr-1 h-3 w-3" />
                {user.isSuperAdmin ? "Super Admin" : profileName}
              </Badge>
            </div>
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-2">
          <UserPermissionsView userPermissions={userPermissions} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewPermissionsDialog;
