
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from '@/context/ThemeContext';
import GeneralSettings from './GeneralSettings';
import SecuritySettings from './SecuritySettings';
import NotificationSettings from './NotificationSettings';

const SettingsTabs: React.FC = () => {
  const { language } = useTheme();
  
  return (
    <Tabs defaultValue="general" className="w-full">
      <TabsList className="grid grid-cols-3 mb-8">
        <TabsTrigger value="general">
          {language === 'pt-BR' ? 'Geral' : 'General'}
        </TabsTrigger>
        <TabsTrigger value="security">
          {language === 'pt-BR' ? 'Segurança' : 'Security'}
        </TabsTrigger>
        <TabsTrigger value="notifications">
          {language === 'pt-BR' ? 'Notificações' : 'Notifications'}
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
    </Tabs>
  );
};

export default SettingsTabs;
