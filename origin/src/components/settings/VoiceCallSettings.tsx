
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from '@/context/ThemeContext';
import VoiceCallConfigTab from './voicecall/VoiceCallConfigTab';
import VoiceCallHistoryTab from './voicecall/VoiceCallHistoryTab';

const VoiceCallSettings: React.FC = () => {
  const { language } = useTheme();
  
  return (
    <Tabs defaultValue="config" className="w-full">
      <TabsList className="grid grid-cols-2 mb-6">
        <TabsTrigger value="config">
          {language === 'pt-BR' ? 'Configuração Ligações' : 'Voice Call Config'}
        </TabsTrigger>
        <TabsTrigger value="history">
          {language === 'pt-BR' ? 'Histórico Ligações' : 'Voice Call History'}
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="config">
        <VoiceCallConfigTab />
      </TabsContent>
      
      <TabsContent value="history">
        <VoiceCallHistoryTab />
      </TabsContent>
    </Tabs>
  );
};

export default VoiceCallSettings;
