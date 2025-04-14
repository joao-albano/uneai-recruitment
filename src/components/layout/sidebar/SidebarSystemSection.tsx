
import React from 'react';
import { FileText, Layers } from 'lucide-react';
import SidebarNavigationGroup from './SidebarNavigationGroup';
import SidebarNavLink from './SidebarNavLink';

interface SidebarSystemSectionProps {
  collapsed: boolean;
}

const SidebarSystemSection: React.FC<SidebarSystemSectionProps> = ({ collapsed }) => {
  return (
    <SidebarNavigationGroup title="Sistema" collapsed={collapsed} defaultOpen={false}>
      <SidebarNavLink 
        to="/recruitment/documentation" 
        icon={FileText} 
        label="Documentação" 
        collapsed={collapsed}
      />
      <SidebarNavLink 
        to="/recruitment/architecture" 
        icon={Layers} 
        label="Arquitetura" 
        collapsed={collapsed}
      />
    </SidebarNavigationGroup>
  );
};

export default SidebarSystemSection;
