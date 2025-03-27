
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Pencil, Package, CheckCircle2 } from 'lucide-react';
import { PlanOption } from '@/utils/billing/planOptions';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';

interface PlanCardProps {
  plan: PlanOption;
  isSelected?: boolean;
  onEditClick: (plan: PlanOption) => void;
  onSelect?: (planId: string) => void;
}

const PlanCard: React.FC<PlanCardProps> = ({ 
  plan, 
  isSelected = false,
  onEditClick,
  onSelect = () => {} 
}) => {
  const { language } = useTheme();
  const isPtBR = language === 'pt-BR';
  
  const productsCount = plan.products?.length || 0;
  
  return (
    <Card 
      key={plan.id} 
      className={cn(
        "overflow-hidden border-2 transition-all cursor-pointer",
        isSelected ? "border-primary" : "border-border hover:border-primary/50"
      )}
      onClick={() => onSelect(plan.id)}
    >
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
        
        {productsCount > 0 && (
          <div className="mt-2 text-sm text-muted-foreground">
            <Badge variant="outline">
              {isPtBR ? `${productsCount} produtos` : `${productsCount} products`}
            </Badge>
          </div>
        )}
        
        {plan.features && plan.features.length > 0 && (
          <div className="mt-3 space-y-1">
            {plan.features.slice(0, 2).map((feature, idx) => (
              <div key={idx} className="flex items-center text-sm">
                <CheckCircle2 className="text-green-500 h-4 w-4 mr-1" />
                <span>{feature}</span>
              </div>
            ))}
            {plan.features.length > 2 && (
              <div className="text-xs text-muted-foreground">
                {isPtBR 
                  ? `+ ${plan.features.length - 2} recursos` 
                  : `+ ${plan.features.length - 2} more features`}
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full gap-2"
          onClick={(e) => {
            e.stopPropagation();
            onEditClick(plan);
          }}
        >
          <Pencil className="h-4 w-4" />
          {isPtBR ? "Editar Plano" : "Edit Plan"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PlanCard;
