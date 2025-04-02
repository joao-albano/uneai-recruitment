
import React from 'react';
import { Home } from 'lucide-react';
import SidebarNavLink from '../SidebarNavLink';

interface CommonNavLinksProps {
  collapsed: boolean;
}

const CommonNavLinks: React.FC<CommonNavLinksProps> = ({ collapsed }) => {
  return (
    <SidebarNavLink 
      to="/home" 
      icon={Home} 
      label="Início" 
      collapsed={collapsed}
    />
  );
};

export default CommonNavLinks;
