
import { UserType } from '../types';
import { ShieldAlert, Users, FileText, Calendar, BarChart2, Settings, AlertTriangle, PenTool, Book, Bell, Lock } from "lucide-react";

// Permission type definition
export interface PermissionType {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  category: 'dashboard' | 'users' | 'reports' | 'schedules' | 'settings' | 'alerts';
}

// User profile descriptions
export const userProfileDescriptions = {
  admin: {
    title: 'Administrador',
    description: 'Acesso completo a todas as funcionalidades do sistema, incluindo configurações avançadas, gerenciamento de usuários e permissões.',
    icon: ShieldAlert,
  },
  gestor: {
    title: 'Gestor',
    description: 'Acesso a estatísticas avançadas, gerenciamento básico de usuários, criação e exportação de relatórios, e configurações gerais.',
    icon: Users,
  },
  coordenador: {
    title: 'Coordenador',
    description: 'Visualização do dashboard, usuários e relatórios. Pode gerenciar agendamentos e verificar alertas do sistema.',
    icon: Calendar,
  },
  professor: {
    title: 'Professor',
    description: 'Acesso básico ao dashboard, relatórios e agendamentos. Pode visualizar e criar seus próprios agendamentos.',
    icon: Book,
  },
  basico: {
    title: 'Básico',
    description: 'Acesso mínimo ao sistema. Visualização do dashboard básico, agendamentos e alertas.',
    icon: Users,
  }
};

// Interface for PermissionsDialog props
export interface PermissionsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: UserType;
}

// Mapping of categories to names
export const categoryNames: Record<string, string> = {
  dashboard: 'Dashboard',
  users: 'Usuários',
  reports: 'Relatórios',
  schedules: 'Agendamentos',
  settings: 'Configurações',
  alerts: 'Alertas'
};

// Mapping of categories to icons
export const categoryIcons: Record<string, React.ElementType> = {
  dashboard: BarChart2,
  users: Users,
  reports: FileText,
  schedules: Calendar,
  settings: Settings,
  alerts: Bell
};
