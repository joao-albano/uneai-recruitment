
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useToast } from '@/hooks/use-toast';
import { usePlanOptions } from '@/utils/billing/planOptions';

interface ChangePlanDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedPlan: string;
  onPlanChange: (value: string) => void;
  currentPlan: string;
}

const ChangePlanDialog: React.FC<ChangePlanDialogProps> = ({ 
  open, 
  onOpenChange, 
  selectedPlan, 
  onPlanChange,
  currentPlan
}) => {
  const { language } = useTheme();
  const { toast } = useToast();
  const isPtBR = language === 'pt-BR';
  
  // Get plan options from the utility hook
  const availablePlans = usePlanOptions();

  const handlePlanSubmit = () => {
    // Here would be the logic to change the plan in the backend
    toast({
      title: isPtBR ? "Plano alterado com sucesso!" : "Plan changed successfully!",
      description: isPtBR 
        ? "A mudança entrará em vigor no próximo ciclo de faturamento." 
        : "The change will take effect on your next billing cycle.",
      variant: "default",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isPtBR ? 'Alterar seu plano' : 'Change your plan'}
          </DialogTitle>
          <DialogDescription>
            {isPtBR 
              ? 'Selecione o plano que melhor atende às suas necessidades.' 
              : 'Select the plan that best suits your needs.'}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <RadioGroup value={selectedPlan} onValueChange={onPlanChange} className="space-y-4">
            {availablePlans.map(plan => (
              <div key={plan.id} className="flex items-start space-x-3 rounded-lg border p-4 relative">
                <RadioGroupItem value={plan.id} id={plan.id} className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor={plan.id} className="text-base font-medium flex items-center justify-between">
                    {plan.name}
                    {plan.id === currentPlan.toLowerCase() && (
                      <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">
                        {isPtBR ? 'Atual' : 'Current'}
                      </Badge>
                    )}
                  </Label>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                  <p className="text-sm font-medium mt-2">{plan.price}</p>
                </div>
                {selectedPlan === plan.id && (
                  <CheckCircle className="h-5 w-5 text-primary absolute right-4 top-4" />
                )}
              </div>
            ))}
          </RadioGroup>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {isPtBR ? 'Cancelar' : 'Cancel'}
          </Button>
          <Button onClick={handlePlanSubmit}>
            {isPtBR ? 'Confirmar Alteração' : 'Confirm Change'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePlanDialog;
