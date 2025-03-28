
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from '@/context/ThemeContext';
import OpenAiSettings from './OpenAiSettings';
import AdvancedSettings from './AdvancedSettings';
import GoogleAiSettings from './ai/GoogleAiSettings';
import ClaudeSettings from './ai/ClaudeSettings';
import GrokSettings from './ai/GrokSettings';
import ModelComparison from './ai/ModelComparison';

const AdminAiSettingsTabs: React.FC = () => {
  const { language } = useTheme();
  
  return (
    <Tabs defaultValue="openai" className="w-full">
      <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-8">
        <TabsTrigger value="openai">
          {language === 'pt-BR' ? 'OpenAI' : 'OpenAI'}
        </TabsTrigger>
        <TabsTrigger value="google">
          {language === 'pt-BR' ? 'Google AI' : 'Google AI'}
        </TabsTrigger>
        <TabsTrigger value="claude">
          {language === 'pt-BR' ? 'Claude' : 'Claude'}
        </TabsTrigger>
        <TabsTrigger value="grok">
          {language === 'pt-BR' ? 'Grok' : 'Grok'}
        </TabsTrigger>
        <TabsTrigger value="comparison">
          {language === 'pt-BR' ? 'Comparação' : 'Comparison'}
        </TabsTrigger>
        <TabsTrigger value="advanced">
          {language === 'pt-BR' ? 'Avançado' : 'Advanced'}
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="openai" className="space-y-6">
        <OpenAiSettings />
      </TabsContent>

      <TabsContent value="google" className="space-y-6">
        <GoogleAiSettings />
      </TabsContent>

      <TabsContent value="claude" className="space-y-6">
        <ClaudeSettings />
      </TabsContent>

      <TabsContent value="grok" className="space-y-6">
        <GrokSettings />
      </TabsContent>

      <TabsContent value="comparison" className="space-y-6">
        <ModelComparison />
      </TabsContent>
      
      <TabsContent value="advanced" className="space-y-6">
        <AdvancedSettings />
      </TabsContent>
    </Tabs>
  );
};

export default AdminAiSettingsTabs;
