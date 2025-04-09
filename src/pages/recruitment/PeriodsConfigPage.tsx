
import React, { useState } from 'react';
import { DataProvider } from '@/context/DataContext';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { CalendarDays } from 'lucide-react';
import PeriodsConfiguration from '@/components/rules/periods/PeriodsConfiguration';

// PeriodsConfigPage component
const PeriodsConfigPageContent: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
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
            <div className="flex items-center gap-2">
              <CalendarDays className="h-6 w-6 text-primary" />
              <h1 className="text-3xl font-bold tracking-tight">Configuração de Períodos</h1>
            </div>
            <p className="text-muted-foreground mt-1">
              Configure períodos acadêmicos e defina marcos importantes para o sistema de previsão
            </p>
          </div>
          
          <PeriodsConfiguration />
        </main>
      </div>
    </div>
  );
};

// Wrapper with DataProvider
const PeriodsConfigPage: React.FC = () => {
  return (
    <DataProvider>
      <PeriodsConfigPageContent />
    </DataProvider>
  );
};

export default PeriodsConfigPage;
