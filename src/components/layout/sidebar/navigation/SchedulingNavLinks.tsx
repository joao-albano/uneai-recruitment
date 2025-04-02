
import React from 'react';
import { BarChart2 } from 'lucide-react';
import SidebarNavLink from '../SidebarNavLink';

interface SchedulingNavLinksProps {
  collapsed: boolean;
}

const SchedulingNavLinks: React.FC<SchedulingNavLinksProps> = ({ collapsed }) => {
  return (
    <SidebarNavLink 
      to="/schedule" 
      icon={BarChart2} 
      label="Dashboard" 
      collapsed={collapsed}
    />
  );
};

export default SchedulingNavLinks;
