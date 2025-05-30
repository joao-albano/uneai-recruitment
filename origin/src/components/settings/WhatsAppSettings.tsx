
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from '@/context/ThemeContext';
import WhatsAppConfigTab from './whatsapp/WhatsAppConfigTab';
import WhatsAppHistoryTab from './whatsapp/WhatsAppHistoryTab';

const WhatsAppSettings: React.FC = () => {
  const { language } = useTheme();
  
  return (
    <Tabs defaultValue="config" className="w-full">
      <TabsList className="grid grid-cols-2 mb-6">
        <TabsTrigger value="config">
          {language === 'pt-BR' ? 'Configuração WhatsApp' : 'WhatsApp Config'}
        </TabsTrigger>
        <TabsTrigger value="history">
          {language === 'pt-BR' ? 'Histórico WhatsApp' : 'WhatsApp History'}
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="config">
        <WhatsAppConfigTab />
      </TabsContent>
      
      <TabsContent value="history">
        <WhatsAppHistoryTab />
      </TabsContent>
    </Tabs>
  );
};

export default WhatsAppSettings;
