
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

// Define o schema de validação
const formSchema = z.object({
  name: z.string().min(2, {
    message: "O nome da meta deve ter pelo menos 2 caracteres.",
  }),
  period: z.string().min(1, {
    message: "O período é obrigatório.",
  }),
  target: z.coerce.number().min(1, {
    message: "A meta deve ser maior que zero.",
  }),
  current: z.coerce.number().min(0, {
    message: "O valor atual não pode ser negativo.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface Goal {
  id: string;
  name: string;
  period: string;
  course?: string;
  campus?: string;
  target: number;
  current: number;
  status: 'active' | 'completed' | 'pending';
  category: 'general' | 'course' | 'campus';
}

interface EditGoalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  goal: Goal | null;
  onSave: (updatedGoal: Goal) => void;
}

const EditGoalDialog: React.FC<EditGoalDialogProps> = ({
  open,
  onOpenChange,
  goal,
  onSave,
}) => {
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: goal?.name || '',
      period: goal?.period || '',
      target: goal?.target || 0,
      current: goal?.current || 0,
    },
  });

  // Atualizar os valores do formulário quando a meta mudar
  React.useEffect(() => {
    if (goal) {
      form.reset({
        name: goal.name,
        period: goal.period,
        target: goal.target,
        current: goal.current,
      });
    }
  }, [goal, form]);

  const onSubmit = (values: FormValues) => {
    if (!goal) return;
    
    const updatedGoal: Goal = {
      ...goal,
      name: values.name,
      period: values.period,
      target: values.target,
      current: values.current,
    };
    
    onSave(updatedGoal);
    onOpenChange(false);
    
    toast({
      title: "Meta atualizada",
      description: `A meta "${values.name}" foi atualizada com sucesso.`,
      duration: 3000,
    });
  };

  if (!goal) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Editar Meta</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da Meta</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome da meta" {...field} />
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
                  <FormControl>
                    <Input placeholder="Ex: 2025.1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="target"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meta</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="current"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Atual</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            {goal.course && (
              <div className="text-sm text-muted-foreground">
                Curso: <span className="font-medium">{goal.course}</span>
              </div>
            )}
            
            {goal.campus && (
              <div className="text-sm text-muted-foreground">
                Unidade: <span className="font-medium">{goal.campus}</span>
              </div>
            )}
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit">Salvar Alterações</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditGoalDialog;
