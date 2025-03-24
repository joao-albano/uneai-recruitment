
import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Separator } from '@/components/ui/separator';

type Plan = {
  id: string;
  name: string;
  priceMonthly: number;
  priceYearly: number;
};

interface PaymentSummaryProps {
  plan: Plan;
  yearlyBilling: boolean;
}

const PaymentSummary: React.FC<PaymentSummaryProps> = ({ plan, yearlyBilling }) => {
  const { language } = useTheme();
  const isPtBR = language === 'pt-BR';
  
  const finalPrice = yearlyBilling ? plan.priceYearly : plan.priceMonthly;
  
  return (
    <>
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">
            {isPtBR ? 'Plano selecionado:' : 'Selected plan:'}
          </span>
          <span className="font-medium">{plan.name}</span>
        </div>
        
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">
            {isPtBR ? 'Período de cobrança:' : 'Billing period:'}
          </span>
          <span className="font-medium">
            {yearlyBilling 
              ? (isPtBR ? 'Anual' : 'Yearly') 
              : (isPtBR ? 'Mensal' : 'Monthly')}
          </span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">
            {isPtBR ? 'Valor total:' : 'Total amount:'}
          </span>
          <span className="font-bold">
            {isPtBR ? `R$ ${finalPrice.toFixed(2)}` : `$${finalPrice.toFixed(2)}`}
          </span>
        </div>
      </div>
      
      <Separator className="my-4" />
    </>
  );
};

export default PaymentSummary;
