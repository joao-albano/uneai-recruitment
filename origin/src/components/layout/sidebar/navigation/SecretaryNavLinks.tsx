
import React from 'react';
import { BarChart2, LineChart } from 'lucide-react';
import SidebarNavLink from '../SidebarNavLink';

interface SecretaryNavLinksProps {
  collapsed: boolean;
}

const SecretaryNavLinks: React.FC<SecretaryNavLinksProps> = ({ collapsed }) => {
  return (
    <>
      <SidebarNavLink 
        to="/secretary" 
        icon={BarChart2} 
        label="Dashboard" 
        collapsed={collapsed}
      />
      <SidebarNavLink 
        to="/secretary/documents" 
        icon={LineChart} 
        label="Documentos" 
        collapsed={collapsed}
      />
    </>
  );
};

export default SecretaryNavLinks;
