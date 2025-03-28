
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ShieldAlert } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PermissionsDialogProps, PermissionType } from './types';
import { availablePermissions, userProfiles } from './permissionsData';
import ProfileSelector from './ProfileSelector';
import PermissionsList from './PermissionsList';

const PermissionsDialog: React.FC<PermissionsDialogProps> = ({ open, onOpenChange, user }) => {
  const { toast } = useToast();
  const isSuperAdmin = user.isSuperAdmin;
  const isAdmin = user.role === 'admin';
  
  // Get the initial permissions based on the user's role
  const getInitialPermissions = () => {
    if (isSuperAdmin) return userProfiles.superadmin;
    if (isAdmin) return userProfiles.admin;
    if (user.role === 'gestor') return userProfiles.gestor;
    if (user.role === 'coordenador') return userProfiles.coordenador;
    if (user.role === 'gerente') return userProfiles.gerente;
    if (user.role === 'professor') return userProfiles.professor;
    if (user.role === 'financeiro') return userProfiles.financeiro;
    if (user.role === 'vendedor') return userProfiles.vendedor;
    if (user.role === 'atendente') return userProfiles.atendente;
    return userProfiles.basico;
  };
  
  // Estado para controlar as permissões selecionadas
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>(getInitialPermissions());
  
  // Estado para controlar o perfil atual selecionado
  const [selectedProfile, setSelectedProfile] = useState<string>(
    isSuperAdmin ? 'superadmin' : 
    isAdmin ? 'admin' : 
    user.role || 'basico'
  );
  
  // Reset permissions when user changes
  useEffect(() => {
    if (open) {
      setSelectedPermissions(getInitialPermissions());
      setSelectedProfile(
        isSuperAdmin ? 'superadmin' : 
        isAdmin ? 'admin' : 
        user.role || 'basico'
      );
    }
  }, [open, user, isSuperAdmin, isAdmin]);
  
  // Função para aplicar perfil de usuário
  const handleApplyProfile = (profile: keyof typeof userProfiles) => {
    setSelectedPermissions(userProfiles[profile]);
    setSelectedProfile(profile);
  };
  
  // Função para alternar permissão
  const handleTogglePermission = (permissionId: string) => {
    setSelectedPermissions(prev => {
      if (prev.includes(permissionId)) {
        // Se estamos removendo uma permissão, o perfil não é mais exatamente o predefinido
        setSelectedProfile('personalizado');
        return prev.filter(id => id !== permissionId);
      } else {
        // Se estamos adicionando uma permissão, o perfil não é mais exatamente o predefinido
        setSelectedProfile('personalizado');
        return [...prev, permissionId];
      }
    });
  };
  
  // Função para salvar permissões
  const handleSavePermissions = () => {
    // Aqui você implementaria a lógica para salvar as permissões no backend
    toast({
      title: "Permissões atualizadas",
      description: `As permissões de ${user.name} foram atualizadas com sucesso.`
    });
    onOpenChange(false);
  };
  
  // Agrupar permissões por categoria
  const groupedPermissions = availablePermissions.reduce<Record<string, PermissionType[]>>(
    (acc, permission) => {
      if (!acc[permission.category]) {
        acc[permission.category] = [];
      }
      acc[permission.category].push(permission);
      return acc;
    },
    {}
  );
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[650px]">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-primary" />
            <DialogTitle>Permissões de Usuário</DialogTitle>
          </div>
          <DialogDescription>
            Gerencie as permissões de acesso para <span className="font-semibold">{user.name}</span>
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-2">
          <ProfileSelector 
            selectedProfile={selectedProfile}
            onSelectProfile={handleApplyProfile}
            isAdmin={isSuperAdmin || isAdmin}
          />
          
          <PermissionsList 
            groupedPermissions={groupedPermissions}
            selectedPermissions={selectedPermissions}
            onTogglePermission={handleTogglePermission}
            isAdmin={isSuperAdmin || isAdmin}
          />
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSavePermissions}>
            Salvar Permissões
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PermissionsDialog;
