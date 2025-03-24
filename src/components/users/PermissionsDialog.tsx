
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ShieldAlert, Users, FileText, Calendar, BarChart2, Settings } from "lucide-react";
import { UserType } from './UsersContent';
import { useToast } from "@/hooks/use-toast";

interface PermissionType {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
}

interface PermissionsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: UserType;
}

const PermissionsDialog: React.FC<PermissionsDialogProps> = ({ open, onOpenChange, user }) => {
  const { toast } = useToast();
  
  // Lista de permissões disponíveis no sistema
  const availablePermissions: PermissionType[] = [
    {
      id: 'view_dashboard',
      name: 'Visualizar Dashboard',
      description: 'Permite visualizar o painel de controle do sistema',
      icon: BarChart2
    },
    {
      id: 'manage_users',
      name: 'Gerenciar Usuários',
      description: 'Permite adicionar, editar e remover usuários',
      icon: Users
    },
    {
      id: 'view_reports',
      name: 'Visualizar Relatórios',
      description: 'Permite acessar relatórios do sistema',
      icon: FileText
    },
    {
      id: 'manage_schedules',
      name: 'Gerenciar Agendamentos',
      description: 'Permite criar e editar agendamentos',
      icon: Calendar
    },
    {
      id: 'access_settings',
      name: 'Configurações do Sistema',
      description: 'Permite modificar configurações do sistema',
      icon: Settings
    }
  ];
  
  // Estado para controlar as permissões selecionadas
  // Se o usuário for admin, todas as permissões são inicialmente selecionadas
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>(
    user.role === 'admin' ? availablePermissions.map(p => p.id) : []
  );
  
  const handleTogglePermission = (permissionId: string) => {
    setSelectedPermissions(prev => {
      if (prev.includes(permissionId)) {
        return prev.filter(id => id !== permissionId);
      } else {
        return [...prev, permissionId];
      }
    });
  };
  
  const handleSavePermissions = () => {
    // Aqui você implementaria a lógica para salvar as permissões no backend
    toast({
      title: "Permissões atualizadas",
      description: `As permissões de ${user.name} foram atualizadas com sucesso.`
    });
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-primary" />
            <DialogTitle>Permissões de Usuário</DialogTitle>
          </div>
          <DialogDescription>
            Gerencie as permissões de acesso para <span className="font-semibold">{user.name}</span>
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
          <div className="flex items-center space-x-2 pb-2 border-b">
            <ShieldAlert className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-medium">Permissões de Acesso</h3>
          </div>
          
          <div className="space-y-4">
            {availablePermissions.map((permission) => {
              const Icon = permission.icon;
              return (
                <div key={permission.id} className="flex items-start space-x-3 py-2">
                  <Checkbox 
                    id={permission.id} 
                    checked={selectedPermissions.includes(permission.id)}
                    onCheckedChange={() => handleTogglePermission(permission.id)}
                    disabled={user.role === 'admin' && permission.id === 'view_dashboard'}
                  />
                  <div className="grid gap-1.5">
                    <Label 
                      htmlFor={permission.id}
                      className="flex items-center gap-1.5 font-medium text-sm"
                    >
                      <Icon className="h-4 w-4 text-muted-foreground" />
                      {permission.name}
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      {permission.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          
          {user.role === 'admin' && (
            <div className="flex items-center space-x-2 py-2 px-3 bg-muted/50 rounded-md">
              <ShieldAlert className="h-4 w-4 text-primary" />
              <p className="text-xs text-muted-foreground">
                Usuários com perfil de Administrador têm acesso completo ao sistema.
              </p>
            </div>
          )}
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
