
import React from 'react';
import { BarChart2, Users, DollarSign, Building, Settings, FileText, Shield, Brain, Webhook, BookOpen } from 'lucide-react';
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
    <>
      {/* Menu de Admin Regular - visível para todos os admins (incluindo super admins) */}
      <SidebarNavigationGroup 
        title="Administração" 
        collapsed={collapsed}
      >
        {/* Users page is visible to all admins to manage their organization users */}
        <SidebarNavLink 
          to="/users" 
          icon={Users} 
          label="Usuários" 
          collapsed={collapsed}
        />
        
        {/* Configurações do Sistema - visível para todos os admins */}
        <SidebarNavLink 
          to="/admin/settings" 
          icon={Settings} 
          label="Config. Sistema" 
          collapsed={collapsed}
        />
      </SidebarNavigationGroup>
      
      {/* Menu exclusivo para Super Admin */}
      {isSuperAdmin && (
        <SidebarNavigationGroup 
          title="Super Admin" 
          collapsed={collapsed}
        >
          <SidebarNavLink 
            to="/admin/dashboard" 
            icon={BarChart2} 
            label="Painel Admin" 
            collapsed={collapsed}
          />
          
          <SidebarNavLink 
            to="/admin/organizations" 
            icon={Building} 
            label="Organizações" 
            collapsed={collapsed}
          />
          
          <SidebarNavLink 
            to="/admin/payments" 
            icon={DollarSign} 
            label="Cobrança" 
            collapsed={collapsed}
          />
          
          <SidebarNavLink 
            to="/admin/plans" 
            icon={Shield} 
            label="Planos" 
            collapsed={collapsed}
          />
          
          <SidebarNavLink 
            to="/admin/apis" 
            icon={FileText} 
            label="Relatório APIs" 
            collapsed={collapsed}
          />
          
          <SidebarNavLink 
            to="/admin/api-integrations" 
            icon={Webhook} 
            label="Integrações API" 
            collapsed={collapsed}
          />
          
          <SidebarNavLink 
            to="/admin/ai-settings" 
            icon={Brain} 
            label="Integrações IA" 
            collapsed={collapsed}
          />
          
          <SidebarNavLink 
            to="/admin/docs" 
            icon={BookOpen} 
            label="Documentação" 
            collapsed={collapsed}
          />
        </SidebarNavigationGroup>
      )}
    </>
  );
};

export default SidebarAdminSection;
