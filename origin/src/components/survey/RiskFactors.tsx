
import React from 'react';
import { FormField, FormItem, FormLabel, FormDescription, FormControl, FormMessage } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from './SurveyFormSchema';
import { Separator } from '@/components/ui/separator';

interface RiskFactorsProps {
  form: UseFormReturn<FormValues>;
}

const RiskFactors: React.FC<RiskFactorsProps> = ({ form }) => {
  return (
    <div className="space-y-6">
      <Separator className="my-6" />
      
      <h3 className="text-lg font-semibold mb-4">Fatores de risco</h3>
      
      <FormField
        control={form.control}
        name="movedRecently"
        render={({ field }) => (
          <FormItem className="flex items-center justify-between rounded-lg border p-5">
            <div className="space-y-1">
              <FormLabel className="text-base font-medium">Mudança recente de endereço</FormLabel>
              <FormDescription className="text-sm">
                A família mudou de residência nos últimos 6 meses?
              </FormDescription>
            </div>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="bullyingConcerns"
        render={({ field }) => (
          <FormItem className="flex items-center justify-between rounded-lg border p-5">
            <div className="space-y-1">
              <FormLabel className="text-base font-medium">Preocupações com bullying</FormLabel>
              <FormDescription className="text-sm">
                O aluno relatou episódios de bullying ou tratamento inadequado?
              </FormDescription>
            </div>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="socialIntegration"
        render={({ field }) => (
          <FormItem className="space-y-4 rounded-lg border p-5">
            <div>
              <FormLabel className="text-base font-medium">Integração social</FormLabel>
              <FormDescription className="text-sm mt-1">
                Como você avalia a integração social do aluno na escola?
              </FormDescription>
            </div>
            <div className="pt-3">
              <FormControl>
                <Slider
                  value={[field.value]}
                  min={1}
                  max={5}
                  step={1}
                  onValueChange={(vals) => field.onChange(vals[0])}
                />
              </FormControl>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground pt-1">
              <span>Pouca interação</span>
              <span>Interação normal</span>
              <span>Muito sociável</span>
            </div>
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="transportationIssues"
        render={({ field }) => (
          <FormItem className="space-y-3 rounded-lg border p-5">
            <FormLabel className="text-base font-medium">Problemas de transporte</FormLabel>
            <FormDescription className="text-sm">
              Com que frequência o aluno enfrenta dificuldades para chegar à escola?
            </FormDescription>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-3 mt-2"
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="none" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    Sem problemas de transporte
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="sometimes" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    Dificuldades ocasionais
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="frequent" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    Dificuldades frequentes
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="additionalNotes"
        render={({ field }) => (
          <FormItem className="pt-2">
            <FormLabel className="text-base font-medium mb-2 block">Observações adicionais</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Compartilhe outras informações relevantes para a escola..."
                className="min-h-[120px] p-3 text-base"
                {...field}
              />
            </FormControl>
            <FormDescription className="text-sm mt-2">
              Quaisquer detalhes adicionais que possam nos ajudar a apoiar melhor o aluno.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default RiskFactors;
