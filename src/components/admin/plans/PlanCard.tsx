
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Pencil, Package, CheckCircle2 } from 'lucide-react';
import { PlanOption } from '@/utils/billing/planOptions';
import { useTheme } from '@/context/ThemeContext';

interface PlanCardProps {
  plan: PlanOption;
  onEditClick: (plan: PlanOption) => void;
}

const PlanCard: React.FC<PlanCardProps> = ({ plan, onEditClick }) => {
  const { language } = useTheme();
  const isPtBR = language === 'pt-BR';
  
  return (
    <Card key={plan.id} className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>{plan.name}</CardTitle>
          {plan.id === 'premium' && (
            <Badge variant="secondary">
              {isPtBR ? "Mais popular" : "Most popular"}
            </Badge>
          )}
        </div>
        <CardDescription>{plan.description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="text-2xl font-bold">{plan.price}</div>
        
        {plan.relatedProduct && (
          <div className="mt-2 text-sm text-muted-foreground flex items-center">
            <Package className="h-4 w-4 mr-1" />
            <span>{plan.relatedProduct}</span>
          </div>
        )}
        
        {plan.features && plan.features.length > 0 && (
          <div className="mt-3 space-y-1">
            {plan.features.map((feature, idx) => (
              <div key={idx} className="flex items-center text-sm">
                <CheckCircle2 className="text-green-500 h-4 w-4 mr-1" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full gap-2"
          onClick={() => onEditClick(plan)}
        >
          <Pencil className="h-4 w-4" />
          {isPtBR ? "Editar Plano" : "Edit Plan"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PlanCard;
