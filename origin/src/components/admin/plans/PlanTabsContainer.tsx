
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlanOption } from '@/utils/billing/planOptions';
import { ProductType } from '@/context/ProductContext';
import { useTheme } from '@/context/ThemeContext';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import PlanDetailsTab from './tabs/PlanDetailsTab';
import ProductAssociationManager from './ProductAssociationManager';
import PlanLimitsManager from './PlanLimitsManager';

interface PlanTabsContainerProps {
  selectedPlan: PlanOption | null;
  activeTab: string;
  editingPlan: PlanOption | null;
  setActiveTab: (tab: string) => void;
  onEditClick: (plan: PlanOption) => void;
  onSubmit: (values: any) => void;
  onCancelEdit: () => void;
  onUpdateProducts: (planId: string, products: ProductType[]) => void;
  onUpdateLimits: (planId: string, limits: PlanOption['limits']) => void;
}

const PlanTabsContainer: React.FC<PlanTabsContainerProps> = ({
  selectedPlan,
  activeTab,
  editingPlan,
  setActiveTab,
  onEditClick,
  onSubmit,
  onCancelEdit,
  onUpdateProducts,
  onUpdateLimits
}) => {
  const { language } = useTheme();
  const isPtBR = language === 'pt-BR';

  if (!selectedPlan) {
    return (
      <Alert variant="default">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          {isPtBR 
            ? "Selecione um plano para visualizar ou editar seus detalhes." 
            : "Select a plan to view or edit its details."}
        </AlertDescription>
      </Alert>
    );
  }

  const associatedProducts = selectedPlan?.products as ProductType[] || [];

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="mb-4">
        <TabsTrigger value="details">
          {isPtBR ? "Detalhes" : "Details"}
        </TabsTrigger>
        <TabsTrigger value="products">
          {isPtBR ? "Produtos" : "Products"}
        </TabsTrigger>
        <TabsTrigger value="limits">
          {isPtBR ? "Limites e Recursos" : "Limits & Resources"}
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="details">
        <PlanDetailsTab 
          selectedPlan={selectedPlan}
          editingPlan={editingPlan}
          onEditClick={onEditClick}
          onSubmit={onSubmit}
          onCancelEdit={onCancelEdit}
        />
      </TabsContent>
      
      <TabsContent value="products">
        <ProductAssociationManager
          planId={selectedPlan.id}
          planName={selectedPlan.name}
          associatedProducts={associatedProducts}
          onUpdateProducts={onUpdateProducts}
        />
      </TabsContent>

      <TabsContent value="limits">
        <PlanLimitsManager
          planId={selectedPlan.id}
          planName={selectedPlan.name}
          limits={selectedPlan.limits}
          onUpdateLimits={onUpdateLimits}
        />
      </TabsContent>
    </Tabs>
  );
};

export default PlanTabsContainer;
