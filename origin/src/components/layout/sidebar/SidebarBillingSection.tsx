
import React from 'react';
import { DollarSign } from 'lucide-react';
import SidebarNavigationGroup from './SidebarNavigationGroup';
import SidebarNavLink from './SidebarNavLink';

interface SidebarBillingSectionProps {
  collapsed: boolean;
}

const SidebarBillingSection: React.FC<SidebarBillingSectionProps> = ({ collapsed }) => {
  return (
    <SidebarNavigationGroup 
      title="Cobrança" 
      collapsed={collapsed}
    >
      <SidebarNavLink 
        to="/pricing" 
        icon={DollarSign} 
        label="Preços" 
        collapsed={collapsed}
      />
      <SidebarNavLink 
        to="/user-billing" 
        icon={DollarSign} 
        label="Minha Cobrança" 
        collapsed={collapsed}
      />
    </SidebarNavigationGroup>
  );
};

export default SidebarBillingSection;
