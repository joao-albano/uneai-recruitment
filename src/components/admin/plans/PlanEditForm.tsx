
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const planSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  price: z.string().min(2, "Preço inválido"),
  description: z.string().min(2, "Descrição deve ter pelo menos 2 caracteres"),
  relatedProduct: z.string().optional(),
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
      relatedProduct: editingPlan.relatedProduct || '',
      features: editingPlan.features || [],
    },
  });
  
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
            
            <FormField
              control={form.control}
              name="relatedProduct"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {isPtBR ? "Produto Relacionado" : "Related Product"}
                  </FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={isPtBR ? "Selecione um produto" : "Select a product"} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="retention">Retenção de Alunos</SelectItem>
                        <SelectItem value="billing">Gestão Financeira</SelectItem>
                        <SelectItem value="recruitment">Recrutamento</SelectItem>
                        <SelectItem value="secretary">Secretaria Digital</SelectItem>
                        <SelectItem value="pedagogical">Gestão Pedagógica</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
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
