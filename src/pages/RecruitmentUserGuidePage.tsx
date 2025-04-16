
import React, { useState } from 'react';
import { DataProvider } from "@/context/DataContext";
import Layout from '@/components/layout/Layout';
import UserGuideContent from '@/components/admin/docs/UserGuideContent';

const RecruitmentUserGuidePage: React.FC = () => {
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
        <UserGuideContent />
      </Layout>
    </DataProvider>
  );
};

export default RecruitmentUserGuidePage;
