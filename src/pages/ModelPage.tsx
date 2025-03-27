
import React from 'react';
import { DataProvider } from '@/context/DataContext';
import ModelPageContent from '@/components/model/ModelPageContent';
import Layout from '@/components/layout/Layout';

// Main component that wraps the content with DataProvider
const ModelPage: React.FC = () => {
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
        <ModelPageContent />
      </Layout>
    </DataProvider>
  );
};

export default ModelPage;
