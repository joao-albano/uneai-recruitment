
import React, { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Robot, Webhook, EyeOff, Eye, PlusCircle, Copy, CheckCircle2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const openAiFormSchema = z.object({
  apiKey: z.string().min(1, { message: 'API Key é obrigatória' }),
  model: z.string().min(1, { message: 'Modelo é obrigatório' }),
});

const webhookFormSchema = z.object({
  url: z.string().url({ message: 'URL inválida' }),
  description: z.string().optional(),
  enabled: z.boolean().default(true),
});

const ApiSettings: React.FC = () => {
  const { language } = useTheme();
  const { toast } = useToast();
  const [showApiKey, setShowApiKey] = useState(false);
  const [webhooks, setWebhooks] = useState<{id: string, url: string, description: string, enabled: boolean}[]>([]);
  const [copied, setCopied] = useState(false);
  
  const openAiForm = useForm<z.infer<typeof openAiFormSchema>>({
    resolver: zodResolver(openAiFormSchema),
    defaultValues: {
      apiKey: '',
      model: 'gpt-4o',
    },
  });
  
  const webhookForm = useForm<z.infer<typeof webhookFormSchema>>({
    resolver: zodResolver(webhookFormSchema),
    defaultValues: {
      url: '',
      description: '',
      enabled: true,
    },
  });
  
  const onOpenAiSubmit = (values: z.infer<typeof openAiFormSchema>) => {
    toast({
      title: language === 'pt-BR' ? 'Configurações da OpenAI salvas' : 'OpenAI settings saved',
      description: language === 'pt-BR' 
        ? 'Suas configurações da API foram atualizadas com sucesso' 
        : 'Your API settings have been successfully updated',
    });
    console.log(values);
  };
  
  const onWebhookSubmit = (values: z.infer<typeof webhookFormSchema>) => {
    const newWebhook = {
      id: `webhook-${Date.now()}`,
      url: values.url,
      description: values.description || '',
      enabled: values.enabled,
    };
    
    setWebhooks([...webhooks, newWebhook]);
    webhookForm.reset();
    
    toast({
      title: language === 'pt-BR' ? 'Webhook adicionado' : 'Webhook added',
      description: language === 'pt-BR' 
        ? 'O webhook foi adicionado com sucesso' 
        : 'The webhook has been successfully added',
    });
  };
  
  const toggleWebhook = (id: string) => {
    setWebhooks(
      webhooks.map(webhook => 
        webhook.id === id 
          ? { ...webhook, enabled: !webhook.enabled } 
          : webhook
      )
    );
  };
  
  const deleteWebhook = (id: string) => {
    setWebhooks(webhooks.filter(webhook => webhook.id !== id));
    toast({
      title: language === 'pt-BR' ? 'Webhook removido' : 'Webhook removed',
      description: language === 'pt-BR' 
        ? 'O webhook foi removido com sucesso' 
        : 'The webhook has been successfully removed',
    });
  };
  
  const copyKey = () => {
    const webhookKey = "sk_test_webhook_key_12345";
    navigator.clipboard.writeText(webhookKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    
    toast({
      title: language === 'pt-BR' ? 'Chave copiada' : 'Key copied',
      description: language === 'pt-BR' 
        ? 'A chave do webhook foi copiada para a área de transferência' 
        : 'The webhook key has been copied to your clipboard',
    });
  };
  
  return (
    <Tabs defaultValue="openai" className="space-y-4">
      <TabsList>
        <TabsTrigger value="openai" className="flex items-center gap-2">
          <Robot className="h-4 w-4" />
          <span>{language === 'pt-BR' ? 'OpenAI' : 'OpenAI'}</span>
        </TabsTrigger>
        <TabsTrigger value="webhooks" className="flex items-center gap-2">
          <Webhook className="h-4 w-4" />
          <span>{language === 'pt-BR' ? 'Webhooks' : 'Webhooks'}</span>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="openai">
        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'pt-BR' ? 'Configurações da OpenAI' : 'OpenAI Settings'}
            </CardTitle>
            <CardDescription>
              {language === 'pt-BR' 
                ? 'Configure a integração com a API da OpenAI para habilitar recursos de IA' 
                : 'Configure OpenAI API integration to enable AI features'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...openAiForm}>
              <form onSubmit={openAiForm.handleSubmit(onOpenAiSubmit)} className="space-y-4">
                <FormField
                  control={openAiForm.control}
                  name="apiKey"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {language === 'pt-BR' ? 'Chave da API da OpenAI' : 'OpenAI API Key'}
                      </FormLabel>
                      <div className="flex">
                        <FormControl>
                          <div className="relative w-full">
                            <Input 
                              {...field} 
                              type={showApiKey ? "text" : "password"} 
                              placeholder={language === 'pt-BR' ? 'sk-...' : 'sk-...'}
                              className="pr-10"
                            />
                            <button 
                              type="button"
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                              onClick={() => setShowApiKey(!showApiKey)}
                            >
                              {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                        </FormControl>
                      </div>
                      <FormDescription>
                        {language === 'pt-BR' 
                          ? 'Você pode obter sua chave no painel da OpenAI' 
                          : 'You can get your key from the OpenAI dashboard'}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={openAiForm.control}
                  name="model"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {language === 'pt-BR' ? 'Modelo de IA' : 'AI Model'}
                      </FormLabel>
                      <select
                        {...field}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="gpt-4o">{language === 'pt-BR' ? 'GPT-4o (Recomendado)' : 'GPT-4o (Recommended)'}</option>
                        <option value="gpt-4o-mini">GPT-4o Mini</option>
                        <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                      </select>
                      <FormDescription>
                        {language === 'pt-BR' 
                          ? 'Selecione o modelo de IA para usar nos recursos de previsão' 
                          : 'Select which AI model to use for prediction features'}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-end">
                  <Button type="submit">
                    {language === 'pt-BR' ? 'Salvar Configurações' : 'Save Settings'}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="webhooks">
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>
              {language === 'pt-BR' ? 'Chave de Acesso aos Webhooks' : 'Webhook Access Key'}
            </CardTitle>
            <CardDescription>
              {language === 'pt-BR' 
                ? 'Use esta chave para autenticar requisições de webhook' 
                : 'Use this key to authenticate webhook requests'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-3 border rounded-md bg-muted/50">
              <div className="font-mono text-sm">sk_test_webhook_key_••••••••••••</div>
              <Button variant="outline" size="sm" onClick={copyKey}>
                {copied ? (
                  <CheckCircle2 className="h-4 w-4 mr-1" />
                ) : (
                  <Copy className="h-4 w-4 mr-1" />
                )}
                {language === 'pt-BR' ? 'Copiar' : 'Copy'}
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'pt-BR' ? 'Gerenciar Webhooks' : 'Manage Webhooks'}
            </CardTitle>
            <CardDescription>
              {language === 'pt-BR' 
                ? 'Configure webhooks para integrar com sistemas externos' 
                : 'Configure webhooks to integrate with external systems'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Form {...webhookForm}>
              <form onSubmit={webhookForm.handleSubmit(onWebhookSubmit)} className="space-y-4">
                <FormField
                  control={webhookForm.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {language === 'pt-BR' ? 'URL do Webhook' : 'Webhook URL'}
                      </FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder={language === 'pt-BR' ? 'https://sua-api.com/webhook' : 'https://your-api.com/webhook'}
                        />
                      </FormControl>
                      <FormDescription>
                        {language === 'pt-BR' 
                          ? 'URL para onde os eventos serão enviados' 
                          : 'URL where events will be sent'}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={webhookForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {language === 'pt-BR' ? 'Descrição (opcional)' : 'Description (optional)'}
                      </FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder={language === 'pt-BR' ? 'Webhook para sistema de CRM' : 'Webhook for CRM system'}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={webhookForm.control}
                  name="enabled"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>
                          {language === 'pt-BR' ? 'Ativo' : 'Enabled'}
                        </FormLabel>
                        <FormDescription>
                          {language === 'pt-BR' 
                            ? 'Ative ou desative o webhook' 
                            : 'Enable or disable the webhook'}
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
                
                <div className="flex justify-end">
                  <Button type="submit" className="flex items-center gap-1">
                    <PlusCircle className="h-4 w-4" />
                    {language === 'pt-BR' ? 'Adicionar Webhook' : 'Add Webhook'}
                  </Button>
                </div>
              </form>
            </Form>
            
            {webhooks.length > 0 && (
              <>
                <Separator className="my-4" />
                
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">
                    {language === 'pt-BR' ? 'Webhooks Configurados' : 'Configured Webhooks'}
                  </h3>
                  
                  {webhooks.map((webhook) => (
                    <div key={webhook.id} className="flex items-center justify-between p-3 border rounded-md">
                      <div className="space-y-1 flex-1">
                        <p className="text-sm font-medium truncate">{webhook.url}</p>
                        {webhook.description && (
                          <p className="text-xs text-muted-foreground">{webhook.description}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={webhook.enabled}
                          onCheckedChange={() => toggleWebhook(webhook.id)}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteWebhook(webhook.id)}
                          className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                        >
                          {language === 'pt-BR' ? 'Remover' : 'Remove'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default ApiSettings;
