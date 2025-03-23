
import React, { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from '@/components/ui/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useWhatsAppConfig } from '@/hooks/useWhatsAppConfig';
import { useWhatsAppHistory } from '@/hooks/useWhatsAppHistory';
import { testWhatsAppConnection } from '@/utils/whatsappIntegration';
import { MessageSquare } from 'lucide-react';
import WhatsAppHistory from './WhatsAppHistory';

const whatsAppFormSchema = z.object({
  webhookUrl: z.string().url({ message: 'URL inválida' }).min(1, { message: 'URL do webhook é obrigatória' }),
  enabled: z.boolean().default(true),
});

type FormValues = z.infer<typeof whatsAppFormSchema>;

const WhatsAppSettings: React.FC = () => {
  const { language } = useTheme();
  const { toast } = useToast();
  const { config, updateConfig } = useWhatsAppConfig();
  const { messages, clearHistory } = useWhatsAppHistory();
  const [isTesting, setIsTesting] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(whatsAppFormSchema),
    defaultValues: {
      webhookUrl: config.webhookUrl || '',
      enabled: config.provider !== 'disabled',
    },
  });
  
  const onSubmit = async (values: FormValues) => {
    // Atualizar configuração
    updateConfig({
      provider: values.enabled ? 'n8n_webhook' : 'disabled',
      webhookUrl: values.webhookUrl,
    });
    
    toast({
      title: language === 'pt-BR' ? 'Configurações salvas' : 'Settings saved',
      description: language === 'pt-BR' 
        ? 'Configurações do WhatsApp foram atualizadas' 
        : 'WhatsApp settings have been updated',
    });
  };
  
  const handleTestConnection = async () => {
    setIsTesting(true);
    
    // Crie uma configuração temporária baseada nos valores atuais do formulário
    const formValues = form.getValues();
    const testConfig = {
      provider: formValues.enabled ? 'n8n_webhook' as const : 'disabled' as const,
      webhookUrl: formValues.webhookUrl,
    };
    
    try {
      const isConnected = await testWhatsAppConnection(testConfig);
      
      if (isConnected) {
        toast({
          title: language === 'pt-BR' ? 'Conexão bem-sucedida' : 'Connection successful',
          description: language === 'pt-BR' 
            ? 'A conexão com o webhook do n8n foi estabelecida com sucesso' 
            : 'The connection with the n8n webhook was successfully established',
        });
      } else {
        toast({
          title: language === 'pt-BR' ? 'Falha na conexão' : 'Connection failed',
          description: language === 'pt-BR' 
            ? 'Não foi possível estabelecer conexão com o webhook' 
            : 'Could not establish connection with the webhook',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: language === 'pt-BR' ? 'Erro ao testar' : 'Testing error',
        description: language === 'pt-BR' 
          ? 'Ocorreu um erro ao testar a conexão' 
          : 'An error occurred while testing the connection',
        variant: 'destructive',
      });
    } finally {
      setIsTesting(false);
    }
  };
  
  const handleClearHistory = () => {
    clearHistory();
    toast({
      title: language === 'pt-BR' ? 'Histórico limpo' : 'History cleared',
      description: language === 'pt-BR' 
        ? 'O histórico de mensagens foi limpo com sucesso' 
        : 'The message history has been successfully cleared',
    });
  };
  
  return (
    <Tabs defaultValue="config" className="w-full">
      <TabsList className="grid grid-cols-2 mb-6">
        <TabsTrigger value="config">
          {language === 'pt-BR' ? 'Configuração' : 'Configuration'}
        </TabsTrigger>
        <TabsTrigger value="history">
          {language === 'pt-BR' ? 'Histórico' : 'History'}
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="config">
        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'pt-BR' ? 'Configuração do WhatsApp' : 'WhatsApp Configuration'}
            </CardTitle>
            <CardDescription>
              {language === 'pt-BR' 
                ? 'Configure a integração com WhatsApp Business via webhook do n8n' 
                : 'Configure WhatsApp Business integration via n8n webhook'}
            </CardDescription>
          </CardHeader>
          <CardContent>
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
                        <Input {...field} placeholder="https://" />
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
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handleTestConnection}
                    disabled={isTesting || !form.watch('enabled')}
                  >
                    {isTesting ? (
                      <>
                        <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-foreground border-t-transparent" />
                        {language === 'pt-BR' ? 'Testando...' : 'Testing...'}
                      </>
                    ) : (
                      <>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        {language === 'pt-BR' ? 'Testar Conexão' : 'Test Connection'}
                      </>
                    )}
                  </Button>
                  
                  <Button type="submit">
                    {language === 'pt-BR' ? 'Salvar Configurações' : 'Save Settings'}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="history">
        <WhatsAppHistory 
          messages={messages}
          onClearHistory={handleClearHistory}
        />
      </TabsContent>
    </Tabs>
  );
};

export default WhatsAppSettings;
