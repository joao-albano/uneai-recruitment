
import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/ui/button';
import { ApiKeyInput } from '@/components/ui/api-key-input';
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { WhatsAppConfig } from '@/utils/whatsappIntegration';
import WhatsAppConnectionTest from './WhatsAppConnectionTest';

const whatsAppFormSchema = z.object({
  webhookUrl: z.string().url({ message: 'URL inválida' }).min(1, { message: 'URL do webhook é obrigatória' }),
  enabled: z.boolean().default(true),
  reminderTiming: z.coerce.number().min(1).max(7).default(1),
  appointmentReminder: z.string().optional(),
});

export type WhatsAppFormValues = z.infer<typeof whatsAppFormSchema>;

interface WhatsAppConfigFormProps {
  config: WhatsAppConfig;
  onSubmit: (values: WhatsAppFormValues) => Promise<void>;
}

const WhatsAppConfigForm: React.FC<WhatsAppConfigFormProps> = ({ config, onSubmit }) => {
  const { language } = useTheme();
  
  const form = useForm<WhatsAppFormValues>({
    resolver: zodResolver(whatsAppFormSchema),
    defaultValues: {
      webhookUrl: config.webhookUrl || '',
      enabled: config.enabled ?? (config.provider !== 'disabled'),
      reminderTiming: config.reminderTiming || 1,
      appointmentReminder: config.templateMessages?.appointmentReminder || 'Olá {{parentName}}, lembramos que você tem uma reunião agendada para amanhã ({{appointmentDate}}) referente ao aluno {{studentName}}. Contamos com sua presença!',
    },
  });
  
  const handleSubmit = async (values: WhatsAppFormValues) => {
    // Update the template messages with the appointment reminder
    const updatedConfig: Partial<WhatsAppConfig> = {
      provider: values.enabled ? 'n8n_webhook' : 'disabled',
      webhookUrl: values.webhookUrl,
      enabled: values.enabled,
      reminderTiming: values.reminderTiming,
      templateMessages: {
        ...config.templateMessages,
        appointmentReminder: values.appointmentReminder,
      },
    };
    
    await onSubmit({
      webhookUrl: values.webhookUrl,
      enabled: values.enabled,
      reminderTiming: values.reminderTiming,
      appointmentReminder: values.appointmentReminder,
    });
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="webhookUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {language === 'pt-BR' ? 'URL do Webhook do n8n' : 'n8n Webhook URL'}
              </FormLabel>
              <FormControl>
                <ApiKeyInput
                  {...field}
                  onChange={field.onChange}
                  placeholder="https://"
                />
              </FormControl>
              <FormDescription>
                {language === 'pt-BR' 
                  ? 'URL do webhook do n8n para envio de mensagens do WhatsApp' 
                  : 'n8n webhook URL for sending WhatsApp messages'}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="enabled"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
              <div className="space-y-0.5">
                <FormLabel>
                  {language === 'pt-BR' ? 'Ativar integração com WhatsApp' : 'Enable WhatsApp integration'}
                </FormLabel>
                <FormDescription>
                  {language === 'pt-BR' 
                    ? 'Ative para habilitar envio de mensagens via WhatsApp Business' 
                    : 'Enable to allow sending messages via WhatsApp Business'}
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
                {language === 'pt-BR' ? 'Dias de antecedência para lembrete' : 'Days in advance for reminder'}
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={1}
                  max={7}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {language === 'pt-BR' 
                  ? 'Quantos dias antes do agendamento o lembrete deve ser enviado' 
                  : 'How many days before the appointment the reminder should be sent'}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="appointmentReminder"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {language === 'pt-BR' ? 'Modelo de mensagem para lembrete' : 'Reminder message template'}
              </FormLabel>
              <FormControl>
                <Textarea
                  rows={4}
                  className="resize-y"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {language === 'pt-BR'
                  ? 'Use {{parentName}}, {{studentName}} e {{appointmentDate}} como variáveis na mensagem'
                  : 'Use {{parentName}}, {{studentName}} and {{appointmentDate}} as variables in the message'}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex flex-col sm:flex-row gap-3 justify-between">
          <WhatsAppConnectionTest 
            enabled={form.watch('enabled')} 
            webhookUrl={form.watch('webhookUrl')}
          />
          
          <Button type="submit">
            {language === 'pt-BR' ? 'Salvar Configurações' : 'Save Settings'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default WhatsAppConfigForm;
