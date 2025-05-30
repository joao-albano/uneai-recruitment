
import React, { useState } from 'react';
import { DataProvider } from '@/context/DataContext';
import Layout from '@/components/layout/Layout';
import TabsContainer from '@/components/upload/tabs/TabsContainer';
import PageHeader from '@/components/upload/PageHeader';

const UploadPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  return (
    <DataProvider>
      <Layout
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
      >
        <PageHeader />
        <TabsContainer />
      </Layout>
    </DataProvider>
  );
};

export default UploadPage;
