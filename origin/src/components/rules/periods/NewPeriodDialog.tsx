
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Schema para validação do formulário
const academicPeriodSchema = z.object({
  name: z.string().min(2, { message: 'O nome deve ter pelo menos 2 caracteres' }),
  startDate: z.string().min(1, { message: 'A data de início é obrigatória' }),
  endDate: z.string().min(1, { message: 'A data de término é obrigatória' }),
  recruitmentStartDate: z.string().min(1, { message: 'A data de início da captação é obrigatória' }),
  recruitmentEndDate: z.string().min(1, { message: 'A data de término da captação é obrigatória' }),
  status: z.enum(['active', 'inProgress', 'completed']),
  type: z.literal('academic'),
});

const milestoneSchema = z.object({
  name: z.string().min(2, { message: 'O nome deve ter pelo menos 2 caracteres' }),
  date: z.string().min(1, { message: 'A data é obrigatória' }),
  period: z.string().min(1, { message: 'O período é obrigatório' }),
  description: z.string().optional(),
  status: z.enum(['planned', 'completed', 'delayed']),
  type: z.literal('milestone'),
});

const analysisSchema = z.object({
  name: z.string().min(2, { message: 'O nome deve ter pelo menos 2 caracteres' }),
  startDate: z.string().min(1, { message: 'A data de início é obrigatória' }),
  endDate: z.string().min(1, { message: 'A data de término é obrigatória' }),
  description: z.string().optional(),
  status: z.enum(['inProgress', 'completed', 'planned']),
  type: z.literal('analysis'),
});

type AcademicPeriodFormValues = z.infer<typeof academicPeriodSchema>;
type MilestoneFormValues = z.infer<typeof milestoneSchema>;
type AnalysisFormValues = z.infer<typeof analysisSchema>;

interface NewPeriodDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPeriodCreated: (period: any) => void;
  periodType?: string;
}

const NewPeriodDialog: React.FC<NewPeriodDialogProps> = ({ 
  open, 
  onOpenChange, 
  onPeriodCreated,
  periodType = 'academic'
}) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState(periodType);

  // Inicializa os formulários com valores padrão
  const academicForm = useForm<AcademicPeriodFormValues>({
    resolver: zodResolver(academicPeriodSchema),
    defaultValues: {
      name: '',
      startDate: '',
      endDate: '',
      recruitmentStartDate: '',
      recruitmentEndDate: '',
      status: 'active',
      type: 'academic',
    },
  });

  const milestoneForm = useForm<MilestoneFormValues>({
    resolver: zodResolver(milestoneSchema),
    defaultValues: {
      name: '',
      date: '',
      period: '2025.1',
      description: '',
      status: 'planned',
      type: 'milestone',
    },
  });

  const analysisForm = useForm<AnalysisFormValues>({
    resolver: zodResolver(analysisSchema),
    defaultValues: {
      name: '',
      startDate: '',
      endDate: '',
      description: '',
      status: 'inProgress',
      type: 'analysis',
    },
  });

  React.useEffect(() => {
    setActiveTab(periodType);
  }, [periodType]);

  const onSubmitAcademic = async (data: AcademicPeriodFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Simulando chamada de API com timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Criar objeto do período acadêmico
      const newPeriod = {
        id: `period-${Date.now()}`, // ID temporário
        ...data,
      };
      
      // Chamar a função para adicionar o período
      onPeriodCreated(newPeriod);
      
      // Fechar o diálogo e mostrar toast de sucesso
      onOpenChange(false);
      toast({
        title: "Período criado com sucesso",
        description: `O período "${data.name}" foi adicionado.`,
        duration: 3000,
      });
      
      // Reset do formulário
      academicForm.reset();
    } catch (error) {
      toast({
        title: "Erro ao criar período",
        description: "Ocorreu um erro ao salvar o período. Tente novamente.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmitMilestone = async (data: MilestoneFormValues) => {
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newMilestone = {
        id: `milestone-${Date.now()}`,
        ...data,
      };
      
      onPeriodCreated(newMilestone);
      onOpenChange(false);
      toast({
        title: "Marco criado com sucesso",
        description: `O marco "${data.name}" foi adicionado.`,
        duration: 3000,
      });
      
      milestoneForm.reset();
    } catch (error) {
      toast({
        title: "Erro ao criar marco",
        description: "Ocorreu um erro ao salvar o marco. Tente novamente.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmitAnalysis = async (data: AnalysisFormValues) => {
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newAnalysis = {
        id: `analysis-${Date.now()}`,
        ...data,
      };
      
      onPeriodCreated(newAnalysis);
      onOpenChange(false);
      toast({
        title: "Período de análise criado com sucesso",
        description: `O período de análise "${data.name}" foi adicionado.`,
        duration: 3000,
      });
      
      analysisForm.reset();
    } catch (error) {
      toast({
        title: "Erro ao criar período de análise",
        description: "Ocorreu um erro ao salvar o período de análise. Tente novamente.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Novo Período</DialogTitle>
          <DialogDescription>
            Preencha os detalhes para adicionar um novo período.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="academic">Acadêmico</TabsTrigger>
            <TabsTrigger value="milestone">Marco</TabsTrigger>
            <TabsTrigger value="analysis">Análise</TabsTrigger>
          </TabsList>
          
          <TabsContent value="academic">
            <Form {...academicForm}>
              <form onSubmit={academicForm.handleSubmit(onSubmitAcademic)} className="space-y-4 py-2">
                <FormField
                  control={academicForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do Período</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: 2025.1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={academicForm.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Data de Início</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={academicForm.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Data de Término</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={academicForm.control}
                    name="recruitmentStartDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Início da Captação</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={academicForm.control}
                    name="recruitmentEndDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fim da Captação</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={academicForm.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="active">Ativo</SelectItem>
                          <SelectItem value="inProgress">Em andamento</SelectItem>
                          <SelectItem value="completed">Concluído</SelectItem>
                        </SelectContent>
                      </Select>
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
                    {isSubmitting ? 'Salvando...' : 'Salvar Período'}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </TabsContent>
          
          <TabsContent value="milestone">
            <Form {...milestoneForm}>
              <form onSubmit={milestoneForm.handleSubmit(onSubmitMilestone)} className="space-y-4 py-2">
                <FormField
                  control={milestoneForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do Marco</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Vestibular 2025.1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={milestoneForm.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={milestoneForm.control}
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
                
                <FormField
                  control={milestoneForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Prova principal do vestibular" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={milestoneForm.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="planned">Planejado</SelectItem>
                          <SelectItem value="completed">Concluído</SelectItem>
                          <SelectItem value="delayed">Atrasado</SelectItem>
                        </SelectContent>
                      </Select>
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
                    {isSubmitting ? 'Salvando...' : 'Salvar Marco'}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </TabsContent>
          
          <TabsContent value="analysis">
            <Form {...analysisForm}>
              <form onSubmit={analysisForm.handleSubmit(onSubmitAnalysis)} className="space-y-4 py-2">
                <FormField
                  control={analysisForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do Período de Análise</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Análise de Captação 2025.1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={analysisForm.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Data de Início</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={analysisForm.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Data de Término</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={analysisForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Análise de captação para o período 2025.1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={analysisForm.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="planned">Planejado</SelectItem>
                          <SelectItem value="inProgress">Em andamento</SelectItem>
                          <SelectItem value="completed">Concluído</SelectItem>
                        </SelectContent>
                      </Select>
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
                    {isSubmitting ? 'Salvando...' : 'Salvar Período de Análise'}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default NewPeriodDialog;
