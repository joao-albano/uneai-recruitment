
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Package } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { ProductType } from '@/context/product/types';

interface Plan {
  id: string;
  name: string;
  priceMonthly: number;
  priceYearly: number;
  associatedProducts?: ProductType[];
}

interface PaymentSummaryProps {
  plan: Plan;
  yearlyBilling: boolean;
}

const PaymentSummary: React.FC<PaymentSummaryProps> = ({ plan, yearlyBilling }) => {
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
  
  // Get the correct yearly price based on plan ID
  const getYearlyPrice = () => {
    if (plan.id === 'basic') return 249;
    if (plan.id === 'premium') return 499;
    if (plan.id === 'enterprise') return 999;
    return plan.priceYearly;
  };
  
  // Get the correct monthly price based on plan ID
  const getMonthlyPrice = () => {
    if (plan.id === 'enterprise') return 1;
    return 0; // Basic and Premium plans are free monthly
  };
  
  // Format currency for display
  const formatPrice = (value: number): string => {
    if (isPtBR) {
      return `R$ ${value.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
    }
    return `$${value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  };
  
  const price = yearlyBilling ? getYearlyPrice() : getMonthlyPrice() * 12;
  
  return (
    <div className="space-y-4 py-2 mb-4">
      <div className="flex justify-between">
        <div className="text-sm font-medium">
          {isPtBR ? 'Plano' : 'Plan'}
        </div>
        <div className="font-medium">{plan.name}</div>
      </div>
      
      <div className="flex justify-between">
        <div className="text-sm font-medium">
          {isPtBR ? 'Periodicidade' : 'Billing cycle'}
        </div>
        <div>
          {yearlyBilling ? 
            (isPtBR ? 'Anual' : 'Yearly') : 
            (isPtBR ? 'Mensal' : 'Monthly')}
        </div>
      </div>
      
      {plan.associatedProducts && plan.associatedProducts.length > 0 && (
        <div>
          <div className="text-sm font-medium mb-2">
            {isPtBR ? 'Produtos incluídos' : 'Included products'}
          </div>
          <div className="flex flex-wrap gap-2">
            {plan.associatedProducts.map(product => (
              <Badge key={product} variant="outline" className="flex items-center gap-1">
                <Package className="h-3 w-3" />
                {getProductName(product)}
              </Badge>
            ))}
          </div>
        </div>
      )}
      
      <Separator />
      
      <div className="flex justify-between">
        <div className="text-sm font-medium">
          {isPtBR ? 'Subtotal' : 'Subtotal'}
        </div>
        <div className="font-medium">
          {formatPrice(price)}
        </div>
      </div>
      
      <div className="flex justify-between text-lg font-bold">
        <div>
          {isPtBR ? 'Total' : 'Total'}
        </div>
        <div>
          {formatPrice(price)}
        </div>
      </div>
    </div>
  );
};

export default PaymentSummary;
