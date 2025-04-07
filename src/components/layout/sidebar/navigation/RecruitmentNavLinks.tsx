
import React from 'react';
import { BarChart, UserPlus, LineChart, CalendarCheck, Users, MapPin, MessageSquare, Upload, Bell } from 'lucide-react';
import SidebarNavLink from '../SidebarNavLink';

interface RecruitmentNavLinksProps {
  collapsed: boolean;
}

const RecruitmentNavLinks: React.FC<RecruitmentNavLinksProps> = ({ collapsed }) => {
  return (
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
        to="/recruitment/alerts" 
        icon={Bell} 
        label="Alertas" 
        collapsed={collapsed}
      />
      <SidebarNavLink 
        to="/upload" 
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
        to="/recruitment/geographic-targeting" 
        icon={MapPin} 
        label="Direcionamento Geo" 
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
  );
};

export default RecruitmentNavLinks;
