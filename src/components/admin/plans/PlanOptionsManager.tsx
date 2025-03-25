
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { usePlanOptionsStore, PlanOption } from '@/utils/billing/planOptions';
import { useTheme } from '@/context/ThemeContext';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Pencil, RefreshCw, Package, CheckCircle2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const planSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  price: z.string().min(2, "Preço inválido"),
  description: z.string().min(2, "Descrição deve ter pelo menos 2 caracteres"),
  relatedProduct: z.string().optional(),
  features: z.array(z.string()).optional(),
});

const PlanOptionsManager: React.FC = () => {
  const { plans, setPlan, resetToDefaults } = usePlanOptionsStore();
  const { language } = useTheme();
  const { toast } = useToast();
  const [editingPlan, setEditingPlan] = useState<PlanOption | null>(null);
  
  const isPtBR = language === 'pt-BR';
  
  const form = useForm<z.infer<typeof planSchema>>({
    resolver: zodResolver(planSchema),
    defaultValues: {
      name: '',
      price: '',
      description: '',
      relatedProduct: '',
      features: [],
    },
  });
  
  const handleEditClick = (plan: PlanOption) => {
    setEditingPlan(plan);
    form.reset({
      name: plan.name,
      price: plan.price,
      description: plan.description,
      relatedProduct: plan.relatedProduct || '',
      features: plan.features || [],
    });
  };
  
  const onSubmit = (values: z.infer<typeof planSchema>) => {
    if (!editingPlan) return;
    
    setPlan(editingPlan.id, {
      name: values.name,
      price: values.price,
      description: values.description,
      relatedProduct: values.relatedProduct,
      features: values.features,
    });
    
    toast({
      title: isPtBR ? "Plano atualizado" : "Plan updated",
      description: isPtBR 
        ? `O plano ${values.name} foi atualizado com sucesso.` 
        : `The ${values.name} plan was successfully updated.`,
    });
    
    setEditingPlan(null);
  };
  
  const handleCancelEdit = () => {
    setEditingPlan(null);
    form.reset();
  };
  
  const handleResetToDefaults = () => {
    resetToDefaults();
    toast({
      title: isPtBR ? "Planos redefinidos" : "Plans reset",
      description: isPtBR 
        ? "Todos os planos foram redefinidos para os valores padrão." 
        : "All plans have been reset to default values.",
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">
          {isPtBR ? "Gerenciar Planos" : "Manage Plans"}
        </h2>
        
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              {isPtBR ? "Redefinir Padrões" : "Reset to Defaults"}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {isPtBR ? "Redefinir todos os planos?" : "Reset all plans?"}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {isPtBR 
                  ? "Esta ação restaurará todos os planos para suas configurações originais. Você não poderá desfazer esta ação."
                  : "This action will restore all plans to their original settings. You cannot undo this action."}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>
                {isPtBR ? "Cancelar" : "Cancel"}
              </AlertDialogCancel>
              <AlertDialogAction onClick={handleResetToDefaults}>
                {isPtBR ? "Redefinir" : "Reset"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>{plan.name}</CardTitle>
                {plan.id === 'premium' && (
                  <Badge variant="secondary">
                    {isPtBR ? "Mais popular" : "Most popular"}
                  </Badge>
                )}
              </div>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="text-2xl font-bold">{plan.price}</div>
              
              {plan.relatedProduct && (
                <div className="mt-2 text-sm text-muted-foreground flex items-center">
                  <Package className="h-4 w-4 mr-1" />
                  <span>{plan.relatedProduct}</span>
                </div>
              )}
              
              {plan.features && plan.features.length > 0 && (
                <div className="mt-3 space-y-1">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-sm">
                      <CheckCircle2 className="text-green-500 h-4 w-4 mr-1" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full gap-2"
                onClick={() => handleEditClick(plan)}
              >
                <Pencil className="h-4 w-4" />
                {isPtBR ? "Editar Plano" : "Edit Plan"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {editingPlan && (
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
                    onClick={handleCancelEdit}
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
      )}
    </div>
  );
};

export default PlanOptionsManager;
