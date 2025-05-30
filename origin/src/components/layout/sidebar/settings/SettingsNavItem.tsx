
import React from 'react';
import { Settings } from 'lucide-react';
import SidebarNavLink from '../SidebarNavLink';

interface SettingsNavItemProps {
  collapsed: boolean;
}

const SettingsNavItem: React.FC<SettingsNavItemProps> = ({ collapsed }) => {
  return (
    <SidebarNavLink 
      to="/settings" 
      icon={Settings} 
      label="Configurações" 
      collapsed={collapsed}
    />
  );
};

export default SettingsNavItem;
