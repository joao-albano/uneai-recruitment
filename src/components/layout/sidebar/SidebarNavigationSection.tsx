
import React from 'react';
import { Home, BarChart2, LineChart, Upload } from 'lucide-react';
import SidebarNavigationGroup from './SidebarNavigationGroup';
import SidebarNavLink from './SidebarNavLink';

interface SidebarNavigationSectionProps {
  collapsed: boolean;
}

const SidebarNavigationSection: React.FC<SidebarNavigationSectionProps> = ({ collapsed }) => {
  return (
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
  );
};

export default SidebarNavigationSection;
