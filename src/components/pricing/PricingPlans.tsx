
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Check } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import PaymentDialog from './PaymentDialog';
import { usePlanOptions } from '@/utils/billing/planOptions';

type PlanFeature = {
  included: boolean;
  text: string;
};

type Plan = {
  id: string;
  name: string;
  description: string;
  priceMonthly: number;
  priceYearly: number;
  features: PlanFeature[];
  highlightPlan?: boolean;
};

const PricingPlans: React.FC = () => {
  const { language } = useTheme();
  const { toast } = useToast();
  const [yearlyBilling, setYearlyBilling] = useState(false);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  
  // Get plan options from the utility hook
  const planOptions = usePlanOptions();

  const isPtBR = language === 'pt-BR';
  
  // Convert price strings to numbers for calculations
  const getPriceValue = (priceString: string): number => {
    const numericValue = priceString
      .replace(/[^\d.,]/g, '') // Remove all non-numeric characters except . and ,
      .replace(',', '.'); // Replace comma with dot for parsing
    
    return parseFloat(numericValue);
  };
  
  const plans: Plan[] = [
    {
      id: 'basic',
      name: planOptions.find(p => p.id === 'basic')?.name || (isPtBR ? 'Básico' : 'Basic'),
      description: isPtBR 
        ? 'Para pequenas escolas com necessidades básicas de monitoramento'
        : 'For small schools with basic monitoring needs',
      priceMonthly: Math.round(getPriceValue(planOptions.find(p => p.id === 'basic')?.price || '') / 10),
      priceYearly: getPriceValue(planOptions.find(p => p.id === 'basic')?.price || ''),
      features: [
        { included: true, text: planOptions.find(p => p.id === 'basic')?.description || (isPtBR ? 'Até 200 alunos' : 'Up to 200 students') },
        { included: true, text: isPtBR ? 'Alertas básicos' : 'Basic alerts' },
        { included: true, text: isPtBR ? 'Acesso ao modelo preditivo' : 'Predictive model access' },
        { included: true, text: isPtBR ? 'Suporte por email' : 'Email support' },
        { included: false, text: isPtBR ? 'Análise avançada de dados' : 'Advanced data analysis' },
        { included: false, text: isPtBR ? 'Integrações personalizadas' : 'Custom integrations' },
      ],
    },
    {
      id: 'premium',
      name: planOptions.find(p => p.id === 'premium')?.name || 'Premium',
      description: isPtBR 
        ? 'Para escolas médias com necessidades avançadas de monitoramento'
        : 'For medium-sized schools with advanced monitoring needs',
      priceMonthly: Math.round(getPriceValue(planOptions.find(p => p.id === 'premium')?.price || '') / 10),
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
      priceMonthly: Math.round(getPriceValue(planOptions.find(p => p.id === 'enterprise')?.price || '') / 10),
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
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center gap-2">
          <Label htmlFor="billing-toggle" className={cn("text-sm", !yearlyBilling && "font-medium")}>
            {isPtBR ? 'Mensal' : 'Monthly'}
          </Label>
          <Switch
            id="billing-toggle"
            checked={yearlyBilling}
            onCheckedChange={onToggleBilling}
          />
          <Label htmlFor="billing-toggle" className={cn("text-sm", yearlyBilling && "font-medium")}>
            {isPtBR ? 'Anual (2 meses grátis)' : 'Yearly (2 months free)'}
          </Label>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <Card 
            key={plan.id} 
            className={cn(
              "flex flex-col h-full", 
              plan.highlightPlan && "border-primary shadow-lg"
            )}
          >
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription className="text-md">{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="text-3xl font-bold mb-2">
                {isPtBR ? 'R$' : '$'} {yearlyBilling ? (plan.priceYearly / 12).toFixed(0) : plan.priceMonthly}{' '}
                <span className="text-sm font-normal text-muted-foreground">
                  {isPtBR ? '/mês' : '/month'}
                </span>
              </div>

              {yearlyBilling && (
                <div className="text-sm text-muted-foreground mb-6">
                  {isPtBR 
                    ? `R$ ${plan.priceYearly} cobrados anualmente` 
                    : `$${plan.priceYearly} billed yearly`}
                </div>
              )}

              <ul className="space-y-2 mt-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    {feature.included ? (
                      <Check className="h-5 w-5 text-green-500 shrink-0" />
                    ) : (
                      <Check className="h-5 w-5 text-muted-foreground opacity-25 shrink-0" />
                    )}
                    <span className={feature.included ? "" : "text-muted-foreground"}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                onClick={() => handlePlanSelect(plan)}
                variant={plan.highlightPlan ? "default" : "outline"}
              >
                {isPtBR ? 'Selecionar Plano' : 'Select Plan'}
              </Button>
            </CardFooter>
          </Card>
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
