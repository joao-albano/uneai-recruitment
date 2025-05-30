
import { UserType } from '../types';
import { ShieldAlert, Users, FileText, Calendar, BarChart2, Settings, AlertTriangle, PenTool, Book, Bell, Lock, DollarSign, Store, HeadphonesIcon, Stethoscope } from "lucide-react";

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
  superadmin: {
    title: 'Super Admin',
    description: 'Acesso completo a todo o sistema, incluindo todas as organizações e funcionalidades da UNE CX.',
    icon: ShieldAlert,
  },
  admin: {
    title: 'Administrador',
    description: 'Acesso completo a todas as funcionalidades da organização, incluindo configurações avançadas e gerenciamento de usuários.',
    icon: Settings,
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
  gerente: {
    title: 'Gerente',
    description: 'Gerenciamento de equipe, visualização de métricas e relatórios de desempenho, aprovação de solicitações.',
    icon: BarChart2,
  },
  professor: {
    title: 'Professor',
    description: 'Acesso básico ao dashboard, relatórios e agendamentos. Pode visualizar e criar seus próprios agendamentos.',
    icon: Book,
  },
  financeiro: {
    title: 'Financeiro',
    description: 'Acesso a informações financeiras, relatórios de pagamento, controle de mensalidades e faturamento.',
    icon: DollarSign,
  },
  vendedor: {
    title: 'Vendedor',
    description: 'Cadastro de leads, acompanhamento de vendas, visualização de metas e resultados comerciais.',
    icon: Store,
  },
  medico: {
    title: 'Médico',
    description: 'Acesso a prontuários, agendamentos de consultas, histórico de pacientes e resultados de exames.',
    icon: Stethoscope,
  },
  atendente: {
    title: 'Atendente',
    description: 'Atendimento ao cliente, registro de chamados, acompanhamento de solicitações e suporte.',
    icon: HeadphonesIcon,
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
