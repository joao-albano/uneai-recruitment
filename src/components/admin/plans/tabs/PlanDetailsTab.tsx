
import React from 'react';
import { PlanOption } from '@/utils/billing/planOptions';
import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import PlanEditForm from '../PlanEditForm';

interface PlanDetailsTabProps {
  selectedPlan: PlanOption | null;
  editingPlan: PlanOption | null;
  onEditClick: (plan: PlanOption) => void;
  onSubmit: (values: any) => void;
  onCancelEdit: () => void;
}

const PlanDetailsTab: React.FC<PlanDetailsTabProps> = ({
  selectedPlan,
  editingPlan,
  onEditClick,
  onSubmit,
  onCancelEdit,
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

  if (editingPlan) {
    return (
      <PlanEditForm
        editingPlan={editingPlan}
        onSubmit={onSubmit}
        onCancel={onCancelEdit}
      />
    );
  }

  return (
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
        <Button onClick={() => onEditClick(selectedPlan)}>
          {isPtBR ? "Editar Detalhes" : "Edit Details"}
        </Button>
      </div>
    </div>
  );
};

export default PlanDetailsTab;
