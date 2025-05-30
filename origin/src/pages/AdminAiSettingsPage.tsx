
import React, { useState } from 'react';
import { DataProvider } from '@/context/DataContext';
import { useTheme } from '@/context/ThemeContext';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import AdminAiSettingsTabs from '@/components/settings/AdminAiSettingsTabs';

// AdminAiSettings page content component
const AdminAiSettingsPageContent: React.FC = () => {
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
              {language === 'pt-BR' ? 'Configurações de IA' : 'AI Settings'}
            </h1>
            <p className="text-muted-foreground mt-1">
              {language === 'pt-BR' 
                ? 'Gerencie integrações de IA e parâmetros do algoritmo'
                : 'Manage AI integrations and algorithm parameters'}
            </p>
          </div>
          
          <AdminAiSettingsTabs />
        </main>
      </div>
    </div>
  );
};

// Wrapper with DataProvider
const AdminAiSettingsPage: React.FC = () => {
  return (
    <DataProvider>
      <AdminAiSettingsPageContent />
    </DataProvider>
  );
};

export default AdminAiSettingsPage;
