
import React from 'react';
import { BarChart2, FileText, CreditCard, DollarSign, LineChart } from 'lucide-react';
import SidebarNavLink from '../SidebarNavLink';

interface FinanceNavLinksProps {
  collapsed: boolean;
}

const FinanceNavLinks: React.FC<FinanceNavLinksProps> = ({ collapsed }) => {
  return (
    <>
      <SidebarNavLink 
        to="/finance/home" 
        icon={BarChart2} 
        label="Dashboard" 
        collapsed={collapsed}
      />
      <SidebarNavLink 
        to="/finance/invoices" 
        icon={FileText} 
        label="Faturas" 
        collapsed={collapsed}
      />
      <SidebarNavLink 
        to="/finance/payments" 
        icon={CreditCard} 
        label="Pagamentos" 
        collapsed={collapsed}
      />
      <SidebarNavLink 
        to="/finance/billing" 
        icon={DollarSign} 
        label="Cobrança" 
        collapsed={collapsed}
      />
      <SidebarNavLink 
        to="/finance/reports" 
        icon={LineChart} 
        label="Relatórios" 
        collapsed={collapsed}
      />
    </>
  );
};

export default FinanceNavLinks;
