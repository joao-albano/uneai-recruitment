
import { PermissionType } from './types';
import { ShieldAlert, Users, FileText, Calendar, BarChart2, Settings, AlertTriangle, PenTool, Book, Bell, Lock, DollarSign, Store, HeadphonesIcon } from "lucide-react";

// List of all available permissions in the system
export const availablePermissions: PermissionType[] = [
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

// Predefined user profile permission sets
export const userProfiles = {
  superadmin: availablePermissions.map(p => p.id), // Super Admin tem todas as permissões
  admin: availablePermissions.map(p => p.id), // Admin tem todas as permissões da organização
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
  gerente: [
    'view_dashboard', 'view_advanced_stats',
    'view_users', 'add_users',
    'view_reports', 'export_reports', 'create_reports',
    'view_schedules', 'create_schedules',
    'view_settings',
    'view_alerts'
  ],
  professor: [
    'view_dashboard',
    'view_reports',
    'view_schedules', 'create_schedules', 'edit_schedules',
    'view_alerts'
  ],
  financeiro: [
    'view_dashboard',
    'view_reports', 'export_reports', 'create_reports',
    'view_settings'
  ],
  vendedor: [
    'view_dashboard',
    'view_reports',
    'create_schedules'
  ],
  atendente: [
    'view_dashboard',
    'view_schedules', 'create_schedules',
    'view_alerts'
  ],
  basico: [
    'view_dashboard',
    'view_schedules',
    'view_alerts'
  ]
};
