
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

const claudeFormSchema = z.object({
  apiKey: z.string().min(1, { message: 'API Key é obrigatória' }),
  model: z.string().min(1, { message: 'Modelo é obrigatório' }),
});

type ClaudeFormValues = z.infer<typeof claudeFormSchema>;

// Claude models
const claudeModels = [
  { value: 'claude-3-opus', label: 'Claude 3 Opus' },
  { value: 'claude-3-sonnet', label: 'Claude 3 Sonnet' },
  { value: 'claude-3-haiku', label: 'Claude 3 Haiku' },
];

const ClaudeSettings: React.FC = () => {
  const { language } = useTheme();
  const { toast } = useToast();
  const [savedValues, setSavedValues] = React.useState<ClaudeFormValues | null>(null);
  
  // Load saved settings
  React.useEffect(() => {
    try {
      const savedSettings = localStorage.getItem('claudeSettings');
      if (savedSettings) {
        setSavedValues(JSON.parse(savedSettings));
      }
    } catch (error) {
      console.error('Error loading Claude settings:', error);
    }
  }, []);
  
  const form = useForm<ClaudeFormValues>({
    resolver: zodResolver(claudeFormSchema),
    defaultValues: savedValues || {
      apiKey: '',
      model: 'claude-3-sonnet',
    },
  });
  
  const onSubmit = (values: ClaudeFormValues) => {
    localStorage.setItem('claudeSettings', JSON.stringify(values));
    setSavedValues(values);
    
    toast({
      title: language === 'pt-BR' ? 'Configurações salvas' : 'Settings saved',
      description: language === 'pt-BR' 
        ? 'Configurações da Claude foram atualizadas com sucesso' 
        : 'Claude settings have been updated successfully',
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {language === 'pt-BR' ? 'Configurações da Claude' : 'Claude Settings'}
        </CardTitle>
        <CardDescription>
          {language === 'pt-BR' 
            ? 'Configure a integração com os modelos da Anthropic Claude' 
            : 'Configure integration with Anthropic Claude models'}
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
                    {language === 'pt-BR' ? 'Chave da API da Claude' : 'Claude API Key'}
                  </FormLabel>
                  <FormControl>
                    <ApiKeyInput
                      {...field}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription>
                    {language === 'pt-BR' 
                      ? 'Chave de acesso à API da Anthropic para modelos Claude' 
                      : 'Anthropic API access key for Claude models'}
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
                      {claudeModels.map((model) => (
                        <SelectItem key={model.value} value={model.value}>
                          {model.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    {language === 'pt-BR' 
                      ? 'Modelo da Claude utilizado para análise de dados' 
                      : 'Claude model used for data analysis'}
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

export default ClaudeSettings;
