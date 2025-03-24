
import React from 'react';
import { Bell, FileSpreadsheet, Calendar, Users } from 'lucide-react';
import SidebarNavigationGroup from './SidebarNavigationGroup';
import SidebarNavLink from './SidebarNavLink';

interface SidebarMonitoringSectionProps {
  collapsed: boolean;
}

const SidebarMonitoringSection: React.FC<SidebarMonitoringSectionProps> = ({ collapsed }) => {
  return (
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
  );
};

export default SidebarMonitoringSection;
