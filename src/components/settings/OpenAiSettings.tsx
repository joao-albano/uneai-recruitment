
import React, { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Esquema de validação para a API da OpenAI
const openAiSchema = z.object({
  apiKey: z.string().min(1, { message: 'A chave da API é obrigatória' }),
  model: z.string().min(1, { message: 'O modelo é obrigatório' }),
});

// Esquema de validação para os parâmetros do algoritmo
const riskAlgorithmSchema = z.object({
  gradeThresholdHigh: z.coerce.number().min(0).max(10),
  gradeThresholdMedium: z.coerce.number().min(0).max(10),
  attendanceThresholdHigh: z.coerce.number().min(0).max(100),
  attendanceThresholdMedium: z.coerce.number().min(0).max(100),
  behaviorThresholdHigh: z.coerce.number().min(0).max(5),
  behaviorThresholdMedium: z.coerce.number().min(0).max(5),
});

// Valores padrão do algoritmo atual (do riskCalculator.ts)
const defaultThresholds = {
  gradeThresholdHigh: 5.0,
  gradeThresholdMedium: 6.5,
  attendanceThresholdHigh: 70,
  attendanceThresholdMedium: 85,
  behaviorThresholdHigh: 2,
  behaviorThresholdMedium: 3,
};

// Modelos disponíveis da OpenAI
const openAiModels = [
  { value: 'gpt-4o', label: 'GPT-4o' },
  { value: 'gpt-4o-mini', label: 'GPT-4o Mini' },
];

const OpenAiSettings: React.FC = () => {
  const { language } = useTheme();
  const { toast } = useToast();
  const [savedRiskValues, setSavedRiskValues] = useState<z.infer<typeof riskAlgorithmSchema> | null>(null);
  const [savedOpenAiValues, setSavedOpenAiValues] = useState<z.infer<typeof openAiSchema> | null>(null);
  
  // Carregar valores salvos para o algoritmo de risco
  useEffect(() => {
    const savedSettings = localStorage.getItem('riskAlgorithmSettings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSavedRiskValues(parsed);
      } catch (error) {
        console.error('Error parsing saved risk settings:', error);
      }
    }
    
    // Carregar valores salvos para a OpenAI
    const savedOpenAi = localStorage.getItem('openAiSettings');
    if (savedOpenAi) {
      try {
        const parsed = JSON.parse(savedOpenAi);
        setSavedOpenAiValues(parsed);
      } catch (error) {
        console.error('Error parsing saved OpenAI settings:', error);
      }
    }
  }, []);
  
  // Formulário para o algoritmo de risco
  const riskForm = useForm<z.infer<typeof riskAlgorithmSchema>>({
    resolver: zodResolver(riskAlgorithmSchema),
    defaultValues: savedRiskValues || defaultThresholds,
  });
  
  // Formulário para a OpenAI
  const openAiForm = useForm<z.infer<typeof openAiSchema>>({
    resolver: zodResolver(openAiSchema),
    defaultValues: savedOpenAiValues || {
      apiKey: '',
      model: 'gpt-4o-mini',
    },
  });
  
  // Atualizar o formulário do algoritmo quando os valores salvos forem carregados
  useEffect(() => {
    if (savedRiskValues) {
      riskForm.reset(savedRiskValues);
    }
  }, [savedRiskValues, riskForm]);
  
  // Atualizar o formulário da OpenAI quando os valores salvos forem carregados
  useEffect(() => {
    if (savedOpenAiValues) {
      openAiForm.reset(savedOpenAiValues);
    }
  }, [savedOpenAiValues, openAiForm]);
  
  // Salvar configurações do algoritmo de risco
  const onSubmitRisk = (values: z.infer<typeof riskAlgorithmSchema>) => {
    // Salvar configurações no localStorage
    localStorage.setItem('riskAlgorithmSettings', JSON.stringify(values));
    setSavedRiskValues(values);
    
    toast({
      title: language === 'pt-BR' ? 'Configurações do algoritmo salvas' : 'Algorithm settings saved',
      description: language === 'pt-BR' 
        ? 'Os parâmetros do algoritmo de risco foram atualizados com sucesso' 
        : 'Risk algorithm parameters have been successfully updated',
    });
    console.log('Updated algorithm parameters:', values);
  };
  
  // Salvar configurações da OpenAI
  const onSubmitOpenAi = (values: z.infer<typeof openAiSchema>) => {
    // Salvar configurações no localStorage
    localStorage.setItem('openAiSettings', JSON.stringify(values));
    setSavedOpenAiValues(values);
    
    toast({
      title: language === 'pt-BR' ? 'Configurações da OpenAI salvas' : 'OpenAI settings saved',
      description: language === 'pt-BR' 
        ? 'As configurações da API da OpenAI foram atualizadas com sucesso' 
        : 'OpenAI API settings have been successfully updated',
    });
    console.log('Updated OpenAI settings:', values);
  };
  
  const handleRiskReset = () => {
    // Restaurar valores padrão do algoritmo
    riskForm.reset(defaultThresholds);
    
    toast({
      title: language === 'pt-BR' ? 'Valores restaurados' : 'Values restored',
      description: language === 'pt-BR' 
        ? 'Os parâmetros do algoritmo foram restaurados para os valores padrão' 
        : 'Algorithm parameters have been restored to default values',
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {language === 'pt-BR' ? 'Configurações de IA' : 'AI Settings'}
        </CardTitle>
        <CardDescription>
          {language === 'pt-BR' 
            ? 'Configure os parâmetros de IA e do algoritmo de previsão de risco' 
            : 'Configure AI parameters and risk prediction algorithm'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="openai" className="w-full">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="openai">
              {language === 'pt-BR' ? 'API da OpenAI' : 'OpenAI API'}
            </TabsTrigger>
            <TabsTrigger value="algorithm">
              {language === 'pt-BR' ? 'Algoritmo de Risco' : 'Risk Algorithm'}
            </TabsTrigger>
          </TabsList>
          
          {/* Tab para configuração da OpenAI */}
          <TabsContent value="openai" className="space-y-4">
            <Form {...openAiForm}>
              <form onSubmit={openAiForm.handleSubmit(onSubmitOpenAi)} className="space-y-4">
                <FormField
                  control={openAiForm.control}
                  name="apiKey"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {language === 'pt-BR' ? 'Chave da API da OpenAI' : 'OpenAI API Key'}
                      </FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
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
                  control={openAiForm.control}
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
          </TabsContent>
          
          {/* Tab para configuração do algoritmo de risco */}
          <TabsContent value="algorithm" className="space-y-4">
            <Form {...riskForm}>
              <form onSubmit={riskForm.handleSubmit(onSubmitRisk)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Configurações para Notas */}
                  <div className="space-y-4">
                    <h3 className="text-md font-medium">
                      {language === 'pt-BR' ? 'Parâmetros de Notas' : 'Grade Parameters'}
                    </h3>
                    
                    <FormField
                      control={riskForm.control}
                      name="gradeThresholdHigh"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {language === 'pt-BR' ? 'Limite para Risco Alto' : 'High Risk Threshold'}
                          </FormLabel>
                          <FormControl>
                            <Input type="number" step="0.1" min="0" max="10" {...field} />
                          </FormControl>
                          <FormDescription>
                            {language === 'pt-BR' 
                              ? 'Notas abaixo deste valor são consideradas de alto risco' 
                              : 'Grades below this value are considered high risk'}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={riskForm.control}
                      name="gradeThresholdMedium"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {language === 'pt-BR' ? 'Limite para Risco Médio' : 'Medium Risk Threshold'}
                          </FormLabel>
                          <FormControl>
                            <Input type="number" step="0.1" min="0" max="10" {...field} />
                          </FormControl>
                          <FormDescription>
                            {language === 'pt-BR' 
                              ? 'Notas abaixo deste valor são consideradas de risco médio' 
                              : 'Grades below this value are considered medium risk'}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  {/* Configurações para Frequência */}
                  <div className="space-y-4">
                    <h3 className="text-md font-medium">
                      {language === 'pt-BR' ? 'Parâmetros de Frequência' : 'Attendance Parameters'}
                    </h3>
                    
                    <FormField
                      control={riskForm.control}
                      name="attendanceThresholdHigh"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {language === 'pt-BR' ? 'Limite para Risco Alto (%)' : 'High Risk Threshold (%)'}
                          </FormLabel>
                          <FormControl>
                            <Input type="number" min="0" max="100" {...field} />
                          </FormControl>
                          <FormDescription>
                            {language === 'pt-BR' 
                              ? 'Frequência abaixo deste valor é considerada de alto risco' 
                              : 'Attendance below this value is considered high risk'}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={riskForm.control}
                      name="attendanceThresholdMedium"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {language === 'pt-BR' ? 'Limite para Risco Médio (%)' : 'Medium Risk Threshold (%)'}
                          </FormLabel>
                          <FormControl>
                            <Input type="number" min="0" max="100" {...field} />
                          </FormControl>
                          <FormDescription>
                            {language === 'pt-BR' 
                              ? 'Frequência abaixo deste valor é considerada de risco médio' 
                              : 'Attendance below this value is considered medium risk'}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  {/* Configurações para Comportamento */}
                  <div className="space-y-4">
                    <h3 className="text-md font-medium">
                      {language === 'pt-BR' ? 'Parâmetros de Comportamento' : 'Behavior Parameters'}
                    </h3>
                    
                    <FormField
                      control={riskForm.control}
                      name="behaviorThresholdHigh"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {language === 'pt-BR' ? 'Limite para Risco Alto (1-5)' : 'High Risk Threshold (1-5)'}
                          </FormLabel>
                          <FormControl>
                            <Input type="number" min="0" max="5" step="1" {...field} />
                          </FormControl>
                          <FormDescription>
                            {language === 'pt-BR' 
                              ? 'Comportamento abaixo ou igual a este valor é considerado de alto risco' 
                              : 'Behavior below or equal to this value is considered high risk'}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={riskForm.control}
                      name="behaviorThresholdMedium"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {language === 'pt-BR' ? 'Limite para Risco Médio (1-5)' : 'Medium Risk Threshold (1-5)'}
                          </FormLabel>
                          <FormControl>
                            <Input type="number" min="0" max="5" step="1" {...field} />
                          </FormControl>
                          <FormDescription>
                            {language === 'pt-BR' 
                              ? 'Comportamento abaixo ou igual a este valor é considerado de risco médio' 
                              : 'Behavior below or equal to this value is considered medium risk'}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="md:col-span-2 flex flex-col space-y-2">
                    <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-md border border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200 mb-4">
                      <p className="text-sm">
                        {language === 'pt-BR'
                          ? 'Atenção: Modificar estes parâmetros afetará diretamente como o sistema classifica os alunos por risco. Recomendamos testar as alterações cuidadosamente.'
                          : 'Attention: Modifying these parameters will directly affect how the system classifies students by risk. We recommend testing changes carefully.'}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between mt-6">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handleRiskReset}
                  >
                    {language === 'pt-BR' ? 'Restaurar Padrões' : 'Restore Defaults'}
                  </Button>
                  <Button type="submit">
                    {language === 'pt-BR' ? 'Salvar Configurações' : 'Save Settings'}
                  </Button>
                </div>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default OpenAiSettings;
