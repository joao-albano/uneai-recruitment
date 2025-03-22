
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ClipboardCheck, Send, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';
import { useData } from '@/context/DataContext';

// Define the form schema
const formSchema = z.object({
  studentId: z.string().min(1, { message: 'Selecione um aluno' }),
  studentName: z.string().min(1, { message: 'Nome do aluno é obrigatório' }),
  parentName: z.string().min(1, { message: 'Nome do responsável é obrigatório' }),
  parentContact: z.string().min(1, { message: 'Contato do responsável é obrigatório' }),
  movedRecently: z.boolean().default(false),
  bullyingConcerns: z.boolean().default(false),
  socialIntegration: z.number().min(1).max(5),
  transportationIssues: z.enum(['none', 'sometimes', 'frequent']),
  additionalNotes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const SurveyForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [sendingWhatsApp, setSendingWhatsApp] = useState(false);
  const { toast } = useToast();
  const { students, addSurvey, addAlert, sendWhatsAppSurvey } = useData();
  
  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentId: '',
      studentName: '',
      parentName: '',
      parentContact: '',
      movedRecently: false,
      bullyingConcerns: false,
      socialIntegration: 3,
      transportationIssues: 'none',
      additionalNotes: '',
    },
  });
  
  // Handle student selection
  const handleStudentSelect = (studentId: string) => {
    if (studentId) {
      const student = students.find(s => s.id === studentId);
      if (student) {
        form.setValue('studentId', student.id);
        form.setValue('studentName', student.name);
        
        // Pre-fill parent information if available
        if (student.parentName) {
          form.setValue('parentName', student.parentName);
        }
        if (student.parentContact) {
          form.setValue('parentContact', student.parentContact);
        }
      }
    } else {
      form.setValue('studentId', '');
      form.setValue('studentName', '');
      form.setValue('parentName', '');
      form.setValue('parentContact', '');
    }
  };
  
  const onSubmit = (values: FormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      // Add the survey to context
      addSurvey({
        studentId: values.studentId,
        movedRecently: values.movedRecently,
        bullyingConcerns: values.bullyingConcerns,
        socialIntegration: values.socialIntegration,
        additionalNotes: values.additionalNotes,
      });
      
      // Create an alert for the survey submission
      const student = students.find(s => s.id === values.studentId);
      if (student) {
        addAlert({
          id: `survey-${Date.now()}`,
          studentId: values.studentId,
          studentName: values.studentName,
          studentClass: student.class,
          type: 'survey-requested',
          message: `Pesquisa diagnóstica realizada para ${values.studentName} pela família.`,
          createdAt: new Date(),
          read: false,
          actionTaken: false,
        });
      }
      
      // Show success toast
      toast({
        title: 'Pesquisa enviada com sucesso',
        description: 'Obrigado por fornecer essas informações importantes.',
      });
      
      setIsSubmitting(false);
      setFormSubmitted(true);
    }, 1500);
  };

  const handleSendWhatsApp = () => {
    const studentId = form.getValues('studentId');
    if (!studentId) {
      toast({
        title: 'Selecione um aluno',
        description: 'É necessário selecionar um aluno para enviar a pesquisa.',
        variant: 'destructive',
      });
      return;
    }

    setSendingWhatsApp(true);
    
    // Call the function to send WhatsApp survey
    sendWhatsAppSurvey(studentId);
    
    // Show success toast
    toast({
      title: 'Pesquisa enviada via WhatsApp',
      description: 'A pesquisa foi enviada para o número de contato do responsável.',
    });
    
    setTimeout(() => {
      setSendingWhatsApp(false);
    }, 2000);
  };
  
  const startNewSurvey = () => {
    form.reset();
    setFormSubmitted(false);
  };
  
  return (
    <div className="w-full max-w-3xl mx-auto animate-scale-in">
      {formSubmitted ? (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-center my-6">
              <div className="rounded-full bg-green-100 p-3">
                <ClipboardCheck className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <CardTitle className="text-center text-2xl">Pesquisa Enviada</CardTitle>
            <CardDescription className="text-center">
              Agradecemos por fornecer essas informações importantes que nos ajudarão a apoiar melhor o aluno.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground">
              Nossa equipe irá analisar as respostas e entrar em contato se necessário.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={startNewSurvey}>
              Iniciar nova pesquisa
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Pesquisa Diagnóstica Familiar</CardTitle>
            <CardDescription>
              Ajude-nos a entender melhor as necessidades do aluno para prevenir a evasão escolar
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-end">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={handleSendWhatsApp}
                      disabled={sendingWhatsApp || !form.getValues('studentId')}
                    >
                      {sendingWhatsApp ? (
                        <>
                          <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-foreground border-t-transparent" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Enviar via WhatsApp
                        </>
                      )}
                    </Button>
                  </div>
                
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="studentId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Selecione o aluno</FormLabel>
                          <Select
                            onValueChange={(value) => handleStudentSelect(value)}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione um aluno..." />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {students.map((student) => (
                                <SelectItem key={student.id} value={student.id}>
                                  {student.name} - {student.class}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="studentName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome do aluno</FormLabel>
                          <FormControl>
                            <Input {...field} readOnly />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="parentName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome do responsável</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Nome completo" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="parentContact"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contato</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Telefone ou email" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Fatores de risco</h3>
                    
                    <FormField
                      control={form.control}
                      name="movedRecently"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Mudança recente de endereço</FormLabel>
                            <FormDescription>
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
                        <FormItem className="flex items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Preocupações com bullying</FormLabel>
                            <FormDescription>
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
                        <FormItem className="space-y-4 rounded-lg border p-4">
                          <div>
                            <FormLabel className="text-base">Integração social</FormLabel>
                            <FormDescription>
                              Como você avalia a integração social do aluno na escola?
                            </FormDescription>
                          </div>
                          <div className="pt-2">
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
                          <div className="flex justify-between text-xs text-muted-foreground">
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
                        <FormItem className="space-y-3 rounded-lg border p-4">
                          <FormLabel className="text-base">Problemas de transporte</FormLabel>
                          <FormDescription>
                            Com que frequência o aluno enfrenta dificuldades para chegar à escola?
                          </FormDescription>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-1"
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
                        <FormItem>
                          <FormLabel>Observações adicionais</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Compartilhe outras informações relevantes para a escola..."
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Quaisquer detalhes adicionais que possam nos ajudar a apoiar melhor o aluno.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-foreground border-t-transparent" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Enviar pesquisa
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SurveyForm;
