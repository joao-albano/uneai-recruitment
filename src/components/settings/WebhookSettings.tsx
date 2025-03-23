
import React, { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { WebhookType, webhookFormSchema } from './schemas';
import { v4 as uuidv4 } from 'uuid';
import WebhookAccessKey from './WebhookAccessKey';
import WebhooksList from './WebhooksList';

const WebhookSettings: React.FC = () => {
  const { language } = useTheme();
  const { toast } = useToast();
  const [webhooks, setWebhooks] = useState<WebhookType[]>([]);
  
  const webhookForm = useForm({
    resolver: zodResolver(webhookFormSchema),
    defaultValues: {
      url: '',
      description: '',
      enabled: true,
    },
  });
  
  const onWebhookSubmit = (values: any) => {
    const newWebhook: WebhookType = {
      id: uuidv4(),
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
      webhooks.map((webhook) => 
        webhook.id === id 
          ? { ...webhook, enabled: !webhook.enabled } 
          : webhook
      )
    );
  };
  
  const deleteWebhook = (id: string) => {
    setWebhooks(webhooks.filter((webhook) => webhook.id !== id));
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            {language === 'pt-BR' ? 'Webhooks para outros sistemas' : 'Webhooks for other systems'}
          </CardTitle>
          <CardDescription>
            {language === 'pt-BR' 
              ? 'Configure webhooks de saída para notificar outros sistemas sobre eventos deste sistema' 
              : 'Configure outgoing webhooks to notify other systems about events from this system'}
          </CardDescription>
        </CardHeader>
        <CardContent>
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
                      <Input {...field} placeholder="https://" />
                    </FormControl>
                    <FormDescription>
                      {language === 'pt-BR' 
                        ? 'URL para onde as notificações serão enviadas' 
                        : 'The URL where notifications will be sent'}
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
                      {language === 'pt-BR' ? 'Descrição (Opcional)' : 'Description (Optional)'}
                    </FormLabel>
                    <FormControl>
                      <Textarea 
                        {...field} 
                        placeholder={language === 'pt-BR' 
                          ? 'Adicione uma descrição para identificar esse webhook' 
                          : 'Add a description to identify this webhook'}
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
                        {language === 'pt-BR' ? 'Ativar Webhook' : 'Enable Webhook'}
                      </FormLabel>
                      <FormDescription>
                        {language === 'pt-BR' 
                          ? 'Ative para enviar notificações para este webhook' 
                          : 'Enable to send notifications to this webhook'}
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
                <Button type="submit">
                  {language === 'pt-BR' ? 'Adicionar Webhook' : 'Add Webhook'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <WebhookAccessKey />
      
      <WebhooksList 
        webhooks={webhooks} 
        toggleWebhook={toggleWebhook}
        deleteWebhook={deleteWebhook}
      />
    </div>
  );
};

export default WebhookSettings;
