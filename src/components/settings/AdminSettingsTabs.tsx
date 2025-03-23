
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from '@/context/ThemeContext';
import WhatsAppSettings from './WhatsAppSettings';
import WebhookSettings from './WebhookSettings';
import ApiSettings from './ApiSettings';
import OpenAiSettings from './OpenAiSettings';

const AdminSettingsTabs: React.FC = () => {
  const { language } = useTheme();
  
  return (
    <Tabs defaultValue="whatsapp" className="w-full">
      <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
        <TabsTrigger value="whatsapp">
          WhatsApp
        </TabsTrigger>
        <TabsTrigger value="webhooks">
          Webhooks
        </TabsTrigger>
        <TabsTrigger value="api">
          API
        </TabsTrigger>
        <TabsTrigger value="openai">
          OpenAI
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="whatsapp" className="space-y-6">
        <WhatsAppSettings />
      </TabsContent>
      
      <TabsContent value="webhooks" className="space-y-6">
        <WebhookSettings />
      </TabsContent>
      
      <TabsContent value="api" className="space-y-6">
        <ApiSettings />
      </TabsContent>
      
      <TabsContent value="openai" className="space-y-6">
        <OpenAiSettings />
      </TabsContent>
    </Tabs>
  );
};

export default AdminSettingsTabs;
