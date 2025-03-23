
import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bot, Webhook } from 'lucide-react';
import OpenAiSettings from './OpenAiSettings';
import WebhookSettings from './WebhookSettings';

const ApiSettings: React.FC = () => {
  const { language } = useTheme();
  
  return (
    <Tabs defaultValue="openai" className="space-y-4">
      <TabsList>
        <TabsTrigger value="openai" className="flex items-center gap-2">
          <Bot className="h-4 w-4" />
          <span>{language === 'pt-BR' ? 'OpenAI' : 'OpenAI'}</span>
        </TabsTrigger>
        <TabsTrigger value="webhooks" className="flex items-center gap-2">
          <Webhook className="h-4 w-4" />
          <span>{language === 'pt-BR' ? 'Webhooks' : 'Webhooks'}</span>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="openai">
        <OpenAiSettings />
      </TabsContent>
      
      <TabsContent value="webhooks">
        <WebhookSettings />
      </TabsContent>
    </Tabs>
  );
};

export default ApiSettings;
