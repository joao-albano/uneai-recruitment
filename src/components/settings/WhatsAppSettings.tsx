
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/components/ui/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useWhatsAppConfig } from '@/hooks/useWhatsAppConfig';
import { testWhatsAppConnection, WhatsAppProvider } from '@/utils/whatsappIntegration';
import { MessageSquare, CheckCircle, XCircle } from 'lucide-react';

const whatsAppFormSchema = z.object({
  provider: z.enum(['direct_api', 'n8n_webhook', 'disabled']),
  apiUrl: z.string().url({ message: 'URL inválida' }).optional().or(z.literal('')),
  apiKey: z.string().optional().or(z.literal('')),
  webhookUrl: z.string().url({ message: 'URL inválida' }).optional().or(z.literal('')),
});

type FormValues = z.infer<typeof whatsAppFormSchema>;

const WhatsAppSettings: React.FC = () => {
  const { language } = useTheme();
  const { toast } = useToast();
  const { config, updateConfig } = useWhatsAppConfig();
  const [isTesting, setIsTesting] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(whatsAppFormSchema),
    defaultValues: {
      provider: config.provider || 'disabled',
      apiUrl: config.apiUrl || '',
      apiKey: config.apiKey || '',
      webhookUrl: config.webhookUrl || '',
    },
  });
  
  const onSubmit = async (values: FormValues) => {
    // Atualize apenas os campos relevantes com base no provedor
    const updatedConfig: any = {
      provider: values.provider,
    };
    
    if (values.provider === 'direct_api') {
      updatedConfig.apiUrl = values.apiUrl;
      updatedConfig.apiKey = values.apiKey;
    } else if (values.provider === 'n8n_webhook') {
      updatedConfig.webhookUrl = values.webhookUrl;
    }
    
    updateConfig(updatedConfig);
    
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
      provider: formValues.provider as WhatsAppProvider,
      apiUrl: formValues.apiUrl,
      apiKey: formValues.apiKey,
      webhookUrl: formValues.webhookUrl,
    };
    
    try {
      const isConnected = await testWhatsAppConnection(testConfig);
      
      if (isConnected) {
        toast({
          title: language === 'pt-BR' ? 'Conexão bem-sucedida' : 'Connection successful',
          description: language === 'pt-BR' 
            ? 'A conexão com o WhatsApp foi estabelecida com sucesso' 
            : 'The WhatsApp connection was successfully established',
        });
      } else {
        toast({
          title: language === 'pt-BR' ? 'Falha na conexão' : 'Connection failed',
          description: language === 'pt-BR' 
            ? 'Não foi possível estabelecer conexão com o WhatsApp' 
            : 'Could not establish connection with WhatsApp',
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
  
  const providerWatcher = form.watch('provider');
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {language === 'pt-BR' ? 'Configuração do WhatsApp' : 'WhatsApp Configuration'}
        </CardTitle>
        <CardDescription>
          {language === 'pt-BR' 
            ? 'Configure a integração com WhatsApp para envio de mensagens' 
            : 'Configure WhatsApp integration for message sending'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="provider"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>
                    {language === 'pt-BR' ? 'Tipo de integração' : 'Integration type'}
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="direct_api" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {language === 'pt-BR' ? 'API Direta do WhatsApp' : 'Direct WhatsApp API'}
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="n8n_webhook" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {language === 'pt-BR' ? 'Webhook do n8n' : 'n8n Webhook'}
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="disabled" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {language === 'pt-BR' ? 'Desativado' : 'Disabled'}
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {providerWatcher === 'direct_api' && (
              <>
                <FormField
                  control={form.control}
                  name="apiUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {language === 'pt-BR' ? 'URL da API' : 'API URL'}
                      </FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="https://" />
                      </FormControl>
                      <FormDescription>
                        {language === 'pt-BR' 
                          ? 'URL do endpoint da API do WhatsApp' 
                          : 'WhatsApp API endpoint URL'}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="apiKey"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {language === 'pt-BR' ? 'Chave da API' : 'API Key'}
                      </FormLabel>
                      <FormControl>
                        <Input {...field} type="password" />
                      </FormControl>
                      <FormDescription>
                        {language === 'pt-BR' 
                          ? 'Chave de autenticação da API do WhatsApp' 
                          : 'WhatsApp API authentication key'}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            
            {providerWatcher === 'n8n_webhook' && (
              <FormField
                control={form.control}
                name="webhookUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {language === 'pt-BR' ? 'URL do Webhook' : 'Webhook URL'}
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="https://" />
                    </FormControl>
                    <FormDescription>
                      {language === 'pt-BR' 
                        ? 'URL do webhook do n8n para envio de mensagens' 
                        : 'n8n webhook URL for sending messages'}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            
            <div className="flex flex-col sm:flex-row gap-3 justify-between">
              {providerWatcher !== 'disabled' && (
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleTestConnection}
                  disabled={isTesting}
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
              )}
              
              <Button type="submit">
                {language === 'pt-BR' ? 'Salvar Configurações' : 'Save Settings'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default WhatsAppSettings;
