
import React from 'react';
import { BarChart2, Users, DollarSign, Building, Settings } from 'lucide-react';
import SidebarNavigationGroup from './SidebarNavigationGroup';
import SidebarNavLink from './SidebarNavLink';
import { useAuth } from '@/context/AuthContext';

interface SidebarAdminSectionProps {
  collapsed: boolean;
}

const SidebarAdminSection: React.FC<SidebarAdminSectionProps> = ({ collapsed }) => {
  const { isSuperAdmin, isAdmin } = useAuth();
  
  return (
    <SidebarNavigationGroup 
      title="Administração" 
      collapsed={collapsed}
    >
      {/* Dashboard Admin é visível para todos os admins */}
      <SidebarNavLink 
        to="/admin/dashboard" 
        icon={BarChart2} 
        label="Painel Admin" 
        collapsed={collapsed}
      />
      
      {/* Usuários é visível para todos os admins, para gerenciar usuários da própria organização */}
      <SidebarNavLink 
        to="/users" 
        icon={Users} 
        label="Usuários" 
        collapsed={collapsed}
      />
      
      {/* As opções abaixo são visíveis apenas para super admins (UNE CX) */}
      {isSuperAdmin && (
        <>
          <SidebarNavLink 
            to="/admin/organizations" 
            icon={Building} 
            label="Organizações" 
            collapsed={collapsed}
          />
          
          <SidebarNavLink 
            to="/admin/payments" 
            icon={DollarSign} 
            label="Pagamentos" 
            collapsed={collapsed}
          />
          
          <SidebarNavLink 
            to="/admin/plans" 
            icon={DollarSign} 
            label="Planos" 
            collapsed={collapsed}
          />
          
          <SidebarNavLink 
            to="/admin/settings" 
            icon={Settings} 
            label="Config. Sistema" 
            collapsed={collapsed}
          />
        </>
      )}
    </SidebarNavigationGroup>
  );
};

export default SidebarAdminSection;
