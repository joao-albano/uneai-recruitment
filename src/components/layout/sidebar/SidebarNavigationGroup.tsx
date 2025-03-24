
import React from 'react';
import { 
  ChevronDown, 
  Users, 
  Settings, 
  BarChart, 
  Home, 
  Bell, 
  Upload, 
  FileText, 
  Calendar, 
  GraduationCap,
  Model,
  DollarSign,
  CreditCard,
  Tag
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import SidebarNavLink from './SidebarNavLink';
import { cn } from '@/lib/utils';

interface SidebarNavigationGroupProps {
  title: string;
  collapsed: boolean;
  defaultOpen?: boolean;
}

const SidebarNavigationGroup: React.FC<SidebarNavigationGroupProps> = ({
  title,
  collapsed,
  defaultOpen = false
}) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);
  const { language } = useTheme();
  const { isAdmin } = useAuth();
  
  const isPtBR = language === 'pt-BR';
  
  const toggleOpen = () => {
    if (!collapsed) {
      setIsOpen(!isOpen);
    }
  };
  
  const isAdminGroup = title === (isPtBR ? 'Administração' : 'Administration');
  
  // Only show admin links for admin users
  if (isAdminGroup && !isAdmin) {
    return null;
  }
  
  // Determine which links to show based on the group title
  const renderLinks = () => {
    switch (title) {
      case 'Principal':
      case 'Main':
        return (
          <>
            <SidebarNavLink 
              to="/dashboard" 
              icon={<Home className="h-5 w-5" />} 
              label={isPtBR ? 'Dashboard' : 'Dashboard'} 
              collapsed={collapsed} 
            />
            <SidebarNavLink 
              to="/model" 
              icon={<Model className="h-5 w-5" />} 
              label={isPtBR ? 'Modelo de IA' : 'AI Model'} 
              collapsed={collapsed} 
            />
            <SidebarNavLink 
              to="/alerts" 
              icon={<Bell className="h-5 w-5" />} 
              label={isPtBR ? 'Alertas' : 'Alerts'} 
              collapsed={collapsed} 
            />
            <SidebarNavLink 
              to="/upload" 
              icon={<Upload className="h-5 w-5" />} 
              label={isPtBR ? 'Upload de Dados' : 'Data Upload'} 
              collapsed={collapsed} 
            />
          </>
        );
      case 'Acadêmico':
      case 'Academic':
        return (
          <>
            <SidebarNavLink 
              to="/students" 
              icon={<Users className="h-5 w-5" />} 
              label={isPtBR ? 'Alunos' : 'Students'} 
              collapsed={collapsed} 
            />
            <SidebarNavLink 
              to="/survey" 
              icon={<FileText className="h-5 w-5" />} 
              label={isPtBR ? 'Formulários' : 'Forms'} 
              collapsed={collapsed} 
            />
            <SidebarNavLink 
              to="/schedule" 
              icon={<Calendar className="h-5 w-5" />} 
              label={isPtBR ? 'Agenda' : 'Schedule'} 
              collapsed={collapsed} 
            />
          </>
        );
      case 'Administração':
      case 'Administration':
        return (
          <>
            <SidebarNavLink 
              to="/admin/dashboard" 
              icon={<BarChart className="h-5 w-5" />} 
              label={isPtBR ? 'Estatísticas' : 'Statistics'} 
              collapsed={collapsed} 
            />
            <SidebarNavLink 
              to="/users" 
              icon={<GraduationCap className="h-5 w-5" />} 
              label={isPtBR ? 'Usuários' : 'Users'} 
              collapsed={collapsed} 
            />
            <SidebarNavLink 
              to="/admin/settings" 
              icon={<Settings className="h-5 w-5" />} 
              label={isPtBR ? 'Configurações' : 'Settings'} 
              collapsed={collapsed} 
            />
            <SidebarNavLink 
              to="/admin/payments" 
              icon={<DollarSign className="h-5 w-5" />} 
              label={isPtBR ? 'Pagamentos' : 'Payments'} 
              collapsed={collapsed} 
            />
            <SidebarNavLink 
              to="/admin/plans" 
              icon={<Tag className="h-5 w-5" />} 
              label={isPtBR ? 'Gerenciar Planos' : 'Manage Plans'} 
              collapsed={collapsed} 
            />
          </>
        );
      case 'Conta':
      case 'Account':
        return (
          <>
            <SidebarNavLink 
              to="/settings" 
              icon={<Settings className="h-5 w-5" />} 
              label={isPtBR ? 'Configurações' : 'Settings'} 
              collapsed={collapsed} 
            />
            <SidebarNavLink 
              to="/user-billing" 
              icon={<CreditCard className="h-5 w-5" />} 
              label={isPtBR ? 'Faturamento' : 'Billing'} 
              collapsed={collapsed} 
            />
            <SidebarNavLink 
              to="/pricing" 
              icon={<Tag className="h-5 w-5" />} 
              label={isPtBR ? 'Planos' : 'Pricing'} 
              collapsed={collapsed} 
            />
          </>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="py-2">
      {!collapsed && (
        <button
          onClick={toggleOpen}
          className="flex w-full items-center justify-between px-3 py-2 text-sm font-medium"
        >
          {title}
          <ChevronDown
            className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")}
          />
        </button>
      )}
      
      {(isOpen || collapsed) && (
        <div className="mt-1 space-y-1">
          {renderLinks()}
        </div>
      )}
    </div>
  );
};

export default SidebarNavigationGroup;
