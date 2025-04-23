
import React from 'react';
import { BarChart, UserPlus, LineChart, CalendarCheck, Users, MapPin, MessageSquare, Upload, Bell, Building, Phone, Calendar, Home, Settings, PhoneCall, Target, CalendarDays, FilePenLine, ListCheck } from 'lucide-react';
import SidebarNavLink from '../SidebarNavLink';
import SidebarNavigationGroup from '../SidebarNavigationGroup';
import { useLocation } from 'react-router-dom';

interface RecruitmentNavLinksProps {
  collapsed: boolean;
}

const RecruitmentNavLinks: React.FC<RecruitmentNavLinksProps> = ({ collapsed }) => {
  const location = useLocation();
  
  const isHomeActive = location.pathname === '/recruitment/home';
  const isDashboardActive = location.pathname === '/recruitment' || location.pathname === '/recruitment/dashboard';
  const isAnalyticsActive = location.pathname === '/recruitment/analytics';
  const isPredictionsActive = location.pathname === '/recruitment/predictions';
  const isOmnichannelReportActive = location.pathname === '/recruitment/omnichannel-report';
  const isDialingRulesActive = location.pathname === '/recruitment/rules/dialing';
  const isGoalsConfigActive = location.pathname === '/recruitment/rules/goals';
  const isPeriodsConfigActive = location.pathname === '/recruitment/rules/periods';
  const isRegistryRulesActive = location.pathname === '/recruitment/rules/registry';
  const isTasksActive = location.pathname === '/recruitment/tasks';
  
  return (
    <>
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
          icon={Phone} 
          label="Orquestração" 
          collapsed={collapsed}
        />
        <SidebarNavLink 
          to="/recruitment/campaigns" 
          icon={CalendarCheck} 
          label="Campanhas" 
          collapsed={collapsed}
        />
      </SidebarNavigationGroup>
      
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
          to="/recruitment/tasks" 
          icon={ListCheck} 
          label="Tarefas" 
          collapsed={collapsed}
          isActive={isTasksActive}
        />
        <SidebarNavLink 
          to="/recruitment/schedule" 
          icon={Calendar} 
          label="Agenda" 
          collapsed={collapsed}
        />
      </SidebarNavigationGroup>

      <SidebarNavigationGroup title="Regras" collapsed={collapsed} defaultOpen={false}>
        <SidebarNavLink 
          to="/recruitment/rules/dialing" 
          icon={PhoneCall} 
          label="Discagem" 
          collapsed={collapsed}
          isActive={isDialingRulesActive}
        />
        <SidebarNavLink 
          to="/recruitment/rules/registry" 
          icon={FilePenLine} 
          label="Tabulação" 
          collapsed={collapsed}
          isActive={isRegistryRulesActive}
        />
        <SidebarNavLink 
          to="/recruitment/rules/goals" 
          icon={Target} 
          label="Metas" 
          collapsed={collapsed}
          isActive={isGoalsConfigActive}
        />
        <SidebarNavLink 
          to="/recruitment/rules/periods" 
          icon={CalendarDays} 
          label="Períodos" 
          collapsed={collapsed}
          isActive={isPeriodsConfigActive}
        />
      </SidebarNavigationGroup>
    </>
  );
};

export default RecruitmentNavLinks;
