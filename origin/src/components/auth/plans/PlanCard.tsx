
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, Package } from 'lucide-react';
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
              
              {plan.relatedProduct && (
                <div className="mt-2 flex items-center text-xs text-muted-foreground">
                  <Package className="h-3 w-3 mr-1" />
                  <span>{plan.relatedProduct}</span>
                </div>
              )}
              
              <div className="mt-2 font-bold text-xl">
                {formatCurrency(plan.price)}<span className="font-normal text-sm">/ano</span>
              </div>
              
              {plan.features && plan.features.length > 0 && (
                <div className="mt-3 space-y-2">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <CheckCircle2 className="text-green-500 h-4 w-4 mr-2" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              )}
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
