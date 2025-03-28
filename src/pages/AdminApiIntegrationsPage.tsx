
import React, { useState } from 'react';
import { DataProvider } from '@/context/DataContext';
import { useTheme } from '@/context/ThemeContext';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WhatsAppApiIntegration from '@/components/admin/ai/WhatsAppApiIntegration';
import VoiceCallApiIntegration from '@/components/admin/ai/VoiceCallApiIntegration';

// AdminApiIntegrationsPage content component
const AdminApiIntegrationsPageContent: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { language } = useTheme();
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <div className="min-h-screen flex w-full">
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={toggleSidebar} 
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      
      <div className="flex-1 flex flex-col">
        <Header toggleSidebar={toggleSidebar} sidebarCollapsed={sidebarCollapsed} />
        
        <main className="flex-1 p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">
              {language === 'pt-BR' ? 'Integrações de API' : 'API Integrations'}
            </h1>
            <p className="text-muted-foreground mt-1">
              {language === 'pt-BR' 
                ? 'Gerencie configurações técnicas para integrações com APIs externas'
                : 'Manage technical settings for external API integrations'}
            </p>
          </div>
          
          <Tabs defaultValue="whatsapp" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-2 mb-8">
              <TabsTrigger value="whatsapp">
                {language === 'pt-BR' ? 'WhatsApp' : 'WhatsApp'}
              </TabsTrigger>
              <TabsTrigger value="voice">
                {language === 'pt-BR' ? 'Ligações de Voz' : 'Voice Calls'}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="whatsapp" className="space-y-6">
              <WhatsAppApiIntegration />
            </TabsContent>
            
            <TabsContent value="voice" className="space-y-6">
              <VoiceCallApiIntegration />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

// Wrapper with DataProvider
const AdminApiIntegrationsPage: React.FC = () => {
  return (
    <DataProvider>
      <AdminApiIntegrationsPageContent />
    </DataProvider>
  );
};

export default AdminApiIntegrationsPage;
