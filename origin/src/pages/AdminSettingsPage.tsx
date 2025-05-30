
import React, { useState } from 'react';
import { DataProvider } from '@/context/DataContext';
import { useTheme } from '@/context/ThemeContext';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import AdminSettingsTabs from '@/components/settings/AdminSettingsTabs';

// AdminSettings page content component
const AdminSettingsPageContent: React.FC = () => {
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
              {language === 'pt-BR' ? 'Configurações Administrativas' : 'Admin Settings'}
            </h1>
            <p className="text-muted-foreground mt-1">
              {language === 'pt-BR' 
                ? 'Gerencie configurações avançadas e integrações do sistema'
                : 'Manage advanced settings and system integrations'}
            </p>
          </div>
          
          <AdminSettingsTabs />
        </main>
      </div>
    </div>
  );
};

// Wrapper with DataProvider
const AdminSettingsPage: React.FC = () => {
  return (
    <DataProvider>
      <AdminSettingsPageContent />
    </DataProvider>
  );
};

export default AdminSettingsPage;
