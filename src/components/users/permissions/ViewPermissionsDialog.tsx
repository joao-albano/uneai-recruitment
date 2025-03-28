
import React, { useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { userProfiles } from './permissionsData';
import { UserType } from '../types';
import UserPermissionsView from './UserPermissionsView';
import { ShieldAlert, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { userProfileDescriptions } from './types';

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
    let profile = 'Usuário Básico';
    
    if (user.isSuperAdmin) {
      permissions = userProfiles.superadmin;
      profile = 'Super Admin';
    } else if (user.role === 'admin') {
      permissions = userProfiles.admin;
      profile = 'Administrador';
    } else if (user.role === 'gestor') {
      permissions = userProfiles.gestor;
      profile = 'Gestor';
    } else if (user.role === 'coordenador') {
      permissions = userProfiles.coordenador;
      profile = 'Coordenador';
    } else if (user.role === 'gerente') {
      permissions = userProfiles.gerente;
      profile = 'Gerente';
    } else if (user.role === 'professor') {
      permissions = userProfiles.professor;
      profile = 'Professor';
    } else if (user.role === 'financeiro') {
      permissions = userProfiles.financeiro;
      profile = 'Financeiro';
    } else if (user.role === 'vendedor') {
      permissions = userProfiles.vendedor;
      profile = 'Vendedor';
    } else if (user.role === 'atendente') {
      permissions = userProfiles.atendente;
      profile = 'Atendente';
    } else {
      permissions = userProfiles.basico;
      profile = 'Usuário Básico';
    }
    
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
                {profileName}
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

export default React.memo(ViewPermissionsDialog);
