
import React, { useState } from 'react';
import { UploadsProvider } from '@/context/uploads/UploadsContext';
import Layout from '@/components/layout/Layout';
import TabsContainer from '@/components/upload/tabs/TabsContainer';
import PageHeader from '@/components/upload/PageHeader';

const RecruitmentUploadPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  return (
    <UploadsProvider>
      <Layout
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
      >
        <PageHeader />
        <TabsContainer />
      </Layout>
    </UploadsProvider>
  );
};

export default RecruitmentUploadPage;
