
import React from 'react';
import { Bell, FileSpreadsheet, Calendar, Users } from 'lucide-react';
import SidebarNavigationGroup from './SidebarNavigationGroup';
import SidebarNavLink from './SidebarNavLink';
import { useProduct } from '@/context/product';

interface SidebarMonitoringSectionProps {
  collapsed: boolean;
}

const SidebarMonitoringSection: React.FC<SidebarMonitoringSectionProps> = ({ collapsed }) => {
  const { currentProduct } = useProduct();
  const isRetentionProduct = currentProduct === 'retention';
  
  return (
    <SidebarNavigationGroup 
      title="Monitoramento" 
      collapsed={collapsed}
    >
      {isRetentionProduct && (
        <SidebarNavLink 
          to="/alerts" 
          icon={Bell} 
          label="Alertas" 
          collapsed={collapsed}
        />
      )}
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
