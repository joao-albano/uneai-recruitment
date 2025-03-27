
import React, { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useToast } from '@/hooks/use-toast';
import { usePlanOptions } from '@/utils/billing/planOptions';
import { getPriceValue } from '@/utils/billing/priceUtils';
import { ProductType } from '@/context/product/types';
import PaymentDialog from './PaymentDialog';
import BillingToggle from './BillingToggle';
import PlanCard, { PlanCardProps } from './PlanCard';

type Plan = Omit<PlanCardProps, 'yearlyBilling' | 'onSelect'>;

const PricingPlans: React.FC = () => {
  const { language } = useTheme();
  const { toast } = useToast();
  const [yearlyBilling, setYearlyBilling] = useState(true);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  
  const planOptions = usePlanOptions();
  const isPtBR = language === 'pt-BR';
  
  const getPlansFromOptions = (): Plan[] => {
    return planOptions.map(option => {
      // Extract only the numeric value from price strings
      const yearlyPrice = getPriceValue(option.price);
      
      // For the image, monthly prices are shown as R$ 0,00 for basic and premium, 
      // and R$ 1,00 for enterprise
      let monthlyPrice = 0;
      if (option.id === 'enterprise') {
        monthlyPrice = 1;
      }
      
      return {
        id: option.id,
        name: option.name,
        description: option.description,
        priceMonthly: monthlyPrice,
        priceYearly: yearlyPrice,
        features: [
          ...(option.features || []).map(feature => ({ included: true, text: feature })),
          // Add some features as not included for basic and premium plans
          ...(option.id === 'basic' ? [
            { included: false, text: isPtBR ? 'Análise avançada de dados' : 'Advanced data analysis' },
            { included: false, text: isPtBR ? 'Integrações personalizadas' : 'Custom integrations' },
          ] : []),
          ...(option.id === 'premium' ? [
            { included: false, text: isPtBR ? 'Integrações personalizadas' : 'Custom integrations' },
          ] : []),
        ],
        highlightPlan: option.id === 'premium',
        associatedProducts: option.products || []
      };
    });
  };

  const plans = getPlansFromOptions();

  const handlePlanSelect = (plan: Plan) => {
    setSelectedPlan(plan);
    setPaymentDialogOpen(true);
  };

  const onToggleBilling = () => {
    setYearlyBilling(!yearlyBilling);
    
    toast({
      title: isPtBR 
        ? (yearlyBilling ? 'Alterado para cobrança mensal' : 'Alterado para cobrança anual') 
        : (yearlyBilling ? 'Switched to monthly billing' : 'Switched to yearly billing'),
      description: isPtBR 
        ? (yearlyBilling ? 'Preços atualizados para cobrança mensal' : 'Economize 2 meses com a cobrança anual!') 
        : (yearlyBilling ? 'Prices updated to monthly billing' : 'Save 2 months with yearly billing!'),
    });
  };

  return (
    <>
      <BillingToggle 
        yearlyBilling={yearlyBilling}
        onToggleBilling={onToggleBilling}
      />

      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            {...plan}
            yearlyBilling={yearlyBilling}
            onSelect={handlePlanSelect}
          />
        ))}
      </div>

      <PaymentDialog 
        open={paymentDialogOpen} 
        onOpenChange={setPaymentDialogOpen}
        plan={selectedPlan}
        yearlyBilling={yearlyBilling}
      />
    </>
  );
};

export default PricingPlans;
