
import React from 'react';
import { BarChart, UserPlus, LineChart, CalendarCheck, Users, MapPin, MessageSquare, Upload, Bell, Building, Phone, Calendar, Home } from 'lucide-react';
import SidebarNavLink from '../SidebarNavLink';
import SidebarNavigationGroup from '../SidebarNavigationGroup';
import { useLocation } from 'react-router-dom';

interface RecruitmentNavLinksProps {
  collapsed: boolean;
}

const RecruitmentNavLinks: React.FC<RecruitmentNavLinksProps> = ({ collapsed }) => {
  const location = useLocation();
  
  // Check current path to determine which link should be active
  const isHomeActive = location.pathname === '/recruitment/home';
  const isDashboardActive = location.pathname === '/recruitment' || location.pathname === '/recruitment/dashboard';
  const isAnalyticsActive = location.pathname === '/recruitment/analytics';
  const isPredictionsActive = location.pathname === '/recruitment/predictions';
  const isOmnichannelReportActive = location.pathname === '/recruitment/omnichannel-report';
  const isScheduleActive = location.pathname === '/recruitment/schedule';
  
  return (
    <>
      {/* Grupo de Navegação */}
      <SidebarNavigationGroup title="Navegação" collapsed={collapsed} defaultOpen={false}>
        <SidebarNavLink 
          to="/recruitment/home" 
          icon={Home} 
          label="Início" 
          collapsed={collapsed}
          isActive={isHomeActive}
        />
        <SidebarNavLink 
          to="/recruitment" 
          icon={BarChart} 
          label="Dashboard" 
          collapsed={collapsed}
          isActive={isDashboardActive}
        />
        <SidebarNavLink 
          to="/recruitment/analytics" 
          icon={Users} 
          label="Analíticos" 
          collapsed={collapsed}
          isActive={isAnalyticsActive}
        />
        <SidebarNavLink 
          to="/recruitment/predictions" 
          icon={LineChart} 
          label="Previsões" 
          collapsed={collapsed}
          isActive={isPredictionsActive}
        />
        <SidebarNavLink 
          to="/recruitment/omnichannel-report" 
          icon={Phone} 
          label="Relatório Omnichannel" 
          collapsed={collapsed}
          isActive={isOmnichannelReportActive}
        />
      </SidebarNavigationGroup>
      
      {/* Grupo de Gestão */}
      <SidebarNavigationGroup title="Gestão" collapsed={collapsed} defaultOpen={false}>
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
      <SidebarNavigationGroup title="Atendimento" collapsed={collapsed} defaultOpen={false}>
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
          isActive={isScheduleActive}
        />
      </SidebarNavigationGroup>
    </>
  );
};

export default RecruitmentNavLinks;
