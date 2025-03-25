
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CardContent, Card } from '@/components/ui/card';
import { CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';

interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
}

interface PlanSelectionProps {
  plans: Plan[];
  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

const PlanSelection = ({ plans, isLoading = false, error, onRetry }: PlanSelectionProps) => {
  const { control, watch } = useFormContext();
  const selectedPlanId = watch('planId');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2
    }).format(value);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Escolha seu plano</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="border">
              <CardContent className="p-4">
                <Skeleton className="h-6 w-32 mb-2" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-24 mb-3" />
                <Skeleton className="h-8 w-28" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Escolha seu plano</h3>
        <Alert variant="destructive" className="border-red-200 bg-red-50 dark:bg-red-900/20">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <span>{error}</span>
            {onRetry && (
              <Button variant="outline" size="sm" onClick={onRetry} className="mt-2 sm:mt-0">
                Tentar novamente
              </Button>
            )}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (plans.length === 0) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Escolha seu plano</h3>
        <div className="py-8 flex flex-col items-center justify-center text-muted-foreground">
          <AlertTriangle className="h-8 w-8 mb-2" />
          <p>Nenhum plano disponível no momento.</p>
          {onRetry && (
            <Button variant="outline" size="sm" onClick={onRetry} className="mt-4">
              Tentar novamente
            </Button>
          )}
        </div>
      </div>
    );
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
                  <div key={plan.id} className="relative">
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
                    <Card 
                      className={cn(
                        "cursor-pointer transition-all border-2",
                        selectedPlanId === plan.id 
                          ? "border-primary ring-2 ring-primary/20" 
                          : "hover:border-muted-foreground/20"
                      )}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-lg">{plan.name}</h4>
                            <p className="text-sm text-muted-foreground">{plan.description}</p>
                            <div className="mt-2 font-bold text-xl">
                              {formatCurrency(plan.price)}<span className="font-normal text-sm">/ano</span>
                            </div>
                          </div>
                          {selectedPlanId === plan.id && (
                            <CheckCircle2 className="text-primary h-5 w-5" />
                          )}
                        </div>
                      </CardContent>
                    </Card>
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
