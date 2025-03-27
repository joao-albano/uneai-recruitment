
import React from 'react';
import { BarChart2, Users, DollarSign, Building, Settings } from 'lucide-react';
import SidebarNavigationGroup from './SidebarNavigationGroup';
import SidebarNavLink from './SidebarNavLink';
import { useAuth } from '@/context/auth';

interface SidebarAdminSectionProps {
  collapsed: boolean;
}

const SidebarAdminSection: React.FC<SidebarAdminSectionProps> = ({ collapsed }) => {
  const { isSuperAdmin, isAdmin } = useAuth();
  
  console.log('SidebarAdminSection - isAdmin:', isAdmin, 'isSuperAdmin:', isSuperAdmin);
  
  // Don't show the admin section for regular users
  if (!isAdmin && !isSuperAdmin) {
    return null;
  }
  
  return (
    <SidebarNavigationGroup 
      title="Administração" 
      collapsed={collapsed}
    >
      {/* Dashboard Admin is visible to all admins */}
      {isSuperAdmin && (
        <SidebarNavLink 
          to="/admin/dashboard" 
          icon={BarChart2} 
          label="Painel Admin" 
          collapsed={collapsed}
        />
      )}
      
      {/* Users page is visible to all admins to manage their organization users */}
      <SidebarNavLink 
        to="/users" 
        icon={Users} 
        label="Usuários" 
        collapsed={collapsed}
      />
      
      {/* Options below are visible only to super admins (UNE CX) */}
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
