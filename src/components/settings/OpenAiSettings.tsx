
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

const OpenAiSettings: React.FC = () => {
  const { language } = useTheme();
  const { toast } = useToast();
  const [savedValues, setSavedValues] = useState<z.infer<typeof riskAlgorithmSchema> | null>(null);
  
  // Carregar valores salvos ou usar os padrões
  useEffect(() => {
    const savedSettings = localStorage.getItem('riskAlgorithmSettings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSavedValues(parsed);
      } catch (error) {
        console.error('Error parsing saved settings:', error);
      }
    }
  }, []);
  
  const riskForm = useForm<z.infer<typeof riskAlgorithmSchema>>({
    resolver: zodResolver(riskAlgorithmSchema),
    defaultValues: savedValues || defaultThresholds,
  });
  
  // Atualizar o formulário quando os valores salvos forem carregados
  useEffect(() => {
    if (savedValues) {
      riskForm.reset(savedValues);
    }
  }, [savedValues, riskForm]);
  
  const onSubmit = (values: z.infer<typeof riskAlgorithmSchema>) => {
    // Salvar configurações no localStorage
    localStorage.setItem('riskAlgorithmSettings', JSON.stringify(values));
    setSavedValues(values);
    
    toast({
      title: language === 'pt-BR' ? 'Configurações do algoritmo salvas' : 'Algorithm settings saved',
      description: language === 'pt-BR' 
        ? 'Os parâmetros do algoritmo de risco foram atualizados com sucesso' 
        : 'Risk algorithm parameters have been successfully updated',
    });
    console.log('Updated algorithm parameters:', values);
  };
  
  const handleReset = () => {
    // Restaurar valores padrão
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
          {language === 'pt-BR' ? 'Configurações do Algoritmo de Risco' : 'Risk Algorithm Settings'}
        </CardTitle>
        <CardDescription>
          {language === 'pt-BR' 
            ? 'Configure os parâmetros utilizados pelo algoritmo de previsão de risco' 
            : 'Configure parameters used by the risk prediction algorithm'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...riskForm}>
          <form onSubmit={riskForm.handleSubmit(onSubmit)} className="space-y-4">
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
                onClick={handleReset}
              >
                {language === 'pt-BR' ? 'Restaurar Padrões' : 'Restore Defaults'}
              </Button>
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
