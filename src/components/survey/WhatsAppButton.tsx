
import React from 'react';
import { MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useData } from '@/context/DataContext';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from './SurveyFormSchema';

interface WhatsAppButtonProps {
  form: UseFormReturn<FormValues>;
  sendingWhatsApp: boolean;
  setSendingWhatsApp: React.Dispatch<React.SetStateAction<boolean>>;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ 
  form, 
  sendingWhatsApp, 
  setSendingWhatsApp 
}) => {
  const { toast } = useToast();
  const { sendWhatsAppSurvey, whatsAppConfig } = useData();

  const handleSendWhatsApp = () => {
    try {
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
      
      // Send WhatsApp survey
      sendWhatsAppSurvey(studentId);
      
      const configEnabled = whatsAppConfig && whatsAppConfig.provider !== 'disabled';
      
      toast({
        title: 'Pesquisa enviada via WhatsApp',
        description: configEnabled
          ? 'A pesquisa foi enviada usando a integração configurada do WhatsApp.'
          : 'A pesquisa foi enviada (modo simulação). Verifique o histórico em Configurações Admin > WhatsApp > Histórico.',
      });
    } catch (error) {
      console.error('Error sending WhatsApp survey:', error);
      toast({
        title: 'Erro ao enviar pesquisa',
        description: error instanceof Error 
          ? `Falha ao enviar: ${error.message}` 
          : 'Ocorreu um erro desconhecido ao enviar a pesquisa.',
        variant: 'destructive',
      });
    } finally {
      // Ensure the button is always re-enabled
      setTimeout(() => {
        setSendingWhatsApp(false);
      }, 2000);
    }
  };

  // Let's add some debug console logs to help diagnose the issue
  const studentId = form.getValues('studentId');
  console.log('Student ID:', studentId);
  console.log('Button disabled state:', sendingWhatsApp || !studentId);

  return (
    <Button 
      type="button" 
      variant="outline" 
      onClick={handleSendWhatsApp}
      disabled={sendingWhatsApp}
      className="h-11 px-4"
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
  );
};

export default WhatsAppButton;
