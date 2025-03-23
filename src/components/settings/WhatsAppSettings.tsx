
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from '@/context/ThemeContext';
import { useWhatsAppHistory } from '@/hooks/useWhatsAppHistory';
import WhatsAppConfigTab from './whatsapp/WhatsAppConfigTab';
import WhatsAppHistory from './WhatsAppHistory';

const WhatsAppSettings: React.FC = () => {
  const { language } = useTheme();
  const { messages, clearHistory } = useWhatsAppHistory();
  
  const handleClearHistory = () => {
    clearHistory();
  };
  
  return (
    <Tabs defaultValue="config" className="w-full">
      <TabsList className="grid grid-cols-2 mb-6">
        <TabsTrigger value="config">
          {language === 'pt-BR' ? 'Configuração' : 'Configuration'}
        </TabsTrigger>
        <TabsTrigger value="history">
          {language === 'pt-BR' ? 'Histórico' : 'History'}
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="config">
        <WhatsAppConfigTab />
      </TabsContent>
      
      <TabsContent value="history">
        <WhatsAppHistory 
          messages={messages}
          onClearHistory={handleClearHistory}
        />
      </TabsContent>
    </Tabs>
  );
};

export default WhatsAppSettings;
