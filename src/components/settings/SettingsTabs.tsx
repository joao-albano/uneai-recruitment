
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from '@/context/ThemeContext';
import GeneralSettings from './GeneralSettings';
import SecuritySettings from './SecuritySettings';
import NotificationSettings from './NotificationSettings';
import WhatsAppSettings from './WhatsAppSettings';
import WebhookSettings from './WebhookSettings';
import ApiSettings from './ApiSettings';
import OpenAiSettings from './OpenAiSettings';
import AdvancedSettings from './AdvancedSettings';

const SettingsTabs: React.FC = () => {
  const { language } = useTheme();
  
  return (
    <Tabs defaultValue="general" className="w-full">
      <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 mb-8">
        <TabsTrigger value="general">
          {language === 'pt-BR' ? 'Geral' : 'General'}
        </TabsTrigger>
        <TabsTrigger value="security">
          {language === 'pt-BR' ? 'Segurança' : 'Security'}
        </TabsTrigger>
        <TabsTrigger value="notifications">
          {language === 'pt-BR' ? 'Notificações' : 'Notifications'}
        </TabsTrigger>
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
      
      <TabsContent value="general" className="space-y-6">
        <GeneralSettings />
      </TabsContent>
      
      <TabsContent value="security" className="space-y-6">
        <SecuritySettings />
      </TabsContent>
      
      <TabsContent value="notifications" className="space-y-6">
        <NotificationSettings />
      </TabsContent>
      
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

export default SettingsTabs;
