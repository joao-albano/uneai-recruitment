
import React from 'react';
import { BarChart2, Users, DollarSign } from 'lucide-react';
import SidebarNavigationGroup from './SidebarNavigationGroup';
import SidebarNavLink from './SidebarNavLink';

interface SidebarAdminSectionProps {
  collapsed: boolean;
}

const SidebarAdminSection: React.FC<SidebarAdminSectionProps> = ({ collapsed }) => {
  return (
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
  );
};

export default SidebarAdminSection;
