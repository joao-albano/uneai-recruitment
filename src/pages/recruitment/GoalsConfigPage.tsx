
import React, { useState } from 'react';
import { DataProvider } from '@/context/DataContext';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { Target } from 'lucide-react';
import GoalsConfiguration from '@/components/rules/goals/GoalsConfiguration';

// GoalsConfigPage component
const GoalsConfigPageContent: React.FC = () => {
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
              <Target className="h-6 w-6 text-primary" />
              <h1 className="text-3xl font-bold tracking-tight">Configuração de Metas</h1>
            </div>
            <p className="text-muted-foreground mt-1">
              Configure as metas de captação para períodos e cursos específicos
            </p>
          </div>
          
          <GoalsConfiguration />
        </main>
      </div>
    </div>
  );
};

// Wrapper with DataProvider
const GoalsConfigPage: React.FC = () => {
  return (
    <DataProvider>
      <GoalsConfigPageContent />
    </DataProvider>
  );
};

export default GoalsConfigPage;
