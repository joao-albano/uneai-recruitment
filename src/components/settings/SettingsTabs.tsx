
import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GeneralSettings from './GeneralSettings';
import NotificationSettings from './NotificationSettings';
import SecuritySettings from './SecuritySettings';
import AdvancedSettings from './AdvancedSettings';

const SettingsTabs: React.FC = () => {
  const { language } = useTheme();
  
  return (
    <Tabs defaultValue="general" className="max-w-4xl">
      <TabsList className="grid w-full grid-cols-4 mb-6">
        <TabsTrigger value="general">
          {language === 'pt-BR' ? 'Geral' : 'General'}
        </TabsTrigger>
        <TabsTrigger value="notifications">
          {language === 'pt-BR' ? 'Notificações' : 'Notifications'}
        </TabsTrigger>
        <TabsTrigger value="security">
          {language === 'pt-BR' ? 'Segurança' : 'Security'}
        </TabsTrigger>
        <TabsTrigger value="advanced">
          {language === 'pt-BR' ? 'Avançado' : 'Advanced'}
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="general">
        <GeneralSettings />
      </TabsContent>
      
      <TabsContent value="notifications">
        <NotificationSettings />
      </TabsContent>
      
      <TabsContent value="security">
        <SecuritySettings />
      </TabsContent>
      
      <TabsContent value="advanced">
        <AdvancedSettings />
      </TabsContent>
    </Tabs>
  );
};

export default SettingsTabs;
