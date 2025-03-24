
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
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { WhatsAppConfig } from '@/utils/whatsappIntegration';
import WhatsAppConnectionTest from './WhatsAppConnectionTest';

const whatsAppFormSchema = z.object({
  webhookUrl: z.string().url({ message: 'URL inválida' }).min(1, { message: 'URL do webhook é obrigatória' }),
  enabled: z.boolean().default(true),
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
    },
  });
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
