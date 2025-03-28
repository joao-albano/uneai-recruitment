
import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { ApiKeyInput } from '@/components/ui/api-key-input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/components/ui/use-toast';

const googleAiFormSchema = z.object({
  apiKey: z.string().min(1, { message: 'API Key é obrigatória' }),
  model: z.string().min(1, { message: 'Modelo é obrigatório' }),
});

type GoogleAiFormValues = z.infer<typeof googleAiFormSchema>;

// Google AI models
const googleAiModels = [
  { value: 'gemini-1.5-pro', label: 'Gemini 1.5 Pro' },
  { value: 'gemini-1.5-flash', label: 'Gemini 1.5 Flash' },
  { value: 'gemini-1.0-pro', label: 'Gemini 1.0 Pro' },
];

const GoogleAiSettings: React.FC = () => {
  const { language } = useTheme();
  const { toast } = useToast();
  const [savedValues, setSavedValues] = React.useState<GoogleAiFormValues | null>(null);
  
  // Load saved settings
  React.useEffect(() => {
    try {
      const savedSettings = localStorage.getItem('googleAiSettings');
      if (savedSettings) {
        setSavedValues(JSON.parse(savedSettings));
      }
    } catch (error) {
      console.error('Error loading Google AI settings:', error);
    }
  }, []);
  
  const form = useForm<GoogleAiFormValues>({
    resolver: zodResolver(googleAiFormSchema),
    defaultValues: savedValues || {
      apiKey: '',
      model: 'gemini-1.5-pro',
    },
  });
  
  const onSubmit = (values: GoogleAiFormValues) => {
    localStorage.setItem('googleAiSettings', JSON.stringify(values));
    setSavedValues(values);
    
    toast({
      title: language === 'pt-BR' ? 'Configurações salvas' : 'Settings saved',
      description: language === 'pt-BR' 
        ? 'Configurações da Google AI foram atualizadas com sucesso' 
        : 'Google AI settings have been updated successfully',
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {language === 'pt-BR' ? 'Configurações do Google AI' : 'Google AI Settings'}
        </CardTitle>
        <CardDescription>
          {language === 'pt-BR' 
            ? 'Configure a integração com os modelos Gemini da Google' 
            : 'Configure integration with Google Gemini models'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="apiKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {language === 'pt-BR' ? 'Chave da API da Google' : 'Google API Key'}
                  </FormLabel>
                  <FormControl>
                    <ApiKeyInput
                      {...field}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription>
                    {language === 'pt-BR' 
                      ? 'Chave de acesso à API da Google AI para modelos Gemini' 
                      : 'Google AI API access key for Gemini models'}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="model"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {language === 'pt-BR' ? 'Modelo' : 'Model'}
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={language === 'pt-BR' ? 'Selecione um modelo' : 'Select a model'} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {googleAiModels.map((model) => (
                        <SelectItem key={model.value} value={model.value}>
                          {model.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    {language === 'pt-BR' 
                      ? 'Modelo da Google AI utilizado para análise de dados' 
                      : 'Google AI model used for data analysis'}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="pt-2">
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

export default GoogleAiSettings;
