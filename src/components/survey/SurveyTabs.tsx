
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTheme } from '@/context/ThemeContext';
import SurveyForm from './SurveyForm';
import WhatsAppHistory from './WhatsAppHistory';
import VoiceCallHistory from './VoiceCallHistory';

const SurveyTabs: React.FC = () => {
  const { language } = useTheme();
  
  return (
    <Tabs defaultValue="survey" className="w-full">
      <TabsList className="grid grid-cols-3 mb-8">
        <TabsTrigger value="survey">
          {language === 'pt-BR' ? 'Novo Questionário' : 'New Survey'}
        </TabsTrigger>
        <TabsTrigger value="whatsapp">
          {language === 'pt-BR' ? 'Histórico WhatsApp' : 'WhatsApp History'}
        </TabsTrigger>
        <TabsTrigger value="voicecalls">
          {language === 'pt-BR' ? 'Histórico Ligações' : 'Voice Call History'}
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="survey">
        <SurveyForm />
      </TabsContent>
      
      <TabsContent value="whatsapp">
        <WhatsAppHistory />
      </TabsContent>
      
      <TabsContent value="voicecalls">
        <VoiceCallHistory />
      </TabsContent>
    </Tabs>
  );
};

export default SurveyTabs;
