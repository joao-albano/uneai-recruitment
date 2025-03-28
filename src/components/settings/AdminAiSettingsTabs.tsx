
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from '@/context/ThemeContext';
import OpenAiSettings from './OpenAiSettings';
import AdvancedSettings from './AdvancedSettings';

const AdminAiSettingsTabs: React.FC = () => {
  const { language } = useTheme();
  
  return (
    <Tabs defaultValue="openai" className="w-full">
      <TabsList className="grid grid-cols-2 mb-8">
        <TabsTrigger value="openai">
          {language === 'pt-BR' ? 'OpenAI' : 'OpenAI'}
        </TabsTrigger>
        <TabsTrigger value="advanced">
          {language === 'pt-BR' ? 'Configurações Avançadas' : 'Advanced Settings'}
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="openai" className="space-y-6">
        <OpenAiSettings />
      </TabsContent>
      
      <TabsContent value="advanced" className="space-y-6">
        <AdvancedSettings />
      </TabsContent>
    </Tabs>
  );
};

export default AdminAiSettingsTabs;
