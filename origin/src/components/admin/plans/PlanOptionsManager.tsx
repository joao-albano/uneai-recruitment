
import React, { useState, useEffect } from 'react';
import { usePlanOptionsStore, PlanOption } from '@/utils/billing/planOptions';
import { useToast } from '@/hooks/use-toast';
import { useTheme } from '@/context/ThemeContext';
import { ProductType } from '@/context/ProductContext';
import PlanSidebarList from './PlanSidebarList';
import PlanTabsContainer from './PlanTabsContainer';
import PlanManagerHeader from './PlanManagerHeader';

const PlanOptionsManager: React.FC = () => {
  const { plans, setPlan, resetToDefaults } = usePlanOptionsStore();
  const { language } = useTheme();
  const { toast } = useToast();
  const [editingPlan, setEditingPlan] = useState<PlanOption | null>(null);
  const [activeTab, setActiveTab] = useState<string>('details');
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  
  const isPtBR = language === 'pt-BR';
  
  useEffect(() => {
    // Set the first plan as selected by default if none is selected
    if (!selectedPlanId && plans.length > 0) {
      setSelectedPlanId(plans[0].id);
    }
  }, [plans, selectedPlanId]);

  const handleEditClick = (plan: PlanOption) => {
    setEditingPlan(plan);
    setSelectedPlanId(plan.id);
    setActiveTab('details');
  };
  
  const handleSubmit = (values: any) => {
    if (!editingPlan) return;
    
    // Preserve the existing relatedProduct when updating
    setPlan(editingPlan.id, {
      name: values.name,
      price: values.price,
      description: values.description,
      features: values.features,
      relatedProduct: editingPlan.relatedProduct, // Keep the existing value
    });
    
    toast({
      title: isPtBR ? "Plano atualizado" : "Plan updated",
      description: isPtBR 
        ? `O plano ${values.name} foi atualizado com sucesso.` 
        : `The ${values.name} plan was successfully updated.`,
    });
    
    setEditingPlan(null);
  };
  
  const handleCancelEdit = () => {
    setEditingPlan(null);
  };
  
  const handleResetToDefaults = () => {
    resetToDefaults();
    toast({
      title: isPtBR ? "Planos redefinidos" : "Plans reset",
      description: isPtBR 
        ? "Todos os planos foram redefinidos para os valores padrão." 
        : "All plans have been reset to default values.",
    });
  };

  const handlePlanSelect = (planId: string) => {
    setSelectedPlanId(planId);
    setEditingPlan(null);
  };

  const handleUpdateProducts = (planId: string, products: ProductType[]) => {
    const plan = plans.find(p => p.id === planId);
    if (plan) {
      setPlan(planId, {
        ...plan,
        products: products
      });

      toast({
        title: isPtBR ? "Produtos atualizados" : "Products updated",
        description: isPtBR 
          ? `Os produtos do plano ${plan.name} foram atualizados com sucesso.` 
          : `Products for the ${plan.name} plan were successfully updated.`,
      });
    }
  };

  const handleUpdateLimits = (planId: string, limits: PlanOption['limits']) => {
    const plan = plans.find(p => p.id === planId);
    if (plan) {
      setPlan(planId, {
        ...plan,
        limits: limits
      });

      toast({
        title: isPtBR ? "Limites atualizados" : "Limits updated",
        description: isPtBR 
          ? `Os limites do plano ${plan.name} foram atualizados com sucesso.` 
          : `Limits for the ${plan.name} plan were successfully updated.`,
      });
    }
  };

  const selectedPlan = plans.find(p => p.id === selectedPlanId) || null;
  
  return (
    <div className="space-y-6">
      <PlanManagerHeader onResetToDefaults={handleResetToDefaults} />
      
      <div className="grid md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <PlanSidebarList 
            plans={plans}
            selectedPlanId={selectedPlanId}
            onPlanSelect={handlePlanSelect}
            onEditClick={handleEditClick}
          />
        </div>
        
        <div className="md:col-span-3">
          <PlanTabsContainer 
            selectedPlan={selectedPlan}
            activeTab={activeTab}
            editingPlan={editingPlan}
            setActiveTab={setActiveTab}
            onEditClick={handleEditClick}
            onSubmit={handleSubmit}
            onCancelEdit={handleCancelEdit}
            onUpdateProducts={handleUpdateProducts}
            onUpdateLimits={handleUpdateLimits}
          />
        </div>
      </div>
    </div>
  );
};

export default PlanOptionsManager;
