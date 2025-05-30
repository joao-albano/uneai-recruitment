
import React from 'react';
import { BarChart2 } from 'lucide-react';
import SidebarNavLink from '../SidebarNavLink';

interface SalesNavLinksProps {
  collapsed: boolean;
}

const SalesNavLinks: React.FC<SalesNavLinksProps> = ({ collapsed }) => {
  return (
    <SidebarNavLink 
      to="/sales" 
      icon={BarChart2} 
      label="Dashboard" 
      collapsed={collapsed}
    />
  );
};

export default SalesNavLinks;
