
import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/components/ui/use-toast';

// Criando um schema para o formulário da API
const apiFormSchema = z.object({
  apiEndpoint: z.string().url({ message: 'URL inválida' }),
  apiKey: z.string().min(1, { message: 'Chave da API é obrigatória' }),
});

type ApiFormValues = z.infer<typeof apiFormSchema>;

const ApiSettings: React.FC = () => {
  const { language } = useTheme();
  const { toast } = useToast();
  
  const form = useForm<ApiFormValues>({
    resolver: zodResolver(apiFormSchema),
    defaultValues: {
      apiEndpoint: '',
      apiKey: '',
    },
  });
  
  const onSubmit = (values: ApiFormValues) => {
    console.log('API settings:', values);
    
    toast({
      title: language === 'pt-BR' ? 'Configurações da API salvas' : 'API settings saved',
      description: language === 'pt-BR' 
        ? 'Suas configurações da API foram atualizadas com sucesso' 
        : 'Your API settings have been successfully updated',
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {language === 'pt-BR' ? 'Configurações da API' : 'API Settings'}
        </CardTitle>
        <CardDescription>
          {language === 'pt-BR' 
            ? 'Configure a API para integração com outros sistemas' 
            : 'Configure the API for integration with other systems'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="apiEndpoint"
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
                      ? 'URL para o endpoint principal da API' 
                      : 'URL for the main API endpoint'}
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
                      ? 'Chave de autenticação para acessar a API' 
                      : 'Authentication key to access the API'}
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
  );
};

export default ApiSettings;
