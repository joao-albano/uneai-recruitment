import React from 'react';
import {
  Home,
  LayoutDashboard,
  CreditCard,
  Settings,
  AlertTriangle,
  FileUp,
  Calendar,
  Users,
  User,
  BarChartBig,
  Contact2,
  Coins,
  Scale,
  LucideIcon
} from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

interface SidebarNavigationGroupProps {
  collapsed: boolean;
}

const SidebarNavigationGroup: React.FC<SidebarNavigationGroupProps> = ({
  collapsed
}) => {
  const { user } = useAuth();
  const { language } = useTheme();
  const isPtBR = language === 'pt-BR';
  const location = useLocation();

  const navigationItems = [
    {
      href: '/home',
      icon: Home,
      label: isPtBR ? 'Início' : 'Home',
      adminOnly: false,
    },
    {
      href: '/dashboard',
      icon: LayoutDashboard,
      label: isPtBR ? 'Painel' : 'Dashboard',
      adminOnly: false,
    },
    {
      href: '/model',
      icon: BarChartBig,
      label: isPtBR ? 'Modelo Preditivo' : 'Predictive Model',
      adminOnly: false,
    },
    {
      href: '/upload',
      icon: FileUp,
      label: isPtBR ? 'Upload de Dados' : 'Data Upload',
      adminOnly: false,
    },
    {
      href: '/alerts',
      icon: AlertTriangle,
      label: isPtBR ? 'Alertas' : 'Alerts',
      adminOnly: false,
    },
    {
      href: '/survey',
      icon: Contact2,
      label: isPtBR ? 'Questionários' : 'Surveys',
      adminOnly: false,
    },
    {
      href: '/schedule',
      icon: Calendar,
      label: isPtBR ? 'Agendamentos' : 'Schedule',
      adminOnly: false,
    },
    {
      href: '/students',
      icon: Users,
      label: isPtBR ? 'Alunos' : 'Students',
      adminOnly: false,
    },
    {
      href: '/profile',
      icon: User,
      label: isPtBR ? 'Perfil' : 'Profile',
      adminOnly: false,
    },
    {
      href: '/settings',
      icon: Settings,
      label: isPtBR ? 'Configurações' : 'Settings',
      adminOnly: false,
    },
    {
      href: '/user-billing',
      icon: CreditCard,
      label: isPtBR ? 'Cobrança' : 'Billing',
      adminOnly: false,
    },
    {
      href: '/users',
      icon: Users,
      label: isPtBR ? 'Usuários' : 'Users',
      adminOnly: true,
    },
    {
      href: '/admin/dashboard',
      icon: LayoutDashboard,
      label: isPtBR ? 'Painel Admin' : 'Admin Dashboard',
      adminOnly: true,
    },
    {
      href: '/admin/payments',
      icon: Coins,
      label: isPtBR ? 'Pagamentos' : 'Payments',
      adminOnly: true,
    },
    {
      href: '/admin/plans',
      icon: Scale,
      label: isPtBR ? 'Planos' : 'Plans',
      adminOnly: true,
    },
    {
      href: '/admin/settings',
      icon: Settings,
      label: isPtBR ? 'Configurações Admin' : 'Admin Settings',
      adminOnly: true,
    },
  ];

  const filteredNavigationItems = navigationItems.filter(item => {
    if (item.adminOnly) {
      return user?.isAdmin;
    }
    return true;
  });

  return (
    <>
      {filteredNavigationItems.map((item) => (
        <NavLink
          key={item.href}
          to={item.href}
          className={({ isActive }) =>
            cn(
              "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-secondary hover:text-foreground",
              isActive ? "bg-secondary text-foreground" : "text-muted-foreground",
              collapsed && "justify-center"
            )
          }
        >
          <item.icon className="mr-2 h-4 w-4" />
          {!collapsed && <span>{item.label}</span>}
        </NavLink>
      ))}
    </>
  );
};

const SidebarHeader: React.FC = () => {
  const { language } = useTheme();
  const isPtBR = language === 'pt-BR';

  return (
    <div className="flex items-center justify-center h-16 shrink-0">
      <span className="font-bold text-lg">{isPtBR ? 'Monitor Escolar' : 'School Monitor'}</span>
    </div>
  );
};

const SidebarFooter: React.FC = () => {
  const { signOut } = useAuth();
  const { language } = useTheme();
  const isPtBR = language === 'pt-BR';

  return (
    <div className="p-2">
      <Button variant="outline" className="w-full" onClick={signOut}>
        {isPtBR ? 'Sair' : 'Sign Out'}
      </Button>
    </div>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  onClose, 
  collapsed, 
  setCollapsed 
}) => {
  const { language } = useTheme();
  const isPtBR = language === 'pt-BR';
  
  return (
    <>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="sm" className="md:hidden">
            {isPtBR ? 'Menu' : 'Menu'}
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-72">
          <SidebarHeader />
          <nav className="flex-1 overflow-auto p-2">
            <SidebarNavigationGroup 
              collapsed={false}
            />
          </nav>
          <SidebarFooter />
        </SheetContent>
      </Sheet>
      
      <div
        className={cn(
          "hidden md:flex flex-col border-r bg-background transition-all duration-300",
          collapsed ? "w-[70px]" : "w-[240px]"
        )}
      >
        <SidebarHeader />
        <nav className="flex-1 overflow-auto p-2">
          <SidebarNavigationGroup 
            collapsed={collapsed}
          />
        </nav>
        <SidebarFooter />
      </div>
    </>
  );
};

export default Sidebar;
