
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
import { useProduct, ProductType } from '@/context/product';
import { useAuth } from '@/context/auth';
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
  const { isAdmin, isSuperAdmin } = useAuth();
  
  // Safe access to ProductContext with fallback values
  let currentProduct: ProductType | null = null;
  let hasAccessToProduct = (productType: ProductType) => true; // Fixed signature to match the actual function
  let availableProducts: ProductType[] = [];
  
  try {
    const productContext = useProduct();
    if (productContext) {
      currentProduct = productContext.currentProduct;
      hasAccessToProduct = productContext.hasAccessToProduct;
      availableProducts = productContext.availableProducts;
    }
  } catch (error) {
    console.error('ProductContext not available:', error);
    // Continue with fallback values
  }
  
  console.log('SidebarContent - isAdmin:', isAdmin, 'isSuperAdmin:', isSuperAdmin);
  
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
        {/* Renderiza menus apenas se o usuário tiver acesso ao produto ou for super admin */}
        {isSuperAdmin || (!currentProduct || hasAccessToProduct(currentProduct)) ? (
          <>
            {/* Navegação - sempre renderizado */}
            <SidebarNavigationSection collapsed={collapsed} />
            
            {/* Monitoramento - apenas para retenção ou super admin, e não para captação */}
            {(!currentProduct || (currentProduct === 'retention' && currentProduct !== 'recruitment') || isSuperAdmin) && (
              <SidebarMonitoringSection collapsed={collapsed} />
            )}
            
            {/* Faturamento - apenas para billing ou super admin, e não para captação */}
            {(!currentProduct || (currentProduct === 'billing' && currentProduct !== 'recruitment') || isSuperAdmin) && (
              <SidebarBillingSection collapsed={collapsed} />
            )}
          </>
        ) : (
          // Mensagem de sem acesso mais detalhada
          <div className="flex flex-col items-center justify-center text-center h-40 px-4 mt-4">
            <AlertTriangle className="text-amber-500 mb-2 h-10 w-10" />
            <p className="text-sm text-muted-foreground mb-2">
              Sua organização não possui acesso a este produto.
            </p>
            {availableProducts.length > 0 && (
              <p className="text-xs text-muted-foreground">
                Produtos disponíveis: {availableProducts.map(p => {
                  switch(p) {
                    case 'retention': return 'Retenção';
                    case 'billing': return 'Cobrança';
                    case 'recruitment': return 'Recrutamento';
                    default: return p;
                  }
                }).join(', ')}
              </p>
            )}
          </div>
        )}
        
        {/* Menus de administração são exibidos com base no nível de acesso e não estando no produto de captação */}
        {(isAdmin || isSuperAdmin) && currentProduct !== 'recruitment' && (
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
