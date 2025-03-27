
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import { usePlanOptionsStore, PlanOption } from '@/utils/billing/planOptions';
import { ProductType } from '@/context/product/types';
import ProductAssociationManager from '../ProductAssociationManager';
import PlanLimitsManager from '../PlanLimitsManager';
import PlanEditForm from '../PlanEditForm';

interface PlanDetailsTabProps {
  selectedPlan: PlanOption;
  editingPlan?: PlanOption | null;
  onEditClick?: (plan: PlanOption) => void;
  onSubmit?: (values: any) => void;
  onCancelEdit?: () => void;
}

const PlanDetailsTab = ({ selectedPlan, editingPlan, onEditClick, onSubmit, onCancelEdit }: PlanDetailsTabProps) => {
  const { setPlan } = usePlanOptionsStore();
  const [isEditMode, setIsEditMode] = useState(false);
  
  const handleEditClick = () => {
    if (onEditClick) {
      onEditClick(selectedPlan);
    } else {
      setIsEditMode(true);
    }
  };
  
  const handleCancelEdit = () => {
    if (onCancelEdit) {
      onCancelEdit();
    } else {
      setIsEditMode(false);
    }
  };
  
  const handleSaveEdit = (updatedPlan: Partial<PlanOption>) => {
    if (onSubmit) {
      onSubmit(updatedPlan);
    } else {
      setPlan(selectedPlan.id, updatedPlan);
      setIsEditMode(false);
    }
  };
  
  const handleProductsChange = (products: ProductType[]) => {
    setPlan(selectedPlan.id, { products });
  };
  
  const handleLimitsChange = (limits: PlanOption['limits']) => {
    setPlan(selectedPlan.id, { limits });
  };
  
  if (editingPlan || isEditMode) {
    return (
      <PlanEditForm 
        editingPlan={editingPlan || selectedPlan}
        onSubmit={handleSaveEdit}
        onCancel={handleCancelEdit}
      />
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold">{selectedPlan.name}</h2>
          <p className="text-muted-foreground">{selectedPlan.description}</p>
          <p className="text-lg font-medium mt-2">{selectedPlan.price}</p>
        </div>
        <Button variant="outline" onClick={handleEditClick} className="gap-1">
          <Pencil className="h-4 w-4" />
          Editar
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProductAssociationManager 
          planName={selectedPlan.name}
          planId={selectedPlan.id}
          associatedProducts={selectedPlan.products || []}
          onProductsChange={handleProductsChange}
        />
        
        <PlanLimitsManager 
          planName={selectedPlan.name}
          limits={selectedPlan.limits}
          onLimitsChange={handleLimitsChange}
        />
      </div>
    </div>
  );
};

export default PlanDetailsTab;
