
import React, { useState } from 'react';
import { DataProvider } from '@/context/DataContext';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import DialingRulesManagement from '@/components/rules/dialing/DialingRulesManagement';
import { Phone } from 'lucide-react';

// DialingRulesPage content component
const DialingRulesPageContent: React.FC = () => {
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
              <Phone className="h-6 w-6 text-primary" />
              <h1 className="text-3xl font-bold tracking-tight">Regras de Discagem</h1>
            </div>
            <p className="text-muted-foreground mt-1">
              Configure as regras de discagem automática para campanhas de captação
            </p>
          </div>
          
          <DialingRulesManagement />
        </main>
      </div>
    </div>
  );
};

// Wrapper with DataProvider
const DialingRulesPage: React.FC = () => {
  return (
    <DataProvider>
      <DialingRulesPageContent />
    </DataProvider>
  );
};

export default DialingRulesPage;
