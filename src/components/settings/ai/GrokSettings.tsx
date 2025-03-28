
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

const grokFormSchema = z.object({
  apiKey: z.string().min(1, { message: 'API Key é obrigatória' }),
  model: z.string().min(1, { message: 'Modelo é obrigatório' }),
});

type GrokFormValues = z.infer<typeof grokFormSchema>;

// Grok models (currently just one, but structure allows for future expansion)
const grokModels = [
  { value: 'grok-1', label: 'Grok-1' },
  { value: 'grok-2', label: 'Grok-2 (Preview)' },
];

const GrokSettings: React.FC = () => {
  const { language } = useTheme();
  const { toast } = useToast();
  const [savedValues, setSavedValues] = React.useState<GrokFormValues | null>(null);
  
  // Load saved settings
  React.useEffect(() => {
    try {
      const savedSettings = localStorage.getItem('grokSettings');
      if (savedSettings) {
        setSavedValues(JSON.parse(savedSettings));
      }
    } catch (error) {
      console.error('Error loading Grok settings:', error);
    }
  }, []);
  
  const form = useForm<GrokFormValues>({
    resolver: zodResolver(grokFormSchema),
    defaultValues: savedValues || {
      apiKey: '',
      model: 'grok-1',
    },
  });
  
  const onSubmit = (values: GrokFormValues) => {
    localStorage.setItem('grokSettings', JSON.stringify(values));
    setSavedValues(values);
    
    toast({
      title: language === 'pt-BR' ? 'Configurações salvas' : 'Settings saved',
      description: language === 'pt-BR' 
        ? 'Configurações do Grok foram atualizadas com sucesso' 
        : 'Grok settings have been updated successfully',
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {language === 'pt-BR' ? 'Configurações do Grok' : 'Grok Settings'}
        </CardTitle>
        <CardDescription>
          {language === 'pt-BR' 
            ? 'Configure a integração com o modelo Grok da xAI' 
            : 'Configure integration with xAI Grok model'}
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
                    {language === 'pt-BR' ? 'Chave da API do Grok' : 'Grok API Key'}
                  </FormLabel>
                  <FormControl>
                    <ApiKeyInput
                      {...field}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription>
                    {language === 'pt-BR' 
                      ? 'Chave de acesso à API da xAI para o modelo Grok' 
                      : 'xAI API access key for Grok model'}
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
                      {grokModels.map((model) => (
                        <SelectItem key={model.value} value={model.value}>
                          {model.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    {language === 'pt-BR' 
                      ? 'Versão do modelo Grok utilizado para análise de dados' 
                      : 'Grok model version used for data analysis'}
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

export default GrokSettings;
