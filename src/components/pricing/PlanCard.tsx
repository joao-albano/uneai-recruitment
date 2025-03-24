
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';
import PlanFeatureItem from './PlanFeatureItem';

export type PlanFeature = {
  included: boolean;
  text: string;
};

export type PlanCardProps = {
  id: string;
  name: string;
  description: string;
  priceMonthly: number;
  priceYearly: number;
  features: PlanFeature[];
  highlightPlan?: boolean;
  yearlyBilling: boolean;
  onSelect: (plan: any) => void;
};

const PlanCard: React.FC<PlanCardProps> = ({
  id,
  name,
  description,
  priceMonthly,
  priceYearly,
  features,
  highlightPlan,
  yearlyBilling,
  onSelect
}) => {
  const { language } = useTheme();
  const isPtBR = language === 'pt-BR';

  const formatCurrency = (value: number): string => {
    // Use Intl.NumberFormat to properly format currency values
    return new Intl.NumberFormat(isPtBR ? 'pt-BR' : 'en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const handleSelect = () => {
    onSelect({
      id,
      name,
      description,
      priceMonthly,
      priceYearly,
      features,
      highlightPlan
    });
  };

  return (
    <Card 
      className={cn(
        "flex flex-col h-full", 
        highlightPlan && "border-primary shadow-lg"
      )}
    >
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription className="text-md">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="text-3xl font-bold mb-2">
          {isPtBR ? 'R$' : '$'} {formatCurrency(yearlyBilling ? Math.round(priceYearly / 12) : priceMonthly)}{' '}
          <span className="text-sm font-normal text-muted-foreground">
            {isPtBR ? '/mês' : '/month'}
          </span>
        </div>

        {yearlyBilling && (
          <div className="text-sm text-muted-foreground mb-6">
            {isPtBR 
              ? `R$ ${formatCurrency(priceYearly)} cobrados anualmente` 
              : `$${formatCurrency(priceYearly)} billed yearly`}
          </div>
        )}

        <ul className="space-y-2 mt-6">
          {features.map((feature, i) => (
            <PlanFeatureItem 
              key={i} 
              text={feature.text} 
              included={feature.included} 
            />
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={handleSelect}
          variant={highlightPlan ? "default" : "outline"}
        >
          {isPtBR ? 'Selecionar Plano' : 'Select Plan'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PlanCard;
