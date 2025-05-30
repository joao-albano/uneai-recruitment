
import React, { useState } from 'react';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea'; // Importando o componente Textarea
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MessageSquare } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { WhatsAppConfig } from '@/utils/whatsappIntegration';
import WhatsAppConnectionTest from './WhatsAppConnectionTest';
import WhatsAppConnectionStatus from './WhatsAppConnectionStatus';
import { testWhatsAppConnection } from '@/utils/whatsappIntegration';
import { useToast } from '@/hooks/use-toast';
import { WhatsAppQRCodeScanner } from './WhatsAppQRCodeScanner';

// Define form schema
const formSchema = z.object({
  enabled: z.boolean().default(false),
  reminderTiming: z.number().min(1).max(7).default(1),
  appointmentReminder: z.string().min(10, {
    message: "O texto do lembrete deve ter pelo menos 10 caracteres",
  }),
});

export type WhatsAppFormValues = z.infer<typeof formSchema>;

interface WhatsAppConfigFormProps {
  config: WhatsAppConfig;
  onSubmit: (values: WhatsAppFormValues) => void;
}

const WhatsAppConfigForm: React.FC<WhatsAppConfigFormProps> = ({ config, onSubmit }) => {
  const { language } = useTheme();
  const { toast } = useToast();
  const [isConnecting, setIsConnecting] = useState(false);
  const [isDisconnecting, setIsDisconnecting] = useState(false);

  // Create form with default values from config
  const form = useForm<WhatsAppFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      enabled: config.enabled || false,
      reminderTiming: config.reminderTiming || 1,
      appointmentReminder: config.templateMessages?.appointmentReminder || 
        'Olá {{parentName}}, lembramos que você tem uma reunião agendada para amanhã ({{appointmentDate}}) referente ao aluno {{studentName}}. Contamos com sua presença!'
    },
  });
  
  const handleFormSubmit = (values: WhatsAppFormValues) => {
    onSubmit(values);
  };
  
  const handleDisconnect = async () => {
    setIsDisconnecting(true);
    
    try {
      // In a real app, we would call an API to disconnect
      setTimeout(() => {
        config.connected = false;
        
        toast({
          title: language === 'pt-BR' ? 'WhatsApp desconectado' : 'WhatsApp disconnected',
          description: language === 'pt-BR' 
            ? 'Seu WhatsApp Business foi desconectado com sucesso' 
            : 'Your WhatsApp Business has been successfully disconnected',
        });
      }, 1000);
    } catch (error) {
      toast({
        title: language === 'pt-BR' ? 'Erro ao desconectar' : 'Error disconnecting',
        description: String(error),
        variant: 'destructive',
      });
    } finally {
      setIsDisconnecting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-4 border rounded-lg">
        <h3 className="text-lg font-medium mb-2">
          {language === 'pt-BR' ? 'Status do WhatsApp' : 'WhatsApp Status'}
        </h3>
        <p className="text-muted-foreground mb-4">
          {language === 'pt-BR' 
            ? 'Status atual da conexão com WhatsApp Business' 
            : 'Current WhatsApp Business connection status'}
        </p>
        
        <div className="flex justify-between items-center mb-4">
          <div>
            <Badge variant={config.connected ? "secondary" : "destructive"} className="mb-2">
              {config.connected 
                ? (language === 'pt-BR' ? 'Conectado' : 'Connected') 
                : (language === 'pt-BR' ? 'Desconectado' : 'Disconnected')}
            </Badge>
          </div>
          
          {config.connected && (
            <Button
              variant="outline"
              onClick={handleDisconnect}
              disabled={isDisconnecting}
            >
              {isDisconnecting ? (
                <>
                  <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-foreground border-t-transparent" />
                  {language === 'pt-BR' ? 'Desconectando...' : 'Disconnecting...'}
                </>
              ) : (
                language === 'pt-BR' ? 'Desconectar WhatsApp' : 'Disconnect WhatsApp'
              )}
            </Button>
          )}
        </div>
        
        <WhatsAppConnectionStatus />
        
        {!config.connected && (
          <div className="mt-6">
            <WhatsAppQRCodeScanner />
          </div>
        )}
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="enabled"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">
                    {language === 'pt-BR' ? 'Ativar WhatsApp' : 'Enable WhatsApp'}
                  </FormLabel>
                  <FormDescription>
                    {language === 'pt-BR' 
                      ? 'Ative para habilitar o envio de mensagens via WhatsApp' 
                      : 'Enable to allow sending messages via WhatsApp'}
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
            name="reminderTiming"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {language === 'pt-BR' ? 'Enviar lembretes' : 'Send reminders'}
                </FormLabel>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      {...field}
                      onChange={e => field.onChange(+e.target.value)}
                      min={1}
                      max={7}
                      className="w-20"
                    />
                    <span>
                      {language === 'pt-BR' ? 'dias antes do agendamento' : 'days before appointment'}
                    </span>
                  </div>
                </FormControl>
                <FormDescription>
                  {language === 'pt-BR' 
                    ? 'Quantos dias antes enviar lembretes de agendamento' 
                    : 'How many days before to send appointment reminders'}
                </FormDescription>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="appointmentReminder"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {language === 'pt-BR' ? 'Mensagem de lembrete' : 'Reminder message'}
                </FormLabel>
                <FormDescription className="mb-2">
                  {language === 'pt-BR' 
                    ? 'Use {{studentName}}, {{parentName}} e {{appointmentDate}} como variáveis' 
                    : 'Use {{studentName}}, {{parentName}} and {{appointmentDate}} as variables'}
                </FormDescription>
                <FormControl>
                  <Textarea 
                    {...field} 
                    className="min-h-[100px] resize-y" 
                    placeholder={language === 'pt-BR' 
                      ? 'Digite a mensagem de lembrete...' 
                      : 'Type reminder message...'}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          <div className="flex justify-end">
            <Button type="submit" className="w-full sm:w-auto">
              <MessageSquare className="mr-2 h-4 w-4" />
              {language === 'pt-BR' ? 'Salvar Configurações' : 'Save Settings'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default WhatsAppConfigForm;
