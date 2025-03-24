
import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import OpenAiForm from './openai/OpenAiForm';
import RiskAlgorithmForm from './algorithm/RiskAlgorithmForm';
import { useAiSettings } from '@/hooks/useAiSettings';

const OpenAiSettings: React.FC = () => {
  const { language } = useTheme();
  const { 
    savedRiskValues, 
    savedOpenAiValues, 
    saveRiskSettings, 
    saveOpenAiSettings 
  } = useAiSettings();
  
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
            <OpenAiForm 
              savedValues={savedOpenAiValues} 
              onSubmit={saveOpenAiSettings} 
            />
          </TabsContent>
          
          {/* Tab para configuração do algoritmo de risco */}
          <TabsContent value="algorithm" className="space-y-4">
            <RiskAlgorithmForm 
              savedValues={savedRiskValues} 
              onSubmit={saveRiskSettings} 
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default OpenAiSettings;
