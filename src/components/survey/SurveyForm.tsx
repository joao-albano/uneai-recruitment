
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { useStudents } from '@/context/students/StudentsContext';
import { useAlerts } from '@/context/alerts/AlertsContext';
import { useSurveys } from '@/context/surveys/SurveysContext';
import { formSchema, FormValues } from './SurveyFormSchema';
import StudentSelect from './StudentSelect';
import ParentInfo from './ParentInfo';
import RiskFactors from './RiskFactors';
import FormCompletion from './FormCompletion';
import WhatsAppButton from './WhatsAppButton';

const SurveyForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [sendingWhatsApp, setSendingWhatsApp] = useState(false);
  const { toast } = useToast();
  const { students } = useStudents();
  const { addSurvey } = useSurveys();
  const { addAlert } = useAlerts();
  
  useEffect(() => {
    console.log('Student count in form:', students.length);
  }, [students]);
  
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
  
  const onSubmit = (values: FormValues) => {
    setIsSubmitting(true);
    
    setTimeout(() => {
      addSurvey({
        studentId: values.studentId,
        movedRecently: values.movedRecently,
        bullyingConcerns: values.bullyingConcerns,
        socialIntegration: values.socialIntegration,
        additionalNotes: values.additionalNotes,
      });
      
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
      
      toast({
        title: 'Pesquisa enviada com sucesso',
        description: 'Obrigado por fornecer essas informações importantes.',
      });
      
      setIsSubmitting(false);
      setFormSubmitted(true);
    }, 1500);
  };
  
  const startNewSurvey = () => {
    form.reset();
    setFormSubmitted(false);
  };
  
  return (
    <div className="w-full max-w-3xl mx-auto animate-scale-in">
      {formSubmitted ? (
        <FormCompletion onStartNewSurvey={startNewSurvey} />
      ) : (
        <Card className="shadow-md">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-bold">Pesquisa Diagnóstica Familiar</CardTitle>
            <CardDescription className="text-base mt-1">
              Ajude-nos a entender melhor as necessidades do aluno para prevenir a evasão escolar
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="space-y-6">
                  <div className="flex justify-end mb-2">
                    <WhatsAppButton 
                      form={form} 
                      sendingWhatsApp={sendingWhatsApp} 
                      setSendingWhatsApp={setSendingWhatsApp} 
                    />
                  </div>
                
                  <StudentSelect form={form} />
                  <ParentInfo form={form} />
                  <RiskFactors form={form} />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full py-6"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-foreground border-t-transparent" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
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
