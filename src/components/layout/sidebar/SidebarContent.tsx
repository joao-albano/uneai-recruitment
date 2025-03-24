
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
import { AlertTriangle } from 'lucide-react';

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
  const { currentProduct, hasAccessToProduct } = useProduct();
  
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
        {/* Verifica acesso ao produto atual */}
        {hasAccessToProduct(currentProduct) ? (
          <>
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
          </>
        ) : (
          // Mensagem de sem acesso
          <div className="flex flex-col items-center justify-center text-center h-40 px-4">
            <AlertTriangle className="text-amber-500 mb-2 h-10 w-10" />
            <p className="text-sm text-muted-foreground">
              Você não tem acesso a este produto. Contate o administrador.
            </p>
          </div>
        )}
        
        {/* Os billings são mostrados para todos os usuários para que possam gerenciar suas assinaturas */}
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
