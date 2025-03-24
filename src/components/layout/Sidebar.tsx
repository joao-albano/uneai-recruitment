
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import {
  Home,
  BarChart2,
  LineChart,
  Upload,
  Bell,
  FileSpreadsheet,
  Calendar,
  Users,
  Settings,
  LogOut,
  DollarSign
} from 'lucide-react';
import { cn } from '@/lib/utils';
import SidebarHeader from './sidebar/SidebarHeader';
import SidebarFooter from './sidebar/SidebarFooter';
import SidebarNavigationGroup from './sidebar/SidebarNavigationGroup';
import SidebarNavLink from './sidebar/SidebarNavLink';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';

interface SidebarProps {
  isOpen?: boolean;
  onClose: () => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  collapsed,
  setCollapsed,
}) => {
  const { currentUser, logout } = useAuth();
  const [sidebarWidth, setSidebarWidth] = useState(collapsed ? 80 : 280);
  const { language } = useTheme();
  
  const isAdmin = currentUser?.role === 'admin';
  
  const handleToggleCollapse = () => {
    const newCollapsed = !collapsed;
    setCollapsed(newCollapsed);
    setSidebarWidth(newCollapsed ? 80 : 280);
  };

  // Content for both the main sidebar and the mobile sheet
  const sidebarContent = (
    <div 
      className={cn(
        "h-full flex flex-col py-4 transition-all duration-300",
        collapsed ? "w-20" : "w-70"
      )}
      style={{ width: `${sidebarWidth}px` }}
    >
      <SidebarHeader 
        collapsed={collapsed} 
        onToggleCollapse={handleToggleCollapse} 
        onClose={onClose}
      />
      
      <div className="flex-1 px-3 py-2 overflow-y-auto">
        <SidebarNavigationGroup 
          title="Navegação" 
          collapsed={collapsed}
        >
          <SidebarNavLink 
            to="/home" 
            icon={Home} 
            label="Início" 
            collapsed={collapsed}
          />
          <SidebarNavLink 
            to="/dashboard" 
            icon={BarChart2} 
            label="Dashboard" 
            collapsed={collapsed}
          />
          <SidebarNavLink 
            to="/model" 
            icon={LineChart} 
            label="Modelo" 
            collapsed={collapsed}
          />
          <SidebarNavLink 
            to="/upload" 
            icon={Upload} 
            label="Uploads" 
            collapsed={collapsed}
          />
        </SidebarNavigationGroup>
        
        <SidebarNavigationGroup 
          title="Monitoramento" 
          collapsed={collapsed}
        >
          <SidebarNavLink 
            to="/alerts" 
            icon={Bell} 
            label="Alertas" 
            collapsed={collapsed}
          />
          <SidebarNavLink 
            to="/survey" 
            icon={FileSpreadsheet} 
            label="Questionários" 
            collapsed={collapsed}
          />
          <SidebarNavLink 
            to="/schedule" 
            icon={Calendar} 
            label="Agenda" 
            collapsed={collapsed}
          />
          <SidebarNavLink 
            to="/students" 
            icon={Users} 
            label="Alunos" 
            collapsed={collapsed}
          />
        </SidebarNavigationGroup>
        
        <SidebarNavigationGroup 
          title="Faturamento" 
          collapsed={collapsed}
        >
          <SidebarNavLink 
            to="/pricing" 
            icon={DollarSign} 
            label="Preços" 
            collapsed={collapsed}
          />
          <SidebarNavLink 
            to="/user-billing" 
            icon={DollarSign} 
            label="Meu Faturamento" 
            collapsed={collapsed}
          />
        </SidebarNavigationGroup>
        
        {isAdmin && (
          <SidebarNavigationGroup 
            title="Administração" 
            collapsed={collapsed}
          >
            <SidebarNavLink 
              to="/admin/dashboard" 
              icon={BarChart2} 
              label="Painel Admin" 
              collapsed={collapsed}
            />
            <SidebarNavLink 
              to="/users" 
              icon={Users} 
              label="Usuários" 
              collapsed={collapsed}
            />
            <SidebarNavLink 
              to="/admin/payments" 
              icon={DollarSign} 
              label="Pagamentos" 
              collapsed={collapsed}
            />
            <SidebarNavLink 
              to="/admin/plans" 
              icon={DollarSign} 
              label="Planos" 
              collapsed={collapsed}
            />
          </SidebarNavigationGroup>
        )}
      </div>
      
      <div className="px-3 mt-auto">
        <Separator className="my-2" />
        
        <SidebarNavLink 
          to="/settings" 
          icon={Settings} 
          label="Configurações" 
          collapsed={collapsed}
        />
        
        <Link to="/login" className="w-full">
          <Button 
            variant="ghost" 
            className={cn(
              "w-full justify-start px-2 my-1 gap-3", 
              collapsed && "justify-center p-2"
            )}
            onClick={() => logout()}
          >
            <LogOut className="h-5 w-5" />
            {!collapsed && <span>Sair</span>}
          </Button>
        </Link>
      </div>
      
      <SidebarFooter collapsed={collapsed} />
    </div>
  );
  
  // Sidebar for desktop view
  const desktopSidebar = (
    <div
      className={cn(
        "hidden md:block h-full border-r transition-all duration-300",
        collapsed ? "w-20" : "w-70"
      )}
      style={{ width: `${sidebarWidth}px` }}
    >
      {sidebarContent}
    </div>
  );
  
  // Sheet for mobile view
  const mobileSidebar = (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="p-0 border-r max-w-[280px]">
        {sidebarContent}
      </SheetContent>
    </Sheet>
  );
  
  return (
    <>
      {desktopSidebar}
      {mobileSidebar}
    </>
  );
};

export default Sidebar;
