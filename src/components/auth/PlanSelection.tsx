
import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { usePlans } from '@/hooks/usePlans';
import PlanCard from './plans/PlanCard';
import PlanSelectionLoading from './plans/PlanSelectionLoading';
import PlanSelectionError from './plans/PlanSelectionError';
import PlanSelectionEmpty from './plans/PlanSelectionEmpty';

const PlanSelection = () => {
  const { control, watch, setValue } = useFormContext();
  const selectedPlanId = watch('planId');
  
  const { plans, isLoading, error, fetchPlans } = usePlans();

  useEffect(() => {
    // Buscar planos ao carregar o componente
    fetchPlans();
    
    // Log para debug
    console.log('PlanSelection montado, buscando planos...');
  }, [fetchPlans]);

  const handlePlanSelect = (planId: string) => {
    console.log('Plano selecionado:', planId);
    setValue('planId', planId);
  };

  const handleRetry = () => {
    console.log('Tentando carregar planos novamente...');
    fetchPlans();
  };

  // Debugar estados
  console.log('Estado atual dos planos:', { planos: plans, carregando: isLoading, erro: error });

  if (isLoading) {
    return <PlanSelectionLoading />;
  }

  if (error) {
    return <PlanSelectionError error={error} onRetry={handleRetry} />;
  }

  if (!plans || plans.length === 0) {
    return <PlanSelectionEmpty onRetry={handleRetry} />;
  }

  return (
    <div>
      <h3 className="text-lg font-medium">Escolha seu plano</h3>
      <p className="text-sm text-muted-foreground mb-3">
        Você terá 14 dias de teste gratuito, escolha o plano que melhor atende suas necessidades
      </p>

      <FormField
        control={control}
        name="planId"
        render={({ field }) => (
          <FormItem className="space-y-4">
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                {plans.map((plan) => (
                  <div key={plan.id}>
                    <RadioGroupItem
                      value={plan.id}
                      id={`plan-${plan.id}`}
                      className="sr-only"
                    />
                    <Label
                      htmlFor={`plan-${plan.id}`}
                      className="sr-only"
                    >
                      {plan.name}
                    </Label>
                    <PlanCard 
                      plan={plan}
                      isSelected={selectedPlanId === plan.id}
                      onClick={handlePlanSelect}
                    />
                  </div>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <p className="text-sm text-muted-foreground mt-2">
        * Após o período de teste, você será convidado a fornecer os dados de pagamento para continuar usando o sistema.
      </p>
    </div>
  );
};

export default PlanSelection;
