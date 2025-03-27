
import React, { useState, useEffect } from 'react';
import { usePlanOptionsStore, PlanOption } from '@/utils/billing/planOptions';
import { useTheme } from '@/context/ThemeContext';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PlanCard from './PlanCard';
import PlanEditForm from './PlanEditForm';
import ResetPlansDialog from './ResetPlansDialog';
import ProductAssociationManager from './ProductAssociationManager';
import { ProductType } from '@/context/ProductContext';

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

  const selectedPlan = plans.find(p => p.id === selectedPlanId) || null;
  const associatedProducts = selectedPlan?.products as ProductType[] || [];
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">
          {isPtBR ? "Gerenciar Planos" : "Manage Plans"}
        </h2>
        
        <ResetPlansDialog onReset={handleResetToDefaults} />
      </div>
      
      <div className="grid md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">
              {isPtBR ? "Planos Disponíveis" : "Available Plans"}
            </h3>
            
            {plans.map((plan) => (
              <PlanCard 
                key={plan.id}
                plan={plan}
                isSelected={selectedPlanId === plan.id}
                onEditClick={handleEditClick}
                onSelect={handlePlanSelect}
              />
            ))}
          </div>
        </div>
        
        <div className="md:col-span-3">
          {selectedPlan ? (
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="details">
                  {isPtBR ? "Detalhes" : "Details"}
                </TabsTrigger>
                <TabsTrigger value="products">
                  {isPtBR ? "Produtos" : "Products"}
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="details">
                {editingPlan ? (
                  <PlanEditForm
                    editingPlan={editingPlan}
                    onSubmit={handleSubmit}
                    onCancel={handleCancelEdit}
                  />
                ) : (
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">{selectedPlan.name}</h3>
                    <p className="text-muted-foreground">{selectedPlan.description}</p>
                    <div className="font-medium text-lg">{selectedPlan.price}</div>
                    
                    <div className="pt-2">
                      <h4 className="font-medium mb-2">{isPtBR ? "Recursos:" : "Features:"}</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {selectedPlan.features?.map((feature, idx) => (
                          <li key={idx} className="text-muted-foreground">{feature}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="pt-4">
                      <Button onClick={() => handleEditClick(selectedPlan)}>
                        {isPtBR ? "Editar Detalhes" : "Edit Details"}
                      </Button>
                    </div>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="products">
                <ProductAssociationManager
                  planId={selectedPlan.id}
                  planName={selectedPlan.name}
                  associatedProducts={associatedProducts}
                  onUpdateProducts={handleUpdateProducts}
                />
              </TabsContent>
            </Tabs>
          ) : (
            <Alert variant="default">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {isPtBR 
                  ? "Selecione um plano para visualizar ou editar seus detalhes." 
                  : "Select a plan to view or edit its details."}
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlanOptionsManager;
