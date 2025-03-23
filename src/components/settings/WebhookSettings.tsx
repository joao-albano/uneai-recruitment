
import React, { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { PlusCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { webhookFormSchema, WebhookType } from './schemas';
import { Switch } from '@/components/ui/switch';
import { z } from 'zod';
import WebhookAccessKey from './WebhookAccessKey';
import WebhooksList from './WebhooksList';

const WebhookSettings: React.FC = () => {
  const { language } = useTheme();
  const { toast } = useToast();
  const [webhooks, setWebhooks] = useState<WebhookType[]>([]);
  
  const webhookForm = useForm<z.infer<typeof webhookFormSchema>>({
    resolver: zodResolver(webhookFormSchema),
    defaultValues: {
      url: '',
      description: '',
      enabled: true,
    },
  });
  
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
  
  return (
    <>
      <WebhookAccessKey />
      
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
              <WebhooksList 
                webhooks={webhooks} 
                toggleWebhook={toggleWebhook}
                deleteWebhook={deleteWebhook}
              />
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default WebhookSettings;
