
import React from 'react';
import { BarChart, UserPlus, LineChart, CalendarCheck, Users, MapPin, MessageSquare, Upload, Bell, Building, Phone, Calendar, Home } from 'lucide-react';
import SidebarNavLink from '../SidebarNavLink';
import SidebarNavigationGroup from '../SidebarNavigationGroup';

interface RecruitmentNavLinksProps {
  collapsed: boolean;
}

const RecruitmentNavLinks: React.FC<RecruitmentNavLinksProps> = ({ collapsed }) => {
  return (
    <>
      {/* Grupo de Navegação */}
      <SidebarNavigationGroup title="Navegação" collapsed={collapsed}>
        <SidebarNavLink 
          to="/recruitment" 
          icon={Home} 
          label="Início" 
          collapsed={collapsed}
        />
        <SidebarNavLink 
          to="/recruitment" 
          icon={BarChart} 
          label="Dashboard" 
          collapsed={collapsed}
        />
        <SidebarNavLink 
          to="/recruitment/analytics" 
          icon={Users} 
          label="Analíticos" 
          collapsed={collapsed}
        />
        <SidebarNavLink 
          to="/recruitment/predictions" 
          icon={LineChart} 
          label="Previsões" 
          collapsed={collapsed}
        />
        <SidebarNavLink 
          to="/recruitment/omnichannel-report" 
          icon={Phone} 
          label="Relatório Omnichannel" 
          collapsed={collapsed}
        />
      </SidebarNavigationGroup>
      
      {/* Grupo de Gestão */}
      <SidebarNavigationGroup title="Gestão" collapsed={collapsed}>
        <SidebarNavLink 
          to="/recruitment/leads" 
          icon={UserPlus} 
          label="Leads" 
          collapsed={collapsed}
        />
        <SidebarNavLink 
          to="/recruitment/upload" 
          icon={Upload} 
          label="Upload" 
          collapsed={collapsed}
        />
        <SidebarNavLink 
          to="/recruitment/funnel" 
          icon={LineChart} 
          label="Funil" 
          collapsed={collapsed}
        />
        <SidebarNavLink 
          to="/recruitment/campus" 
          icon={Building} 
          label="Unidades" 
          collapsed={collapsed}
        />
        <SidebarNavLink 
          to="/recruitment/geographic-targeting" 
          icon={MapPin} 
          label="Direcionamento Geo" 
          collapsed={collapsed}
        />
        <SidebarNavLink 
          to="/recruitment/campaigns" 
          icon={CalendarCheck} 
          label="Campanhas" 
          collapsed={collapsed}
        />
      </SidebarNavigationGroup>
      
      {/* Grupo de Atendimento */}
      <SidebarNavigationGroup title="Atendimento" collapsed={collapsed}>
        <SidebarNavLink 
          to="/recruitment/alerts" 
          icon={Bell} 
          label="Alertas" 
          collapsed={collapsed}
        />
        <SidebarNavLink 
          to="/recruitment/conversation" 
          icon={MessageSquare} 
          label="Conversas" 
          collapsed={collapsed}
        />
        <SidebarNavLink 
          to="/recruitment/schedule" 
          icon={Calendar} 
          label="Agenda" 
          collapsed={collapsed}
        />
      </SidebarNavigationGroup>
    </>
  );
};

export default RecruitmentNavLinks;
