
import React, { useState } from 'react';
import { DataProvider } from '@/context/DataContext';
import { useTheme } from '@/context/ThemeContext';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import SettingsTabs from '@/components/settings/SettingsTabs';

// Settings page content component
const SettingsPageContent: React.FC = () => {
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
              {language === 'pt-BR' ? 'Configurações' : 'Settings'}
            </h1>
            <p className="text-muted-foreground mt-1">
              {language === 'pt-BR' 
                ? 'Gerencie suas preferências e configurações pessoais'
                : 'Manage your personal preferences and settings'}
            </p>
          </div>
          
          <SettingsTabs />
        </main>
      </div>
    </div>
  );
};

// Wrapper with DataProvider
const SettingsPage: React.FC = () => {
  return (
    <DataProvider>
      <SettingsPageContent />
    </DataProvider>
  );
};

export default SettingsPage;
