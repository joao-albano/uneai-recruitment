
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useProduct } from '@/context/ProductContext';
import { 
  BarChart, BookOpen, Filter, Home, Mail, MessageSquare, 
  School, Upload, Users, ListFilter, BarChart3, MessagesSquare
} from 'lucide-react';
import SidebarNavigationGroup from './SidebarNavigationGroup';
import SidebarNavLink from './SidebarNavLink';

interface SidebarNavigationSectionProps {
  collapsed: boolean;
}

const SidebarNavigationSection: React.FC<SidebarNavigationSectionProps> = ({ collapsed }) => {
  const location = useLocation();
  const { currentProduct } = useProduct();
  
  const isActive = (path: string) => location.pathname === path;

  // Renderiza apenas links relacionados ao produto atual
  return (
    <>
      {currentProduct === 'retention' && (
        <>
          <SidebarNavigationGroup
            title="Principal"
            collapsed={collapsed}
          >
            <SidebarNavLink 
              to="/" 
              icon={Home} 
              label="Dashboard" 
              isActive={isActive('/')} // Changed from active to isActive
              collapsed={collapsed}
            />
            <SidebarNavLink 
              to="/students" 
              icon={Users} 
              label="Alunos" 
              isActive={location.pathname.startsWith('/students')} // Changed from active to isActive
              collapsed={collapsed}
            />
            <SidebarNavLink 
              to="/model" 
              icon={School} 
              label="Modelo" 
              isActive={location.pathname.startsWith('/model')} // Changed from active to isActive
              collapsed={collapsed}
            />
          </SidebarNavigationGroup>
          
          <SidebarNavigationGroup
            title="Monitoramento"
            collapsed={collapsed}
          >
            <SidebarNavLink 
              to="/alerts" 
              icon={BookOpen} 
              label="Alertas" 
              isActive={location.pathname.startsWith('/alerts')} // Changed from active to isActive
              collapsed={collapsed}
            />
            <SidebarNavLink 
              to="/reports" 
              icon={BarChart} 
              label="Relatórios" 
              isActive={location.pathname.startsWith('/reports')} // Changed from active to isActive
              collapsed={collapsed}
            />
            <SidebarNavLink 
              to="/surveys" 
              icon={Mail} 
              label="Pesquisas" 
              isActive={location.pathname.startsWith('/surveys')} // Changed from active to isActive
              collapsed={collapsed}
            />
          </SidebarNavigationGroup>
        </>
      )}
      
      {currentProduct === 'recruitment' && (
        <>
          <SidebarNavigationGroup
            title="Captação"
            collapsed={collapsed}
          >
            <SidebarNavLink 
              to="/recruitment" 
              icon={Home} 
              label="Dashboard" 
              isActive={isActive('/recruitment')} // Changed from active to isActive
              collapsed={collapsed}
            />
            <SidebarNavLink 
              to="/recruitment/leads" 
              icon={Users} 
              label="Leads" 
              isActive={location.pathname.startsWith('/recruitment/leads')} // Changed from active to isActive
              collapsed={collapsed}
            />
            <SidebarNavLink 
              to="/recruitment/funnel" 
              icon={Filter} 
              label="Funil" 
              isActive={location.pathname.startsWith('/recruitment/funnel')} // Changed from active to isActive
              collapsed={collapsed}
            />
            <SidebarNavLink 
              to="/recruitment/campaigns" 
              icon={ListFilter} 
              label="Campanhas" 
              isActive={location.pathname.startsWith('/recruitment/campaigns')} // Changed from active to isActive
              collapsed={collapsed}
            />
          </SidebarNavigationGroup>
          
          <SidebarNavigationGroup
            title="Comunicação"
            collapsed={collapsed}
          >
            <SidebarNavLink 
              to="/recruitment/conversation" 
              icon={MessageSquare} 
              label="Conversas" 
              isActive={location.pathname.startsWith('/recruitment/conversation')} // Changed from active to isActive
              collapsed={collapsed}
            />
            <SidebarNavLink 
              to="/recruitment/predictions" 
              icon={BarChart3} 
              label="Previsões" 
              isActive={location.pathname.startsWith('/recruitment/predictions')} // Changed from active to isActive
              collapsed={collapsed}
            />
          </SidebarNavigationGroup>
        </>
      )}
      
      {/* Seção comum a ambos os produtos */}
      <SidebarNavigationGroup
        title="Utilidades"
        collapsed={collapsed}
      >
        <SidebarNavLink 
          to="/upload" 
          icon={Upload} 
          label="Upload" 
          isActive={location.pathname.startsWith('/upload')} // Changed from active to isActive
          collapsed={collapsed}
        />
      </SidebarNavigationGroup>
    </>
  );
};

export default SidebarNavigationSection;
