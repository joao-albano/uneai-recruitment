
import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useToast } from '@/components/ui/use-toast';
import { ApiKeyInput } from '@/components/ui/api-key-input';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { openAiFormSchema } from '../schemas';
import { z } from 'zod';

// OpenAI models available
const openAiModels = [
  { value: 'gpt-4o', label: 'GPT-4o' },
  { value: 'gpt-4o-mini', label: 'GPT-4o Mini' },
];

type OpenAiFormValues = z.infer<typeof openAiFormSchema>;

interface OpenAiFormProps {
  savedValues: OpenAiFormValues | null;
  onSubmit: (values: OpenAiFormValues) => void;
}

const OpenAiForm: React.FC<OpenAiFormProps> = ({ savedValues, onSubmit }) => {
  const { language } = useTheme();
  
  const form = useForm<OpenAiFormValues>({
    resolver: zodResolver(openAiFormSchema),
    defaultValues: savedValues || {
      apiKey: '',
      model: 'gpt-4o-mini',
    },
  });
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="apiKey"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {language === 'pt-BR' ? 'Chave da API da OpenAI' : 'OpenAI API Key'}
              </FormLabel>
              <FormControl>
                <ApiKeyInput
                  {...field}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormDescription>
                {language === 'pt-BR' 
                  ? 'Chave de acesso à API da OpenAI para análise de comportamentos' 
                  : 'OpenAI API access key for behavior analysis'}
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
                  {openAiModels.map((model) => (
                    <SelectItem key={model.value} value={model.value}>
                      {model.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                {language === 'pt-BR' 
                  ? 'Modelo utilizado para análise de dados e comportamentos' 
                  : 'Model used for data and behavior analysis'}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="pt-2">
          <Button type="submit">
            {language === 'pt-BR' ? 'Salvar Configurações da API' : 'Save API Settings'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default OpenAiForm;
