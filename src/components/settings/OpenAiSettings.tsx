
import React, { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { EyeOff, Eye } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { openAiFormSchema } from './schemas';
import { z } from 'zod';

const OpenAiSettings: React.FC = () => {
  const { language } = useTheme();
  const { toast } = useToast();
  const [showApiKey, setShowApiKey] = useState(false);
  
  const openAiForm = useForm<z.infer<typeof openAiFormSchema>>({
    resolver: zodResolver(openAiFormSchema),
    defaultValues: {
      apiKey: '',
      model: 'gpt-4o',
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
  
  return (
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
  );
};

export default OpenAiSettings;
