
import React from 'react';
import { Home, BarChart2, LineChart, Upload, UserPlus, CalendarCheck, Users, BarChart, MessageSquare } from 'lucide-react';
import SidebarNavigationGroup from './SidebarNavigationGroup';
import SidebarNavLink from './SidebarNavLink';
import { useProduct } from '@/context/product';

interface SidebarNavigationSectionProps {
  collapsed: boolean;
}

const SidebarNavigationSection: React.FC<SidebarNavigationSectionProps> = ({ collapsed }) => {
  const { currentProduct } = useProduct();
  
  console.log('SidebarNavigationSection - currentProduct:', currentProduct);
  
  return (
    <SidebarNavigationGroup 
      title="Navegação" 
      collapsed={collapsed}
    >
      <SidebarNavLink 
        to="/home" 
        icon={Home} 
        label="Início" 
        collapsed={collapsed}
      />
      
      {/* Links específicos para o produto de retenção */}
      {(currentProduct === 'retention') && (
        <>
          <SidebarNavLink 
            to="/dashboard" 
            icon={BarChart2} 
            label="Dashboard" 
            collapsed={collapsed}
          />
          <SidebarNavLink 
            to="/model" 
            icon={LineChart} 
            label="Modelo" 
            collapsed={collapsed}
          />
          <SidebarNavLink 
            to="/upload" 
            icon={Upload} 
            label="Uploads" 
            collapsed={collapsed}
          />
        </>
      )}
      
      {/* Links específicos para o produto de captação */}
      {currentProduct === 'recruitment' && (
        <>
          <SidebarNavLink 
            to="/recruitment" 
            icon={BarChart} 
            label="Dashboard" 
            collapsed={collapsed}
          />
          <SidebarNavLink 
            to="/recruitment/leads" 
            icon={UserPlus} 
            label="Leads" 
            collapsed={collapsed}
          />
          <SidebarNavLink 
            to="/recruitment/funnel" 
            icon={LineChart} 
            label="Funil" 
            collapsed={collapsed}
          />
          <SidebarNavLink 
            to="/recruitment/campaigns" 
            icon={CalendarCheck} 
            label="Campanhas" 
            collapsed={collapsed}
          />
          <SidebarNavLink 
            to="/recruitment/analytics" 
            icon={Users} 
            label="Analíticos" 
            collapsed={collapsed}
          />
          <SidebarNavLink 
            to="/recruitment/conversation" 
            icon={MessageSquare} 
            label="Conversas" 
            collapsed={collapsed}
          />
          <SidebarNavLink 
            to="/recruitment/predictions" 
            icon={LineChart} 
            label="Previsões" 
            collapsed={collapsed}
          />
        </>
      )}
      
      {/* Links para outros produtos - adicione conforme necessário */}
      {currentProduct === 'billing' && (
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
      )}
      
      {currentProduct === 'secretary' && (
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
      )}
      
      {currentProduct === 'emotional' && (
        <>
          <SidebarNavLink 
            to="/emotional" 
            icon={BarChart2} 
            label="Dashboard" 
            collapsed={collapsed}
          />
        </>
      )}
      
      {currentProduct === 'sales' && (
        <>
          <SidebarNavLink 
            to="/sales" 
            icon={BarChart2} 
            label="Dashboard" 
            collapsed={collapsed}
          />
        </>
      )}
      
      {currentProduct === 'scheduling' && (
        <>
          <SidebarNavLink 
            to="/schedule" 
            icon={BarChart2} 
            label="Dashboard" 
            collapsed={collapsed}
          />
        </>
      )}
    </SidebarNavigationGroup>
  );
};

export default SidebarNavigationSection;
