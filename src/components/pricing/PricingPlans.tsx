import React, { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
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
  const [dbPlans, setDbPlans] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const planOptions = usePlanOptions();
  const isPtBR = language === 'pt-BR';
  
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const { data, error } = await supabase
          .from('plans')
          .select('*');
          
        if (error) {
          console.error('Error fetching plans:', error);
          toast({
            title: isPtBR ? 'Erro ao carregar planos' : 'Error loading plans',
            description: isPtBR ? 'Tente novamente mais tarde' : 'Please try again later',
            variant: 'destructive',
          });
          return;
        }
        
        if (data) {
          setDbPlans(data);
        }
      } catch (err) {
        console.error('Error in plan fetch:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPlans();
  }, [isPtBR, toast]);
  
  const calculateMonthlyPrice = (yearlyPrice: number): number => {
    return Math.round(yearlyPrice / 12);
  };
  
  const getPlansFromDb = (): Plan[] => {
    if (dbPlans.length === 0) {
      return getDefaultPlans();
    }
    
    return dbPlans.map(plan => {
      const price = plan.price || 0;
      const features = plan.features ? 
        (typeof plan.features === 'string' ? JSON.parse(plan.features) : plan.features) : 
        [];
      
      return {
        id: plan.id,
        name: plan.name,
        description: plan.description || '',
        priceMonthly: calculateMonthlyPrice(price),
        priceYearly: price,
        features: [
          ...features.map((feature: string) => ({ included: true, text: feature })),
        ],
        highlightPlan: plan.name.toLowerCase().includes('premium'),
        associatedProducts: plan.associated_products as ProductType[] || []
      };
    });
  };
  
  const getDefaultPlans = (): Plan[] => {
    return [
      {
        id: 'basic',
        name: planOptions.find(p => p.id === 'basic')?.name || (isPtBR ? 'Básico' : 'Basic'),
        description: isPtBR 
          ? 'Para pequenas escolas com necessidades básicas de monitoramento'
          : 'For small schools with basic monitoring needs',
        priceMonthly: calculateMonthlyPrice(getPriceValue(planOptions.find(p => p.id === 'basic')?.price || '')),
        priceYearly: getPriceValue(planOptions.find(p => p.id === 'basic')?.price || ''),
        features: [
          { included: true, text: planOptions.find(p => p.id === 'basic')?.description || (isPtBR ? 'Até 200 alunos' : 'Up to 200 students') },
          { included: true, text: isPtBR ? 'Alertas básicos' : 'Basic alerts' },
          { included: true, text: isPtBR ? 'Acesso ao modelo preditivo' : 'Predictive model access' },
          { included: true, text: isPtBR ? 'Suporte por email' : 'Email support' },
          { included: false, text: isPtBR ? 'Análise avançada de dados' : 'Advanced data analysis' },
          { included: false, text: isPtBR ? 'Integrações personalizadas' : 'Custom integrations' },
        ],
        associatedProducts: ['retention']
      },
      {
        id: 'premium',
        name: planOptions.find(p => p.id === 'premium')?.name || 'Premium',
        description: isPtBR 
          ? 'Para escolas médias com necessidades avançadas de monitoramento'
          : 'For medium-sized schools with advanced monitoring needs',
        priceMonthly: calculateMonthlyPrice(getPriceValue(planOptions.find(p => p.id === 'premium')?.price || '')),
        priceYearly: getPriceValue(planOptions.find(p => p.id === 'premium')?.price || ''),
        features: [
          { included: true, text: planOptions.find(p => p.id === 'premium')?.description || (isPtBR ? 'Até 500 alunos' : 'Up to 500 students') },
          { included: true, text: isPtBR ? 'Alertas avançados' : 'Advanced alerts' },
          { included: true, text: isPtBR ? 'Dashboard administrativo' : 'Administrative dashboard' },
          { included: true, text: isPtBR ? 'Suporte prioritário' : 'Priority support' },
          { included: true, text: isPtBR ? 'Análise avançada de dados' : 'Advanced data analysis' },
          { included: false, text: isPtBR ? 'Integrações personalizadas' : 'Custom integrations' },
        ],
        highlightPlan: true,
      },
      {
        id: 'enterprise',
        name: planOptions.find(p => p.id === 'enterprise')?.name || 'Enterprise',
        description: isPtBR 
          ? 'Para redes de ensino completas com necessidades específicas'
          : 'For complete school networks with specific needs',
        priceMonthly: calculateMonthlyPrice(getPriceValue(planOptions.find(p => p.id === 'enterprise')?.price || '')),
        priceYearly: getPriceValue(planOptions.find(p => p.id === 'enterprise')?.price || ''),
        features: [
          { included: true, text: planOptions.find(p => p.id === 'enterprise')?.description || (isPtBR ? 'Alunos ilimitados' : 'Unlimited students') },
          { included: true, text: isPtBR ? 'Sistema completo' : 'Complete system' },
          { included: true, text: isPtBR ? 'Customização do modelo' : 'Model customization' },
          { included: true, text: isPtBR ? 'Suporte 24/7' : 'Support 24/7' },
          { included: true, text: isPtBR ? 'Análise avançada de dados' : 'Advanced data analysis' },
          { included: true, text: isPtBR ? 'Integrações personalizadas' : 'Custom integrations' },
        ],
      },
    ];
  };

  const plans = getPlansFromDb();

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

  if (isLoading) {
    return (
      <div className="py-10 text-center">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto"></div>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-80 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

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
