
import React from 'react';
import { FileText, Layers, Code, Book } from 'lucide-react';
import SidebarNavigationGroup from './SidebarNavigationGroup';
import SidebarNavLink from './SidebarNavLink';

interface SidebarSystemSectionProps {
  collapsed: boolean;
}

const SidebarSystemSection: React.FC<SidebarSystemSectionProps> = ({ collapsed }) => {
  return (
    <SidebarNavigationGroup title="Sistema" collapsed={collapsed} defaultOpen={false}>
      <SidebarNavLink 
        to="/recruitment/user-guide" 
        icon={Book} 
        label="Guia do Usuário" 
        collapsed={collapsed}
      />
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
      <SidebarNavLink 
        to="/recruitment/api-docs" 
        icon={Code} 
        label="API Integrações" 
        collapsed={collapsed}
      />
    </SidebarNavigationGroup>
  );
};

export default SidebarSystemSection;
