
import React from 'react';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import SidebarNavLink from './SidebarNavLink';
import { BarChart3, FileUp, Bell, Calendar, ClipboardCheck, Users, Settings, Brain, Cog, DollarSign } from 'lucide-react';

interface SidebarNavigationGroupProps {
  collapsed: boolean;
  isAdmin: boolean;
}

const SidebarNavigationGroup: React.FC<SidebarNavigationGroupProps> = ({ 
  collapsed,
  isAdmin
}) => {
  return (
    <nav className={cn("px-2 py-4", collapsed && "px-1")}>
      <div className="space-y-1">
        <SidebarNavLink 
          to="/dashboard" 
          icon={BarChart3} 
          label="Dashboard" 
          collapsed={collapsed}
        />
        
        <SidebarNavLink 
          to="/upload" 
          icon={FileUp} 
          label="Upload de Dados" 
          collapsed={collapsed}
        />
        
        <SidebarNavLink 
          to="/alerts" 
          icon={Bell} 
          label="Alertas" 
          collapsed={collapsed}
        />
        
        <SidebarNavLink 
          to="/schedule" 
          icon={Calendar} 
          label="Agenda" 
          collapsed={collapsed}
        />
        
        <SidebarNavLink 
          to="/survey" 
          icon={ClipboardCheck} 
          label="Pesquisa Diagnóstica" 
          collapsed={collapsed}
        />

        <SidebarNavLink 
          to="/pricing" 
          icon={DollarSign} 
          label="Planos e Preços" 
          collapsed={collapsed}
        />
      </div>
      
      <Separator className="my-4" />
      
      <div className="space-y-1">
        <SidebarNavLink 
          to="/students" 
          icon={Users} 
          label="Alunos" 
          collapsed={collapsed}
        />
        
        <SidebarNavLink 
          to="/model" 
          icon={Brain} 
          label="Modelo de Previsão" 
          collapsed={collapsed}
        />
        
        <SidebarNavLink 
          to="/settings" 
          icon={Settings} 
          label="Configurações" 
          collapsed={collapsed}
        />
        
        {isAdmin && (
          <SidebarNavLink 
            to="/admin/settings" 
            icon={Cog} 
            label="Config. Avançadas" 
            collapsed={collapsed}
          />
        )}
      </div>
    </nav>
  );
};

export default SidebarNavigationGroup;
