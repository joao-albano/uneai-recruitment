
import React from 'react';
import { DataProvider } from '@/context/DataContext';
import Header from '@/components/layout/Header';
import Layout from '@/components/layout/Layout';
import { FilePenLine } from 'lucide-react';
import RegistryRulesManagement from '@/components/rules/registry/RegistryRulesManagement';

const RegistryRulesPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  
  return (
    <DataProvider>
      <Layout
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
      >
        <div className="mb-8">
          <div className="flex items-center gap-2">
            <FilePenLine className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight">Regras de Tabulação</h1>
          </div>
          <p className="text-muted-foreground mt-1">
            Configure os códigos de tabulação para atendimentos humanos e IA
          </p>
        </div>
        
        <RegistryRulesManagement />
      </Layout>
    </DataProvider>
  );
};

export default RegistryRulesPage;
