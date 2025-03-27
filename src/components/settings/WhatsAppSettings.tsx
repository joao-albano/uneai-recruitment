
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from '@/context/ThemeContext';
import WhatsAppConfigTab from './whatsapp/WhatsAppConfigTab';
import WhatsAppHistoryTab from './whatsapp/WhatsAppHistoryTab';
import VoiceCallConfigTab from './voicecall/VoiceCallConfigTab';
import VoiceCallHistoryTab from './voicecall/VoiceCallHistoryTab';

const WhatsAppSettings: React.FC = () => {
  const { language } = useTheme();
  
  return (
    <Tabs defaultValue="config" className="w-full">
      <TabsList className="grid grid-cols-4 mb-6">
        <TabsTrigger value="config">
          {language === 'pt-BR' ? 'Configuração WhatsApp' : 'WhatsApp Config'}
        </TabsTrigger>
        <TabsTrigger value="history">
          {language === 'pt-BR' ? 'Histórico WhatsApp' : 'WhatsApp History'}
        </TabsTrigger>
        <TabsTrigger value="voice-config">
          {language === 'pt-BR' ? 'Configuração Ligações' : 'Voice Call Config'}
        </TabsTrigger>
        <TabsTrigger value="voice-history">
          {language === 'pt-BR' ? 'Histórico Ligações' : 'Voice Call History'}
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="config">
        <WhatsAppConfigTab />
      </TabsContent>
      
      <TabsContent value="history">
        <WhatsAppHistoryTab />
      </TabsContent>
      
      <TabsContent value="voice-config">
        <VoiceCallConfigTab />
      </TabsContent>
      
      <TabsContent value="voice-history">
        <VoiceCallHistoryTab />
      </TabsContent>
    </Tabs>
  );
};

export default WhatsAppSettings;
