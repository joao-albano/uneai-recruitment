
import React from 'react';
import { BarChart2, LineChart } from 'lucide-react';
import SidebarNavLink from '../SidebarNavLink';

interface BillingNavLinksProps {
  collapsed: boolean;
}

const BillingNavLinks: React.FC<BillingNavLinksProps> = ({ collapsed }) => {
  return (
    <>
      <SidebarNavLink 
        to="/billing" 
        icon={BarChart2} 
        label="Dashboard" 
        collapsed={collapsed}
      />
      <SidebarNavLink 
        to="/billing/invoices" 
        icon={LineChart} 
        label="Faturas" 
        collapsed={collapsed}
      />
    </>
  );
};

export default BillingNavLinks;
