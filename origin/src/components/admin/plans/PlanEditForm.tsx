
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { PlanOption } from '@/utils/billing/planOptions';
import { useTheme } from '@/context/ThemeContext';
import { Textarea } from '@/components/ui/textarea';

const planSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  price: z.string().min(2, "Preço inválido"),
  description: z.string().min(2, "Descrição deve ter pelo menos 2 caracteres"),
  features: z.array(z.string()).optional(),
});

type FormValues = z.infer<typeof planSchema>;

interface PlanEditFormProps {
  editingPlan: PlanOption;
  onSubmit: (values: FormValues) => void;
  onCancel: () => void;
}

const PlanEditForm: React.FC<PlanEditFormProps> = ({ 
  editingPlan, 
  onSubmit, 
  onCancel 
}) => {
  const { language } = useTheme();
  const isPtBR = language === 'pt-BR';
  
  const form = useForm<FormValues>({
    resolver: zodResolver(planSchema),
    defaultValues: {
      name: editingPlan.name,
      price: editingPlan.price,
      description: editingPlan.description,
      features: editingPlan.features || [],
    },
  });
  
  // Handle features as a comma-separated string
  const featuresString = editingPlan.features?.join('\n') || '';
  const [featuresInput, setFeaturesInput] = React.useState(featuresString);
  
  const handleFeaturesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFeaturesInput(e.target.value);
    // Convert text to array of features (splitting by newline)
    const featuresArray = e.target.value
      .split('\n')
      .map(item => item.trim())
      .filter(item => item.length > 0);
    form.setValue('features', featuresArray);
  };
  
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>
          {isPtBR 
            ? `Editando Plano: ${editingPlan.name}`
            : `Editing Plan: ${editingPlan.name}`}
        </CardTitle>
        <CardDescription>
          {isPtBR 
            ? "Modifique os detalhes do plano conforme necessário"
            : "Modify plan details as needed"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {isPtBR ? "Nome do Plano" : "Plan Name"}
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {isPtBR ? "Preço" : "Price"}
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    {isPtBR 
                      ? "Formato de exemplo: R$ 2.990,00/ano ou $2,990.00/year"
                      : "Example format: R$ 2.990,00/ano or $2,990.00/year"}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {isPtBR ? "Descrição" : "Description"}
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormItem>
              <FormLabel>
                {isPtBR ? "Recursos (um por linha)" : "Features (one per line)"}
              </FormLabel>
              <FormControl>
                <Textarea 
                  value={featuresInput}
                  onChange={handleFeaturesChange}
                  placeholder={isPtBR 
                    ? "Digite os recursos, um por linha" 
                    : "Enter features, one per line"}
                  rows={5}
                />
              </FormControl>
              <FormDescription>
                {isPtBR 
                  ? "Liste cada recurso em uma linha separada"
                  : "List each feature on a separate line"}
              </FormDescription>
            </FormItem>
            
            <div className="flex justify-end space-x-2 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onCancel}
              >
                {isPtBR ? "Cancelar" : "Cancel"}
              </Button>
              <Button type="submit">
                {isPtBR ? "Salvar Alterações" : "Save Changes"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default PlanEditForm;
