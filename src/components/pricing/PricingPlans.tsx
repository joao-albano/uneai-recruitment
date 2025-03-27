
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
  
  const calculateMonthlyPrice = (yearlyPrice: number): number => {
    return Math.round(yearlyPrice / 12);
  };
  
  const getPlansFromOptions = (): Plan[] => {
    return planOptions.map(option => {
      return {
        id: option.id,
        name: option.name,
        description: option.description,
        priceMonthly: calculateMonthlyPrice(getPriceValue(option.price)),
        priceYearly: getPriceValue(option.price),
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
