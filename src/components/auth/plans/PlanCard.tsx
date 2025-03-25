
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Plan } from '@/hooks/usePlans';
import { formatCurrency } from '@/utils/billing/formatCurrency';

interface PlanCardProps {
  plan: Plan;
  isSelected: boolean;
  onClick: (planId: string) => void;
}

const PlanCard: React.FC<PlanCardProps> = ({ 
  plan, 
  isSelected, 
  onClick,
}) => {
  // Debugar os dados do plano
  console.log('Renderizando plano:', plan);
  
  return (
    <div className="relative">
      <Card 
        className={cn(
          "cursor-pointer transition-all border-2",
          isSelected 
            ? "border-primary ring-2 ring-primary/20" 
            : "hover:border-muted-foreground/20"
        )}
        onClick={() => {
          console.log('Clique no plano:', plan.id);
          onClick(plan.id);
        }}
      >
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-semibold text-lg">{plan.name}</h4>
              <p className="text-sm text-muted-foreground">{plan.description}</p>
              <div className="mt-2 font-bold text-xl">
                {formatCurrency(plan.price)}<span className="font-normal text-sm">/ano</span>
              </div>
            </div>
            {isSelected && (
              <CheckCircle2 className="text-primary h-5 w-5" />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlanCard;
