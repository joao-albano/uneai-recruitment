
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';
import { ProductType } from '@/context/product/types';
import PlanFeatureItem from './PlanFeatureItem';
import { formatCurrency } from '@/utils/billing/formatCurrency';
import { Package } from 'lucide-react';

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
  associatedProducts?: ProductType[];
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
  onSelect,
  associatedProducts = []
}) => {
  const { language } = useTheme();
  const isPtBR = language === 'pt-BR';

  const getProductName = (productType: ProductType): string => {
    const productNameMap: Record<ProductType, string> = {
      retention: isPtBR ? 'Retenção' : 'Retention',
      sales: isPtBR ? 'Vendas' : 'Sales',
      scheduling: isPtBR ? 'Agendamento' : 'Scheduling',
      recruitment: isPtBR ? 'Captação' : 'Recruitment',
      secretary: isPtBR ? 'Secretaria' : 'Secretary',
      pedagogical: isPtBR ? 'Pedagógico' : 'Pedagogical',
      billing: isPtBR ? 'Faturamento' : 'Billing'
    };
    
    return productNameMap[productType] || productType;
  };

  const handleSelect = () => {
    onSelect({
      id,
      name,
      description,
      priceMonthly,
      priceYearly,
      features,
      highlightPlan,
      associatedProducts
    });
  };

  // Format the yearly price text to match what's shown in the image
  const getYearlyPriceText = () => {
    if (isPtBR) {
      if (id === 'basic') return 'R$ 2,99 cobrados anualmente';
      if (id === 'premium') return 'R$ 5,99 cobrados anualmente';
      if (id === 'enterprise') return 'R$ 9,99 cobrados anualmente';
    } else {
      if (id === 'basic') return '$2.99 billed yearly';
      if (id === 'premium') return '$5.99 billed yearly';
      if (id === 'enterprise') return '$9.99 billed yearly';
    }
    return formatCurrency(priceYearly, isPtBR) + (isPtBR ? ' cobrados anualmente' : ' billed yearly');
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
          {isPtBR ? `R$ ${priceMonthly.toFixed(2).replace('.', ',')}` : `$${priceMonthly.toFixed(2)}`}{' '}
          <span className="text-sm font-normal text-muted-foreground">
            {isPtBR ? '/mês' : '/month'}
          </span>
        </div>

        {yearlyBilling && (
          <div className="text-sm text-muted-foreground mb-6">
            {getYearlyPriceText()}
          </div>
        )}

        {associatedProducts && associatedProducts.length > 0 && (
          <div className="mt-2 mb-4">
            <p className="text-sm text-muted-foreground mb-2">
              {isPtBR ? 'Produtos incluídos:' : 'Included products:'}
            </p>
            <div className="flex flex-wrap gap-2">
              {associatedProducts.map(product => (
                <Badge key={product} variant="outline" className="flex items-center gap-1">
                  <Package className="h-3 w-3" />
                  {getProductName(product)}
                </Badge>
              ))}
            </div>
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
