
import React, { useState } from 'react';
import { usePlanOptionsStore, PlanOption } from '@/utils/billing/planOptions';
import { useTheme } from '@/context/ThemeContext';
import { useToast } from '@/hooks/use-toast';
import PlanCard from './PlanCard';
import PlanEditForm from './PlanEditForm';
import ResetPlansDialog from './ResetPlansDialog';

const PlanOptionsManager: React.FC = () => {
  const { plans, setPlan, resetToDefaults } = usePlanOptionsStore();
  const { language } = useTheme();
  const { toast } = useToast();
  const [editingPlan, setEditingPlan] = useState<PlanOption | null>(null);
  
  const isPtBR = language === 'pt-BR';
  
  const handleEditClick = (plan: PlanOption) => {
    setEditingPlan(plan);
  };
  
  const handleSubmit = (values: any) => {
    if (!editingPlan) return;
    
    setPlan(editingPlan.id, {
      name: values.name,
      price: values.price,
      description: values.description,
      relatedProduct: values.relatedProduct,
      features: values.features,
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
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">
          {isPtBR ? "Gerenciar Planos" : "Manage Plans"}
        </h2>
        
        <ResetPlansDialog onReset={handleResetToDefaults} />
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <PlanCard 
            key={plan.id}
            plan={plan}
            onEditClick={handleEditClick}
          />
        ))}
      </div>
      
      {editingPlan && (
        <PlanEditForm
          editingPlan={editingPlan}
          onSubmit={handleSubmit}
          onCancel={handleCancelEdit}
        />
      )}
    </div>
  );
};

export default PlanOptionsManager;
