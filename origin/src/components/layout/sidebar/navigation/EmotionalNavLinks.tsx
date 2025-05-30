
import React from 'react';
import { BarChart2 } from 'lucide-react';
import SidebarNavLink from '../SidebarNavLink';

interface EmotionalNavLinksProps {
  collapsed: boolean;
}

const EmotionalNavLinks: React.FC<EmotionalNavLinksProps> = ({ collapsed }) => {
  return (
    <SidebarNavLink 
      to="/emotional" 
      icon={BarChart2} 
      label="Dashboard" 
      collapsed={collapsed}
    />
  );
};

export default EmotionalNavLinks;
