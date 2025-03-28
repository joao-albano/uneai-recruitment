
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';
import { ProductType } from '@/context/product/types';
import PlanFeatureItem from './PlanFeatureItem';
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
      billing: isPtBR ? 'Cobrança' : 'Billing'
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

  // Format the price with correct thousand separators and currency for Brazilian format
  const formatPrice = (value: number): string => {
    if (isPtBR) {
      return `R$ ${value.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
    }
    return `$${value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  };

  // Get the yearly price based on plan ID
  const getYearlyPrice = () => {
    if (id === 'basic') return 249;
    if (id === 'premium') return 499;
    if (id === 'enterprise') return 999;
    return priceYearly;
  };
  
  // Format the yearly price text 
  const getYearlyPriceText = () => {
    if (isPtBR) {
      if (id === 'basic') return 'R$ 249,00 cobrados anualmente';
      if (id === 'premium') return 'R$ 499,00 cobrados anualmente';
      if (id === 'enterprise') return 'R$ 999,00 cobrados anualmente';
    } else {
      if (id === 'basic') return '$249.00 billed yearly';
      if (id === 'premium') return '$499.00 billed yearly';
      if (id === 'enterprise') return '$999.00 billed yearly';
    }
    return formatPrice(priceYearly) + (isPtBR ? ' cobrados anualmente' : ' billed yearly');
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
          {formatPrice(priceMonthly)}{' '}
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
