
import React from 'react';
import { BookOpen, LineChart } from 'lucide-react';
import SidebarNavLink from '../SidebarNavLink';

interface PedagogicalNavLinksProps {
  collapsed: boolean;
}

const PedagogicalNavLinks: React.FC<PedagogicalNavLinksProps> = ({ collapsed }) => {
  return (
    <>
      <SidebarNavLink 
        to="/pedagogical" 
        icon={BookOpen} 
        label="Dashboard" 
        collapsed={collapsed}
      />
      <SidebarNavLink 
        to="/pedagogical/assessments" 
        icon={LineChart} 
        label="Avaliações" 
        collapsed={collapsed}
      />
    </>
  );
};

export default PedagogicalNavLinks;
