
import React from 'react';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import SidebarHeader from './SidebarHeader';
import SidebarFooter from './SidebarFooter';
import SidebarNavigationSection from './SidebarNavigationSection';
import SidebarSettingsSection from './SidebarSettingsSection';
import SidebarAdminSection from './SidebarAdminSection';
import SidebarBillingSection from './SidebarBillingSection';
import SidebarMonitoringSection from './SidebarMonitoringSection';
import { useProduct } from '@/context/ProductContext';

interface SidebarContentProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  onClose: () => void;
  sidebarWidth: number;
  currentUser: any;
}

const SidebarContent: React.FC<SidebarContentProps> = ({
  collapsed,
  onToggleCollapse,
  onClose,
  sidebarWidth,
  currentUser
}) => {
  const isAdmin = currentUser?.role === 'admin';
  const { currentProduct } = useProduct();
  
  return (
    <div 
      className={cn(
        "h-full flex flex-col py-4 transition-all duration-300",
        collapsed ? "w-20" : "w-70"
      )}
      style={{ width: `${sidebarWidth}px` }}
    >
      <SidebarHeader 
        collapsed={collapsed} 
        onToggleCollapse={onToggleCollapse} 
        onClose={onClose}
      />
      
      <div className="flex-1 px-3 py-2 overflow-y-auto">
        {/* Renderiza menu com base no produto selecionado */}
        {currentProduct === 'retention' && (
          <>
            <SidebarNavigationSection collapsed={collapsed} />
            <SidebarMonitoringSection collapsed={collapsed} />
          </>
        )}
        
        {currentProduct === 'billing' && (
          <SidebarBillingSection collapsed={collapsed} />
        )}
        
        {currentProduct === 'recruitment' && (
          <SidebarNavigationSection collapsed={collapsed} /> // Um exemplo, seria substituído pelo menu específico
        )}
        
        {/* Esta seção é comum a todos os produtos */}
        <SidebarBillingSection collapsed={collapsed} />
        
        {isAdmin && (
          <SidebarAdminSection collapsed={collapsed} />
        )}
      </div>
      
      <div className="px-3 mt-auto">
        <Separator className="my-2" />
        <SidebarSettingsSection collapsed={collapsed} />
      </div>
      
      <SidebarFooter collapsed={collapsed} />
    </div>
  );
};

export default SidebarContent;
