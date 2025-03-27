
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from '@/context/ThemeContext';
import { Link } from 'react-router-dom';
import { ChartBarIcon, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import WhatsAppSettings from './WhatsAppSettings';
import WebhookSettings from './WebhookSettings';
import ApiSettings from './ApiSettings';
import OpenAiSettings from './OpenAiSettings';
import VoiceCallSettings from './VoiceCallSettings';

const AdminSettingsTabs: React.FC = () => {
  const { language } = useTheme();
  
  return (
    <>
      <div className="flex justify-end mb-6">
        <Button variant="outline" asChild>
          <Link to="/admin/dashboard">
            <ChartBarIcon className="mr-2 h-4 w-4" />
            {language === 'pt-BR' ? 'Painel Analítico' : 'Analytics Dashboard'}
          </Link>
        </Button>
      </div>
    
      <Tabs defaultValue="whatsapp" className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-8">
          <TabsTrigger value="whatsapp">
            WhatsApp
          </TabsTrigger>
          <TabsTrigger value="voicecall">
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>{language === 'pt-BR' ? 'Ligações' : 'Voice Calls'}</span>
            </div>
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
        
        <TabsContent value="voicecall" className="space-y-6">
          <VoiceCallSettings />
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
    </>
  );
};

export default AdminSettingsTabs;
