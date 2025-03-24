
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ShieldAlert, Users, FileText, Calendar, BarChart2, Settings, AlertTriangle, PenTool, Book, Bell, Lock } from "lucide-react";
import { UserType } from './UsersContent';
import { useToast } from "@/hooks/use-toast";

interface PermissionType {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  category: 'dashboard' | 'users' | 'reports' | 'schedules' | 'settings' | 'alerts';
}

interface PermissionsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: UserType;
}

const PermissionsDialog: React.FC<PermissionsDialogProps> = ({ open, onOpenChange, user }) => {
  const { toast } = useToast();
  
  // Lista de permissões disponíveis no sistema, agora organizadas por categoria
  const availablePermissions: PermissionType[] = [
    // Permissões de Dashboard
    {
      id: 'view_dashboard',
      name: 'Visualizar Dashboard',
      description: 'Permite visualizar o dashboard básico',
      icon: BarChart2,
      category: 'dashboard'
    },
    {
      id: 'view_advanced_stats',
      name: 'Estatísticas Avançadas',
      description: 'Acesso a visualizações e estatísticas avançadas no dashboard',
      icon: BarChart2,
      category: 'dashboard'
    },
    
    // Permissões de Usuários
    {
      id: 'view_users',
      name: 'Visualizar Usuários',
      description: 'Permite visualizar a lista de usuários',
      icon: Users,
      category: 'users'
    },
    {
      id: 'add_users',
      name: 'Adicionar Usuários',
      description: 'Permite criar novos usuários no sistema',
      icon: Users,
      category: 'users'
    },
    {
      id: 'edit_users',
      name: 'Editar Usuários',
      description: 'Permite modificar dados dos usuários existentes',
      icon: PenTool,
      category: 'users'
    },
    {
      id: 'delete_users',
      name: 'Excluir Usuários',
      description: 'Permite remover usuários do sistema',
      icon: Users,
      category: 'users'
    },
    {
      id: 'manage_permissions',
      name: 'Gerenciar Permissões',
      description: 'Permite modificar permissões de outros usuários',
      icon: Lock,
      category: 'users'
    },
    
    // Permissões de Relatórios
    {
      id: 'view_reports',
      name: 'Visualizar Relatórios',
      description: 'Acesso para visualizar relatórios básicos',
      icon: FileText,
      category: 'reports'
    },
    {
      id: 'export_reports',
      name: 'Exportar Relatórios',
      description: 'Permite exportar relatórios em diferentes formatos',
      icon: FileText,
      category: 'reports'
    },
    {
      id: 'create_reports',
      name: 'Criar Relatórios',
      description: 'Permite criar novos relatórios personalizados',
      icon: FileText,
      category: 'reports'
    },
    
    // Permissões de Agendamentos
    {
      id: 'view_schedules',
      name: 'Visualizar Agendamentos',
      description: 'Permite visualizar calendário e agendamentos',
      icon: Calendar,
      category: 'schedules'
    },
    {
      id: 'create_schedules',
      name: 'Criar Agendamentos',
      description: 'Permite adicionar novos agendamentos',
      icon: Calendar,
      category: 'schedules'
    },
    {
      id: 'edit_schedules',
      name: 'Editar Agendamentos',
      description: 'Permite modificar agendamentos existentes',
      icon: Calendar,
      category: 'schedules'
    },
    {
      id: 'delete_schedules',
      name: 'Excluir Agendamentos',
      description: 'Permite remover agendamentos existentes',
      icon: Calendar,
      category: 'schedules'
    },
    
    // Permissões de Configurações
    {
      id: 'view_settings',
      name: 'Visualizar Configurações',
      description: 'Permite visualizar as configurações do sistema',
      icon: Settings,
      category: 'settings'
    },
    {
      id: 'edit_general_settings',
      name: 'Editar Config. Gerais',
      description: 'Permite alterar configurações gerais do sistema',
      icon: Settings,
      category: 'settings'
    },
    {
      id: 'edit_security_settings',
      name: 'Config. de Segurança',
      description: 'Permite modificar configurações de segurança',
      icon: Lock,
      category: 'settings'
    },
    {
      id: 'edit_api_settings',
      name: 'Config. de API',
      description: 'Permite configurar integrações e APIs',
      icon: Settings,
      category: 'settings'
    },
    
    // Permissões de Alertas
    {
      id: 'view_alerts',
      name: 'Visualizar Alertas',
      description: 'Permite visualizar alertas do sistema',
      icon: Bell,
      category: 'alerts'
    },
    {
      id: 'manage_alerts',
      name: 'Gerenciar Alertas',
      description: 'Permite configurar e gerenciar alertas',
      icon: AlertTriangle,
      category: 'alerts'
    }
  ];
  
  // Definição de perfis de usuário pré-configurados
  const userProfiles = {
    admin: availablePermissions.map(p => p.id), // Admin tem todas as permissões
    gestor: [
      'view_dashboard', 'view_advanced_stats', 
      'view_users', 'add_users', 'edit_users',
      'view_reports', 'export_reports', 'create_reports',
      'view_schedules', 'create_schedules', 'edit_schedules', 'delete_schedules',
      'view_settings', 'edit_general_settings',
      'view_alerts', 'manage_alerts'
    ],
    coordenador: [
      'view_dashboard', 
      'view_users',
      'view_reports', 'export_reports',
      'view_schedules', 'create_schedules', 'edit_schedules',
      'view_alerts'
    ],
    professor: [
      'view_dashboard',
      'view_reports',
      'view_schedules', 'create_schedules', 'edit_schedules',
      'view_alerts'
    ],
    basico: [
      'view_dashboard',
      'view_schedules',
      'view_alerts'
    ]
  };
  
  // Estado para controlar as permissões selecionadas
  // Inicialmente, se o usuário for admin, todas as permissões são concedidas
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>(
    user.role === 'admin' ? userProfiles.admin : []
  );
  
  // Estado para controlar o perfil atual selecionado
  const [selectedProfile, setSelectedProfile] = useState<string>(
    user.role === 'admin' ? 'admin' : 'basico'
  );
  
  const handleApplyProfile = (profile: keyof typeof userProfiles) => {
    setSelectedPermissions(userProfiles[profile]);
    setSelectedProfile(profile);
  };
  
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
  
  // Mapeamento de categorias para nomes legíveis
  const categoryNames: Record<string, string> = {
    dashboard: 'Dashboard',
    users: 'Usuários',
    reports: 'Relatórios',
    schedules: 'Agendamentos',
    settings: 'Configurações',
    alerts: 'Alertas'
  };
  
  // Renderizar ícones para cada categoria
  const categoryIcons: Record<string, React.ElementType> = {
    dashboard: BarChart2,
    users: Users,
    reports: FileText,
    schedules: Calendar,
    settings: Settings,
    alerts: Bell
  };
  
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
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-sm font-medium">Aplicar perfil:</span>
            <Button 
              variant={selectedProfile === 'admin' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => handleApplyProfile('admin')}
              disabled={user.role === 'admin'}
            >
              Administrador
            </Button>
            <Button 
              variant={selectedProfile === 'gestor' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => handleApplyProfile('gestor')}
              disabled={user.role === 'admin'}
            >
              Gestor
            </Button>
            <Button 
              variant={selectedProfile === 'coordenador' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => handleApplyProfile('coordenador')}
              disabled={user.role === 'admin'}
            >
              Coordenador
            </Button>
            <Button 
              variant={selectedProfile === 'professor' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => handleApplyProfile('professor')}
              disabled={user.role === 'admin'}
            >
              Professor
            </Button>
            <Button 
              variant={selectedProfile === 'basico' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => handleApplyProfile('basico')}
              disabled={user.role === 'admin'}
            >
              Básico
            </Button>
          </div>
          
          <div className="max-h-[400px] overflow-y-auto pr-2">
            {Object.entries(groupedPermissions).map(([category, permissions]) => (
              <div key={category} className="mb-4">
                <div className="flex items-center space-x-2 pb-2 mb-2 border-b">
                  {categoryIcons[category] && React.createElement(categoryIcons[category], { className: "h-4 w-4 text-muted-foreground" })}
                  <h3 className="text-sm font-medium">{categoryNames[category] || category}</h3>
                </div>
                
                <div className="space-y-3 pl-1">
                  {permissions.map((permission) => {
                    const Icon = permission.icon;
                    return (
                      <div key={permission.id} className="flex items-start space-x-3 py-1">
                        <Checkbox 
                          id={permission.id} 
                          checked={selectedPermissions.includes(permission.id)}
                          onCheckedChange={() => handleTogglePermission(permission.id)}
                          disabled={user.role === 'admin'}
                        />
                        <div className="grid gap-1">
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
              </div>
            ))}
          </div>
          
          {user.role === 'admin' && (
            <div className="flex items-center space-x-2 py-2 px-3 bg-muted/50 rounded-md mt-4">
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
