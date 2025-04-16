
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Goal } from './types';

// Schema para validação do formulário
const formSchema = z.object({
  name: z.string().min(3, { message: 'O nome deve ter pelo menos 3 caracteres' }),
  period: z.string().min(1, { message: 'O período é obrigatório' }),
  target: z.coerce.number().min(1, { message: 'A meta deve ser maior que zero' }),
  course: z.string().optional(),
  campus: z.string().optional(),
  category: z.enum(['general', 'course', 'campus']),
});

type FormValues = z.infer<typeof formSchema>;

interface NewGoalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onGoalCreated: (goal: Goal) => void;
  category: string;
}

const NewGoalDialog: React.FC<NewGoalDialogProps> = ({ 
  open, 
  onOpenChange, 
  onGoalCreated, 
  category = 'general'
}) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Inicializa o formulário com valores padrão
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      period: '2025.1',
      target: 100,
      course: '',
      campus: '',
      category: category as 'general' | 'course' | 'campus',
    },
  });

  // Atualiza o valor da categoria quando o componente recebe novas props
  React.useEffect(() => {
    form.setValue('category', category as 'general' | 'course' | 'campus');
    
    // Reset campos específicos com base na categoria
    if (category === 'course') {
      form.setValue('campus', '');
    } else if (category === 'campus') {
      form.setValue('course', '');
    } else {
      form.setValue('course', '');
      form.setValue('campus', '');
    }
  }, [category, form]);

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Simulando chamada de API com timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Criar objeto da meta
      const newGoal: Goal = {
        id: `goal-${Date.now()}`, // ID temporário
        name: data.name,
        period: data.period,
        target: data.target,
        current: 0, // Iniciar com zero progressos
        status: 'active',
        category: data.category,
        ...(data.course && { course: data.course }),
        ...(data.campus && { campus: data.campus }),
      };
      
      // Chamar a função para adicionar a meta
      onGoalCreated(newGoal);
      
      // Fechar o diálogo e mostrar toast de sucesso
      onOpenChange(false);
      toast({
        title: "Meta criada com sucesso",
        description: `A meta "${data.name}" foi adicionada.`,
        duration: 3000,
      });
      
      // Reset do formulário
      form.reset();
    } catch (error) {
      toast({
        title: "Erro ao criar meta",
        description: "Ocorreu um erro ao salvar a meta. Tente novamente.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Nova Meta de Captação</DialogTitle>
          <DialogDescription>
            Preencha os detalhes para adicionar uma nova meta de captação.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da Meta</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Meta Global 2025.1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="period"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Período</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um período" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="2025.1">2025.1</SelectItem>
                      <SelectItem value="2024.2">2024.2</SelectItem>
                      <SelectItem value="2024.1">2024.1</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {category === 'course' && (
              <FormField
                control={form.control}
                name="course"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Curso</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value || ''}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um curso" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Medicina">Medicina</SelectItem>
                        <SelectItem value="Engenharia Civil">Engenharia Civil</SelectItem>
                        <SelectItem value="Direito">Direito</SelectItem>
                        <SelectItem value="Administração">Administração</SelectItem>
                        <SelectItem value="Psicologia">Psicologia</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            
            {category === 'campus' && (
              <FormField
                control={form.control}
                name="campus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unidade</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value || ''}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma unidade" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Campus Norte">Campus Norte</SelectItem>
                        <SelectItem value="Campus Sul">Campus Sul</SelectItem>
                        <SelectItem value="Campus Leste">Campus Leste</SelectItem>
                        <SelectItem value="Campus Oeste">Campus Oeste</SelectItem>
                        <SelectItem value="Campus Central">Campus Central</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            
            <FormField
              control={form.control}
              name="target"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meta (quantidade)</FormLabel>
                  <FormControl>
                    <Input type="number" min="1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter className="mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Salvando...' : 'Salvar Meta'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default NewGoalDialog;
