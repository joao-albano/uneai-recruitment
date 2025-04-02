
import React from 'react';
import { BarChart2, LineChart, Upload } from 'lucide-react';
import SidebarNavLink from '../SidebarNavLink';

interface RetentionNavLinksProps {
  collapsed: boolean;
}

const RetentionNavLinks: React.FC<RetentionNavLinksProps> = ({ collapsed }) => {
  return (
    <>
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
    </>
  );
};

export default RetentionNavLinks;
